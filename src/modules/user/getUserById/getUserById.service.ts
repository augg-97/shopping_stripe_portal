import { Injectable } from '@nestjs/common';

import { UserNotFoundException } from '@exceptions/notFound/userNotFound.exception';
import { UserIncludeType, UserRepository } from '@repositories/user.repository';

@Injectable()
export class GetUserByIdService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<UserIncludeType> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
