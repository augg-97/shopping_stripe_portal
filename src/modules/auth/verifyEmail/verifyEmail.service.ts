import { Injectable } from '@nestjs/common';

import { UserNotExistsException } from '@exceptions/badRequest/userNotExists.exception';
import { ConflictException } from '@exceptions/conflict/conflict.exception';
import { UserIncludeType, UserRepository } from '@repositories/user.repository';
import { PREFIX_REDIS_KEY } from '@constants/enums/prefixRedisKey.enum';

import { ValidateEmailTokenService } from '../resetPassword/validateEmailToken.service';

import { VerifyEmailPayload } from './verifyEmail.payload';

@Injectable()
export class VerifyEmailService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly validateEmailTokenService: ValidateEmailTokenService,
  ) {}

  async execute(payload: VerifyEmailPayload): Promise<UserIncludeType> {
    const { email, token } = payload;

    await this.validateEmailTokenService.execute(
      PREFIX_REDIS_KEY.VERIFY_EMAIL,
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
