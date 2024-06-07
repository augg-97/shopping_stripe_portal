import { Injectable } from "@nestjs/common";
import { RedisService } from "../../../services/redisService/redis.service";
import { REDIS_KEY } from "../../../services/redisService/redisKey";
import { BadRequestException } from "../../../exceptions/badRequest/badRequest.exception";

@Injectable()
export class ValidateEmailTokenService {
  constructor(private readonly redisService: RedisService) {}

  async execute(redisKey: REDIS_KEY, email: string, token: string) {
    const key = `${redisKey}_${email}`;
    const getToken = await this.redisService.get(key);

    if (!getToken) {
      throw new BadRequestException(
        "REQUEST_IS_EXPIRED",
        "Your reset password request is expired",
      );
    }

    if (getToken !== token) {
      throw new BadRequestException(
        "REQUEST_INVALID",
        "Your reset password request invalid",
      );
    }

    await this.redisService.delete(key);
  }
}
