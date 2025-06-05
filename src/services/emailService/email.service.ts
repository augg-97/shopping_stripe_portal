import { readFile } from 'fs/promises';

import { Transporter, createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { compile } from 'handlebars';

import { AppConfigService } from '@appConfigs/appConfig.service';
import { retry } from '@helpers/retry';
import { AppLoggerService } from '@services/appLoggerService/appLogger.service';

export interface EmailInfo {
  template: string;
  subject: string;
}
export type ForgotPasswordParam = Record<'resetPasswordUrl', string>;
export type VerifyEmailParam = Record<'verifyEmailUrl', string>;
export type EmailParam = ForgotPasswordParam | VerifyEmailParam;

export class EmailService {
  protected client: Transporter;
  protected RETRIES_EMAIL_NUMBER!: number;
  protected DELAY_RETRY_EMAIL!: number;
  protected emailInfo!: EmailInfo;

  constructor(
    protected readonly appConfigService: AppConfigService,
    protected readonly logger: AppLoggerService,
  ) {
    this.client = createTransport({
      host: appConfigService.emailServiceHost,
      secure: false,
      port: appConfigService.emailServicePort,
      auth: {
        user: appConfigService.emailServiceUserName,
        pass: appConfigService.emailServicePassword,
      },
    });
  }

  async sendEmail(email: string, param: EmailParam): Promise<void> {
    const template = await this.readEmailTemplate();

    const html = compile(template);

    const emailOptions: Mail.Options = {
      from: this.appConfigService.emailServiceSender,
      to: email,
      subject: this.emailInfo.subject,
      html: html(param),
    };
    try {
      const info = await this.client.sendMail(emailOptions);
      this.logger.log(
        '🚀 ~ EmailService ~ sendResetPasswordEmail ~ info:',
        info,
      );
    } catch (error) {
      this.logger.error(
        '🚀 ~ EmailService ~ sendResetPasswordEmail ~ error:',
        error,
      );
      await retry(
        await this.client.sendMail(emailOptions),
        this.RETRIES_EMAIL_NUMBER,
        this.DELAY_RETRY_EMAIL,
        this.logger,
      );
    }
  }

  private async readEmailTemplate(): Promise<string> {
    return await readFile(this.emailInfo.template, { encoding: 'utf-8' });
  }
}
