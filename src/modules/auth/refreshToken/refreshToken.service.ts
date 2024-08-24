import { Injectable } from '@nestjs/common';
import { AuthUser } from '../../../services/tokenService/authUser';
import { UserNotFoundException } from '../../../exceptions/notFound/userNotFound.exception';
import { UserRepository } from '../../user/user.repository';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../../../dto/user.dto';
import { EXPOSE_GROUP_PRIVATE } from '../../../helpers/constant';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(authUser: AuthUser): Promise<UserDto> {
    const user = await this.userRepository.findUserById(Number(authUser.id));

    if (!user) {
      throw new UserNotFoundException();
    }

    return plainToClass(UserDto, user, { groups: [EXPOSE_GROUP_PRIVATE] });
  }
}
