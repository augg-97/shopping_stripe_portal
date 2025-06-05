import { Injectable } from '@nestjs/common';

import { UserNotFoundException } from '@exceptions/notFound/userNotFound.exception';
import { UserRepository } from '@repositories/user.repository';
import { UserEntity } from '@dtos/users/user.interface';

@Injectable()
export class GetUserByIdService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
