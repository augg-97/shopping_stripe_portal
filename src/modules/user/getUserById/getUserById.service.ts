import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from '../../../exceptions/notFound/userNotFound.exception';
import { UserRepository } from '../../../repositories/user.repository';
import { UserDtoBuilder } from '../../../dtos/users/user.builder';
import { UserWithStoreDto } from '../../../dtos/users/userWithStore.dto';
import { IUserDto } from '../../../dtos/users/user.interface';

@Injectable()
export class GetUserByIdService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<IUserDto> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    const builder = new UserDtoBuilder();
    const dto = new UserWithStoreDto(builder);
    dto.build(user);

    return builder.toDto();
  }
}
