import { Injectable } from '@nestjs/common';
import { UpdateProfilePayload } from './updateProfile.payload';
import { AuthUser } from '../../../services/tokenService/authUser';
import { UserNotFoundException } from '../../../exceptions/notFound/userNotFound.exception';
import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { EXPOSE_GROUP_PRIVATE } from '../../../helpers/constant';
import { UserRepository } from '../../../repositories/user.repository';
import { UserDtoBuilder } from '../../../dtos/users/user.builder';
import { UserWithStoreDto } from '../../../dtos/users/userWithStore.dto';
import { IUserDto } from '../../../dtos/users/user.interface';

@Injectable()
export class UpdateProfileService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    authUser: AuthUser,
    payload: UpdateProfilePayload,
  ): Promise<IUserDto> {
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

    const builder = new UserDtoBuilder();
    const dto = new UserWithStoreDto(builder, true);
    dto.build(user);

    return builder.toDto();
  }
}
