import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ExistsUserException } from '@exceptions/badRequest/existsUser.exception';
import { PasswordService } from '@services/passwordService/password.service';
import { ConflictException } from '@exceptions/conflict/conflict.exception';
import { UserIncludeType, UserRepository } from '@repositories/user.repository';
import { EmailVerifyService } from '@services/emailService/emailVerify.service';
import { AppConfigService } from '@appConfigs/appConfig.service';
import { VERIFY_EMAIL_TOKEN_EXPIRED } from '@helpers/constant';
import { PREFIX_REDIS_KEY } from '@constants/enums/prefixRedisKey.enum';

import { EmailUIUrlParams, EmailUIUrlService } from './emailUIUrl.service';
import { RegisterPayload } from './register.payload';

@Injectable()
export class RegisterService {
  constructor(
    private readonly userRepository: UserRepository,
    private passwordService: PasswordService,
    private readonly emailVerifyService: EmailVerifyService,
    private readonly emailUIUrlService: EmailUIUrlService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async execute(payload: RegisterPayload): Promise<UserIncludeType> {
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
      key: PREFIX_REDIS_KEY.VERIFY_EMAIL,
      email,
      tokenExpired: VERIFY_EMAIL_TOKEN_EXPIRED,
    };
    const url = await this.emailUIUrlService.execute(params);
    await this.emailVerifyService.sendEmail(email, { verifyEmailUrl: url });

    return newUser;
  }
}
