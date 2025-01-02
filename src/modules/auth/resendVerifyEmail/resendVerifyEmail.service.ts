import { Injectable } from '@nestjs/common';
import { AuthUser } from '../../../services/tokenService/authUser';
import { UserNotExistsException } from '../../../exceptions/badRequest/userNotExists.exception';
import { BadRequestException } from '../../../exceptions/badRequest/badRequest.exception';
import {
  EmailUIUrlParams,
  EmailUIUrlService,
} from '../register/emailUIUrl.service';
import { VERIFY_EMAIL_TOKEN_EXPIRED } from '../../../helpers/constant';
import { AppConfigService } from '../../../appConfigs/appConfig.service';
import { REDIS_KEY } from '../../../services/redisService/redisKey';
import { UserRepository } from '../../../repositories/user.repository';
import { EmailVerifyService } from '../../../services/emailService/emailVerify.service';

@Injectable()
export class ResendVerifyEmailService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailUIUrlService: EmailUIUrlService,
    private readonly emailVerifyService: EmailVerifyService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async execute(authUser: AuthUser): Promise<void> {
    const { email } = authUser;

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new UserNotExistsException();
    }

    if (user.isVerify) {
      throw new BadRequestException(
        'EMAIL_VERIFIED',
        'Your email was verified',
      );
    }

    const params: EmailUIUrlParams = {
      emailUIUrl: this.appConfigService.verifyEmailUIUrl,
      key: REDIS_KEY.VERIFY_EMAIL,
      email,
      tokenExpired: VERIFY_EMAIL_TOKEN_EXPIRED,
    };
    const url = await this.emailUIUrlService.execute(params);
    await this.emailVerifyService.sendEmail(email, { verifyEmailUrl: url });
  }
}
