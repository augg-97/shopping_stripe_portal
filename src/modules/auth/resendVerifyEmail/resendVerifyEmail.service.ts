import { Inject, Injectable } from '@nestjs/common';
import { AuthUser } from '../../../services/tokenService/authUser';
import { UserNotExistsException } from '../../../exceptions/badRequest/userNotExists.exception';
import { BadRequestException } from '../../../exceptions/badRequest/badRequest.exception';
import {
  EmailUIUrlParams,
  EmailUIUrlService,
} from '../register/emailUIUrl.service';
import {
  EMAIL_VERIFY_SERVICE,
  VERIFY_EMAIL_TOKEN_EXPIRED,
} from '../../../helpers/constant';
import { EmailService } from '../../../services/emailService/email.service';
import { ConfigurationService } from '../../../config/configuration.service';
import { REDIS_KEY } from '../../../services/redisService/redisKey';
import { UserRepository } from '../../user/user.repository';

@Injectable()
export class ResendVerifyEmailService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailUIUrlService: EmailUIUrlService,
    @Inject(EMAIL_VERIFY_SERVICE)
    private readonly emailVerifyService: EmailService,
    private readonly configurationService: ConfigurationService,
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
      emailUIUrl: this.configurationService.verifyEmailUIUrl,
      key: REDIS_KEY.VERIFY_EMAIL,
      email,
      tokenExpired: VERIFY_EMAIL_TOKEN_EXPIRED,
    };
    const url = await this.emailUIUrlService.execute(params);
    await this.emailVerifyService.sendEmail(email, { verifyEmailUrl: url });
  }
}
