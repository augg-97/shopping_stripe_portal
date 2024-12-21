import { Injectable } from '@nestjs/common';
import { VerifyEmailPayload } from './verifyEmail.payload';
import { UserNotExistsException } from '../../../exceptions/badRequest/userNotExists.exception';
import { REDIS_KEY } from '../../../services/redisService/redisKey';
import { ValidateEmailTokenService } from '../resetPassword/validateEmailToken.service';
import { ConflictException } from '../../../exceptions/conflict/conflict.exception';
import { plainToClass } from 'class-transformer';
import { EXPOSE_GROUP_PRIVATE } from '../../../helpers/constant';
import { UserRepository } from '../../../repositories/user.repository';
import { UserDtoBuilder } from '../../../dtos/users/user.builder';
import { UserWithStoreDto } from '../../../dtos/users/userWithStore.dto';
import { IUserDto } from '../../../dtos/users/user.interface';

@Injectable()
export class VerifyEmailService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly validateEmailTokenService: ValidateEmailTokenService,
  ) {}

  async execute(payload: VerifyEmailPayload): Promise<IUserDto> {
    const { email, token } = payload;

    await this.validateEmailTokenService.execute(
      REDIS_KEY.VERIFY_EMAIL,
      email,
      token,
    );

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new UserNotExistsException();
    }

    const userUpdated = await this.userRepository.updateUserById(user.id, {
      isVerify: true,
    });

    if (!userUpdated) {
      throw new ConflictException(
        'VERIFY_EMAIL_ERROR',
        'Unable to verify email at this time',
      );
    }

    const builder = new UserDtoBuilder();
    const dto = new UserWithStoreDto(builder, true);
    dto.build(userUpdated);

    return builder.toDto();
  }
}
