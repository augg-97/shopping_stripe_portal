import { Injectable } from "@nestjs/common";
import { UserNotFoundException } from "../../../exceptions/notFound/userNotFound.exception";
import { UserDto } from "../../../dto/user.dto";
import { UserRepository } from "../user.repository";

@Injectable()
export class GetUserByIdService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number) {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    const { profileImage, coverImage, ...profile } = user;
    const userDtoInstance = new UserDto();
    userDtoInstance.builder(profile, profileImage, coverImage);

    return userDtoInstance.toResponse();
  }
}
