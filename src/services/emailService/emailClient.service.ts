import { Provider } from '@nestjs/common';
import { ConfigurationService } from '../../config/configuration.service';
import { Transporter, createTransport } from 'nodemailer';
import { EMAIL_CLIENT } from '../../helpers/constant';

export const emailClientService: Provider = {
  provide: EMAIL_CLIENT,
  useFactory: (configurationService: ConfigurationService): Transporter => {
    const client = createTransport({
      host: configurationService.emailServiceHost,
      secure: false,
      port: configurationService.emailServicePort,
      auth: {
        user: configurationService.emailServiceUserName,
        pass: configurationService.emailServicePassword,
      },
    });

    return client;
  },
  inject: [ConfigurationService],
};
