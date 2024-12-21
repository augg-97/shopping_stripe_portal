import { Injectable } from '@nestjs/common';
import { AuthUser } from '../../../services/tokenService/authUser';
import { UserNotFoundException } from '../../../exceptions/notFound/userNotFound.exception';
import { plainToClass } from 'class-transformer';
import { EXPOSE_GROUP_PRIVATE } from '../../../helpers/constant';
import { UserRepository } from '../../../repositories/user.repository';
import { IUserDto } from '../../../dtos/users/user.interface';
import { UserDtoBuilder } from '../../../dtos/users/user.builder';
import { UserWithStoreDto } from '../../../dtos/users/userWithStore.dto';

@Injectable()
export class GetMeService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(authUser: AuthUser): Promise<IUserDto> {
    const { id } = authUser;

    const user = await this.userRepository.findUserById(Number(id));

    if (!user) {
      throw new UserNotFoundException();
    }

    const builder = new UserDtoBuilder();
    const dto = new UserWithStoreDto(builder, true);
    dto.build(user);

    return builder.toDto();
  }
}
