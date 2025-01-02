import { Injectable } from '@nestjs/common';
import { RegisterPayload } from './register.payload';
import { PasswordService } from '../../../services/passwordService/password.service';
import { ExistsUserException } from '../../../exceptions/badRequest/existsUser.exception';
import { VERIFY_EMAIL_TOKEN_EXPIRED } from '../../../helpers/constant';
import { EmailUIUrlParams, EmailUIUrlService } from './emailUIUrl.service';
import { AppConfigService } from '../../../appConfigs/appConfig.service';
import { REDIS_KEY } from '../../../services/redisService/redisKey';
import { Prisma } from '@prisma/client';
import { ConflictException } from '../../../exceptions/conflict/conflict.exception';
import { UserRepository } from '../../../repositories/user.repository';
import { UserDtoBuilder } from '../../../dtos/users/user.builder';
import { UserWithStoreDto } from '../../../dtos/users/userWithStore.dto';
import { IUserDto } from '../../../dtos/users/user.interface';
import { EmailVerifyService } from '../../../services/emailService/emailVerify.service';

@Injectable()
export class RegisterService {
  constructor(
    private readonly userRepository: UserRepository,
    private passwordService: PasswordService,
    private readonly emailVerifyService: EmailVerifyService,
    private readonly emailUIUrlService: EmailUIUrlService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async execute(payload: RegisterPayload): Promise<IUserDto> {
    const { email, password, fullName } = payload;

    const user = await this.userRepository.findUserByEmail(email);

    if (user) {
      throw new ExistsUserException();
    }

    const { passwordHashed, salt } = await this.passwordService.hashPassword(
      password,
      email,
    );

    const userCreateInput: Prisma.UserCreateInput = {
      email,
      fullName,
      salt,
      passwordHashed,
    };
    const newUser = await this.userRepository.createUser(userCreateInput);

    if (!newUser) {
      throw new ConflictException(
        'REGISTER_USER_ERROR',
        'Unable to register users at this time',
      );
    }

    const params: EmailUIUrlParams = {
      emailUIUrl: this.appConfigService.verifyEmailUIUrl,
      key: REDIS_KEY.VERIFY_EMAIL,
      email,
      tokenExpired: VERIFY_EMAIL_TOKEN_EXPIRED,
    };
    const url = await this.emailUIUrlService.execute(params);
    await this.emailVerifyService.sendEmail(email, { verifyEmailUrl: url });

    const builder = new UserDtoBuilder();
    const dto = new UserWithStoreDto(builder, true);
    dto.build(newUser);

    return builder.toDto();
  }
}
