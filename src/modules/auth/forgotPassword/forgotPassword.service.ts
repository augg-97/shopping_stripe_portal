import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../../services/prismaService/prisma.service";
import { ForgotPasswordPayload } from "./forgotPassword.payload";
import { UserNotExistsException } from "../../../exceptions/badRequest/userNotExists.exception";
import { ConfigurationService } from "../../../config/configuration.service";
import { REDIS_KEY } from "../../../services/redisService/redisKey";
import { EmailService } from "../../../services/emailService/email.service";
import {
  EMAIL_FORGOT_PASSWORD_SERVICE,
  FORGOT_PASSWORD_TOKEN_EXPIRED,
} from "../../../helpers/constant";
import {
  EmailUIUrlParams,
  EmailUIUrlService,
} from "../register/emailUIUrl.service";

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configurationService: ConfigurationService,
    @Inject(EMAIL_FORGOT_PASSWORD_SERVICE)
    private readonly emailForgotPasswordService: EmailService,
    private readonly emailUIUrlService: EmailUIUrlService,
  ) {}

  async execute(payload: ForgotPasswordPayload) {
    const { email } = payload;

    const user = await this.prismaService.user.findFirst({
      where: {
        AND: [
          {
            email,
          },
          {
            deletedAt: null,
          },
        ],
      },
    });

    if (!user) {
      throw new UserNotExistsException();
    }

    const params: EmailUIUrlParams = {
      emailUIUrl: this.configurationService.resetPasswordUIUrl,
      key: REDIS_KEY.RESET_PASSWORD,
      email,
      tokenExpired: FORGOT_PASSWORD_TOKEN_EXPIRED,
    };
    const url = await this.emailUIUrlService.execute(params);
    await this.emailForgotPasswordService.sendEmail(email, {
      resetPasswordUrl: url,
    });
  }
}
