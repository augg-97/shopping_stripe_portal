import { Provider } from '@nestjs/common';
import { AppConfigService } from '../../appConfigs/appConfig.service';
import { Transporter, createTransport } from 'nodemailer';
import { EMAIL_CLIENT } from '../../helpers/constant';

export const emailClientService: Provider = {
  provide: EMAIL_CLIENT,
  useFactory: (appConfigService: AppConfigService): Transporter => {
    const client = createTransport({
      host: appConfigService.emailServiceHost,
      secure: false,
      port: appConfigService.emailServicePort,
      auth: {
        user: appConfigService.emailServiceUserName,
        pass: appConfigService.emailServicePassword,
      },
    });

    return client;
  },
  inject: [AppConfigService],
};
