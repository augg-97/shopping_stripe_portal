import { Injectable } from '@nestjs/common';

import { AuthUser } from '@services/tokenService/authUser';
import { UserNotFoundException } from '@exceptions/notFound/userNotFound.exception';
import { UserIncludeType, UserRepository } from '@repositories/user.repository';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(authUser: AuthUser): Promise<UserIncludeType> {
    const user = await this.userRepository.findUserById(Number(authUser.id));

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
