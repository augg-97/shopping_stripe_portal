import { Injectable } from '@nestjs/common';

import { AuthUser } from '@services/tokenService/authUser';
import { UserNotFoundException } from '@exceptions/notFound/userNotFound.exception';
import { UserRepository } from '@repositories/user.repository';
import { UserEntity } from '@dtos/users/user.interface';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(authUser: AuthUser): Promise<UserEntity> {
    const user = await this.userRepository.findUserById(Number(authUser.id));

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
