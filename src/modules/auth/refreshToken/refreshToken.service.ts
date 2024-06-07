import { Injectable } from "@nestjs/common";
import { AuthUser } from "../../../services/tokenService/authUser";
import { UserNotFoundException } from "../../../exceptions/notFound/userNotFound.exception";
import { UserDto } from "../../../dto/user.dto";
import { UserRepository } from "../../users/user.repository";

@Injectable()
export class RefreshTokenService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(authUser: AuthUser) {
    const user = await this.userRepository.findUserById(Number(authUser.id));

    if (!user) {
      throw new UserNotFoundException();
    }

    const { profileImage, coverImage, ...userInfo } = user;
    const userDtoInstance = new UserDto();
    userDtoInstance.builder(userInfo, profileImage, coverImage, userInfo.id);
    return userDtoInstance.toResponse();
  }
}
