import { Injectable } from '@nestjs/common';

import { PrismaService } from '@services/prismaService/prisma.service';
import { UserNotExistsException } from '@exceptions/badRequest/userNotExists.exception';
import { REDIS_KEY } from '@services/redisService/redisKey';
import { EmailForgotPasswordService } from '@services/emailService/emailForgotPassword.service';
import { AppConfigService } from '@appConfigs/appConfig.service';
import { FORGOT_PASSWORD_TOKEN_EXPIRED } from '@helpers/constant';

import {
  EmailUIUrlParams,
  EmailUIUrlService,
} from '../register/emailUIUrl.service';

import { ForgotPasswordPayload } from './forgotPassword.payload';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly appConfigService: AppConfigService,
    private readonly emailForgotPasswordService: EmailForgotPasswordService,
    private readonly emailUIUrlService: EmailUIUrlService,
  ) {}

  async execute(payload: ForgotPasswordPayload): Promise<void> {
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
      emailUIUrl: this.appConfigService.resetPasswordUIUrl,
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
