import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { AppConfigService } from '../../appConfigs/appConfig.service';

@Injectable()
export class PasswordService {
  constructor(private appConfigService: AppConfigService) {}

  async hashPassword(
    password: string,
    email: string,
  ): Promise<{ salt: string; passwordHashed: string }> {
    const saltRounds = this.appConfigService.saltRounds;
    const salt = await genSalt(saltRounds);
    const plainPassword = `${password}${email.toLowerCase()}`;
    const passwordHashed = await hash(plainPassword, salt);

    return {
      salt,
      passwordHashed,
    };
  }

  async comparePassword(
    password: string,
    email: string,
    passwordHashed: string,
  ): Promise<boolean> {
    const plainPassword = `${password}${email.toLowerCase()}`;

    return await compare(plainPassword, passwordHashed);
  }
}
