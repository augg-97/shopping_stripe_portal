import { Injectable } from '@nestjs/common';
import {
  DELAY_RETRY_EMAIL,
  RETRIES_EMAIL_NUMBER,
} from '../../helpers/constant';
import { AppConfigService } from '../../appConfigs/appConfig.service';
import { EmailService } from './email.service';
import { join } from 'path';
import { AppLoggerService } from '../appLoggerService/appLogger.service';

@Injectable()
export class EmailForgotPasswordService extends EmailService {
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
        '../../../public/emailTemplate/resetPassword.html',
      ),
      subject: 'SPS RESET PASSWORD',
    };
  }
}
