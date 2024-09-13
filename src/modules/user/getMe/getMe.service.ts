import { Injectable } from '@nestjs/common';
import { AuthUser } from '../../../services/tokenService/authUser';
import { UserNotFoundException } from '../../../exceptions/notFound/userNotFound.exception';
import { UserDto } from '../../../dtos/user.dto';
import { plainToClass } from 'class-transformer';
import { EXPOSE_GROUP_PRIVATE } from '../../../helpers/constant';
import { UserRepository } from '../../../repositories/user.repository';

@Injectable()
export class GetMeService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(authUser: AuthUser): Promise<UserDto> {
    const { id } = authUser;

    const user = await this.userRepository.findUserById(Number(id));

    if (!user) {
      throw new UserNotFoundException();
    }

    return plainToClass(UserDto, user, { groups: [EXPOSE_GROUP_PRIVATE] });
  }
}
