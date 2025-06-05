import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { AuthUser } from '@services/tokenService/authUser';
import { UserNotFoundException } from '@exceptions/notFound/userNotFound.exception';
import { UserRepository } from '@repositories/user.repository';
import { UserEntity } from '@dtos/users/user.interface';

import { UpdateProfilePayload } from './updateProfile.payload';

@Injectable()
export class UpdateProfileService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    authUser: AuthUser,
    payload: UpdateProfilePayload,
  ): Promise<UserEntity> {
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

    return user;
  }
}
