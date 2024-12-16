import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from '../../../exceptions/notFound/userNotFound.exception';
import { IUserDto } from '../../../dtos/user.dto';
import { plainToClass } from 'class-transformer';
import { UserRepository } from '../../../repositories/user.repository';

@Injectable()
export class GetUserByIdService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<IUserDto> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return <IUserDto>{};
  }
}
