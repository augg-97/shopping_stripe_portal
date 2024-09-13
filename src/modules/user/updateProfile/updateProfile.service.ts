import { Injectable } from '@nestjs/common';
import { UpdateProfilePayload } from './updateProfile.payload';
import { AuthUser } from '../../../services/tokenService/authUser';
import { UserNotFoundException } from '../../../exceptions/notFound/userNotFound.exception';
import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../../../dtos/user.dto';
import { EXPOSE_GROUP_PRIVATE } from '../../../helpers/constant';
import { UserRepository } from '../../../repositories/user.repository';

@Injectable()
export class UpdateProfileService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    authUser: AuthUser,
    payload: UpdateProfilePayload,
  ): Promise<UserDto> {
    const updateUserInput: Prisma.UserUpdateInput = {
      fullName: payload.fullName,
      profileImage: {
        connect: {
          id: payload.coverImageId,
        },
      },
      coverImage: {
        connect: {
          id: payload.coverImageId,
        },
      },
    };

    const user = await this.userRepository.updateUserById(
      Number(authUser.id),
      updateUserInput,
    );

    if (!user) {
      throw new UserNotFoundException();
    }

    return plainToClass(UserDto, user, { groups: [EXPOSE_GROUP_PRIVATE] });
  }
}
