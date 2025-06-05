import { Injectable } from '@nestjs/common';

import { AuthUser } from '@services/tokenService/authUser';
import { UserNotFoundException } from '@exceptions/notFound/userNotFound.exception';
import { UserRepository } from '@repositories/user.repository';
import { UserEntity } from '@dtos/users/user.interface';

@Injectable()
export class GetMeService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(authUser: AuthUser): Promise<UserEntity> {
    const { id } = authUser;

    const user = await this.userRepository.findUserById(Number(id));

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
