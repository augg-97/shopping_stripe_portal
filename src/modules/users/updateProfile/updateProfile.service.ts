import { Injectable } from "@nestjs/common";
import { UpdateProfilePayload } from "./updateProfile.payload";
import { AuthUser } from "../../../services/tokenService/authUser";
import { UserNotFoundException } from "../../../exceptions/notFound/userNotFound.exception";
import { Prisma } from "@prisma/client";
import { UserDto } from "../../../dto/user.dto";
import { UserRepository } from "../user.repository";

@Injectable()
export class UpdateProfileService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(authUser: AuthUser, payload: UpdateProfilePayload) {
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

    const { profileImage, coverImage, ...userInfo } = user;
    const userDtoInstance = new UserDto();
    userDtoInstance.builder(userInfo, profileImage, coverImage, userInfo.id);
    return userDtoInstance.toResponse();
  }
}
