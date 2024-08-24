import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from '../../../exceptions/notFound/userNotFound.exception';
import { UserRepository } from '../user.repository';
import { UserDto } from '../../../dto/user.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class GetUserByIdService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<UserDto> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return plainToClass(UserDto, user);
  }
}
