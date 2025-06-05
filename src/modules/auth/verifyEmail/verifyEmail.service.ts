import { Injectable } from '@nestjs/common';

import { UserNotExistsException } from '@exceptions/badRequest/userNotExists.exception';
import { REDIS_KEY } from '@services/redisService/redisKey';
import { ConflictException } from '@exceptions/conflict/conflict.exception';
import { UserRepository } from '@repositories/user.repository';
import { UserEntity } from '@dtos/users/user.interface';

import { ValidateEmailTokenService } from '../resetPassword/validateEmailToken.service';

import { VerifyEmailPayload } from './verifyEmail.payload';

@Injectable()
export class VerifyEmailService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly validateEmailTokenService: ValidateEmailTokenService,
  ) {}

  async execute(payload: VerifyEmailPayload): Promise<UserEntity> {
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

    return userUpdated;
  }
}
