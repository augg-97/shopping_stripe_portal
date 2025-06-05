import { join } from 'path';

import { Injectable } from '@nestjs/common';

import { AppConfigService } from '@appConfigs/appConfig.service';
import { DELAY_RETRY_EMAIL, RETRIES_EMAIL_NUMBER } from '@helpers/constant';

import { AppLoggerService } from '../appLoggerService/appLogger.service';

import { EmailService } from './email.service';

@Injectable()
export class EmailVerifyService extends EmailService {
  constructor(
    protected readonly config: AppConfigService,
    protected readonly logger: AppLoggerService,
  ) {
    super(config, logger);
    this.DELAY_RETRY_EMAIL = DELAY_RETRY_EMAIL;
    this.RETRIES_EMAIL_NUMBER = RETRIES_EMAIL_NUMBER;
    this.emailInfo = {
      template: join(
        __dirname,
        '../../../public/emailTemplate/verifyEmail.html',
      ),
      subject: 'SPS VERIFY YOUR EMAIL',
    };
  }
}
