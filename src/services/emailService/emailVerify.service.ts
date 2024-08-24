import { Provider } from '@nestjs/common';
import { EMAIL_CLIENT, EMAIL_VERIFY_SERVICE } from '../../helpers/constant';
import { ConfigurationService } from '../../config/configuration.service';
import { Transporter } from 'nodemailer';
import { EmailInfo, EmailService } from './email.service';
import { join } from 'path';
import { LoggerService } from '../loggerService/logger.service';

export const emailVerifyService: Provider = {
  provide: EMAIL_VERIFY_SERVICE,
  useFactory: (
    configurationService: ConfigurationService,
    loggerService: LoggerService,
    emailClient: Transporter,
  ) => {
    const emailInfo: EmailInfo = {
      template: join(
        __dirname,
        '../../../public/emailTemplate/verifyEmail.html',
      ),
      subject: 'SPS VERIFY YOUR EMAIL',
    };

    return new EmailService(
      configurationService,
      loggerService,
      emailClient,
      emailInfo,
    );
  },
  inject: [ConfigurationService, LoggerService, EMAIL_CLIENT],
};
