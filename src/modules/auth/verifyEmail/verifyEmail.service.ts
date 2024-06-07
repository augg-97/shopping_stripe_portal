import { Injectable } from "@nestjs/common";
import { VerifyEmailPayload } from "./verifyEmail.payload";
import { UserNotExistsException } from "../../../exceptions/badRequest/userNotExists.exception";
import { REDIS_KEY } from "../../../services/redisService/redisKey";
import { UserDto } from "../../../dto/user.dto";
import { ValidateEmailTokenService } from "../resetPassword/validateEmailToken.service";
import { UserRepository } from "../../users/user.repository";
import { ConflictException } from "../../../exceptions/conflict/conflict.exception";

@Injectable()
export class VerifyEmailService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly validateEmailTokenService: ValidateEmailTokenService,
  ) {}

  async execute(payload: VerifyEmailPayload) {
    const { email, token } = payload;

    await this.validateEmailTokenService.execute(
      REDIS_KEY.VERIFY_EMAIL,
      email,
      token,
    );

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new UserNotExistsException();
    }

    const userUpdated = await this.userRepository.updateUserById(user.id, {
      isVerify: true,
    });

    if (!userUpdated) {
      throw new ConflictException(
        "VERIFY_EMAIL_ERROR",
        "Unable to verify email at this time",
      );
    }

    const { profileImage, coverImage, ...userInfo } = userUpdated;
    const userDtoInstance = new UserDto();
    userDtoInstance.builder(userInfo, profileImage, coverImage, userInfo.id);
    return userDtoInstance.toResponse();
  }
}
