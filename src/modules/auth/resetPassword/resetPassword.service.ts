import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { UserNotExistsException } from '@exceptions/badRequest/userNotExists.exception';
import { PasswordService } from '@services/passwordService/password.service';
import { ConflictException } from '@exceptions/conflict/conflict.exception';
import { UserIncludeType, UserRepository } from '@repositories/user.repository';
import { PREFIX_REDIS_KEY } from '@constants/enums/prefixRedisKey.enum';

import { ValidateEmailTokenService } from './validateEmailToken.service';
import { ResetPasswordPayload } from './resetPassword.payload';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly validateEmailTokenService: ValidateEmailTokenService,
  ) {}

  async execute(payload: ResetPasswordPayload): Promise<UserIncludeType> {
    const { email, token, password } = payload;

    await this.validateEmailTokenService.execute(
      PREFIX_REDIS_KEY.RESET_PASSWORD,
      email,
      token,
    );

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new UserNotExistsException();
    }

    const { passwordHashed, salt } = await this.passwordService.hashPassword(
      password,
      email,
    );

    const userUpdateInput: Prisma.UserUpdateInput = {
      passwordHashed,
      salt,
    };
    const userUpdated = await this.userRepository.updateUserById(
      user.id,
      userUpdateInput,
    );

    if (!userUpdated) {
      throw new ConflictException(
        'RESET_PASSWORD_ERROR',
        'Unable to reset password at this time',
      );
    }

    return userUpdated;
  }
}
