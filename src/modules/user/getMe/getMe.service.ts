import { Injectable } from '@nestjs/common';

import { AuthUser } from '@services/tokenService/authUser';
import { UserNotFoundException } from '@exceptions/notFound/userNotFound.exception';
import { UserIncludeType, UserRepository } from '@repositories/user.repository';

@Injectable()
export class GetMeService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(authUser: AuthUser): Promise<UserIncludeType> {
    const { id } = authUser;

    const user = await this.userRepository.findUserById(Number(id));

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
