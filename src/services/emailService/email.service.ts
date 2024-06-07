import { Inject, Injectable } from "@nestjs/common";
import { Transporter } from "nodemailer";
import { ConfigurationService } from "../../config/configuration.service";
import { readFile } from "fs/promises";
import { LoggerService } from "../loggerService/logger.service";
import Mail from "nodemailer/lib/mailer";
import { compile } from "handlebars";
import { retry } from "../../helpers/retry";
import {
  DELAY_RETRY_EMAIL,
  EMAIL_CLIENT,
  EMAIL_INFO,
  RETRIES_EMAIL_NUMBER,
} from "../../helpers/constant";

export type EmailInfo = {
  template: string;
  subject: string;
};
export type ForgotPasswordParam = Record<"resetPasswordUrl", string>;
export type VerifyEmailParam = Record<"verifyEmailUrl", string>;
export type EmailParam = ForgotPasswordParam | VerifyEmailParam;

@Injectable()
export class EmailService {
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly loggerService: LoggerService,
    @Inject(EMAIL_CLIENT) private readonly emailClient: Transporter,
    @Inject(EMAIL_INFO) private readonly emailInfo: EmailInfo,
  ) {}

  async sendEmail(email: string, param: EmailParam) {
    const template = await this.readEmailTemplate(this.emailInfo.template);

    const html = compile(template);

    const emailOptions: Mail.Options = {
      from: this.configurationService.emailServiceSender,
      to: email,
      subject: this.emailInfo.subject,
      html: html(param),
    };
    try {
      const info = await this.emailClient.sendMail(emailOptions);
      this.loggerService.log(
        "🚀 ~ EmailService ~ sendResetPasswordEmail ~ info:",
        info,
      );
    } catch (error) {
      this.loggerService.error(
        "🚀 ~ EmailService ~ sendResetPasswordEmail ~ error:",
        error,
      );
      await retry(
        await this.emailClient.sendMail(emailOptions),
        RETRIES_EMAIL_NUMBER,
        DELAY_RETRY_EMAIL,
        this.loggerService,
      );
    }
  }

  private async readEmailTemplate(template: string): Promise<string> {
    return await readFile(template, { encoding: "utf-8" });
  }
}
