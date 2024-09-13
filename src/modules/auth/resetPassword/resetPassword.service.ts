import { Injectable } from '@nestjs/common';
import { ResetPasswordPayload } from './resetPassword.payload';
import { UserNotExistsException } from '../../../exceptions/badRequest/userNotExists.exception';
import { REDIS_KEY } from '../../../services/redisService/redisKey';
import { PasswordService } from '../../../services/passwordService/password.service';
import { ValidateEmailTokenService } from './validateEmailToken.service';
import { Prisma } from '@prisma/client';
import { ConflictException } from '../../../exceptions/conflict/conflict.exception';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../../../dtos/user.dto';
import { EXPOSE_GROUP_PRIVATE } from '../../../helpers/constant';
import { UserRepository } from '../../../repositories/user.repository';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly validateEmailTokenService: ValidateEmailTokenService,
  ) {}

  async execute(payload: ResetPasswordPayload): Promise<UserDto> {
    const { email, token, password } = payload;

    await this.validateEmailTokenService.execute(
      REDIS_KEY.RESET_PASSWORD,
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

    return plainToClass(UserDto, user, { groups: [EXPOSE_GROUP_PRIVATE] });
  }
}
