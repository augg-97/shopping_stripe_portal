import { Injectable } from "@nestjs/common";
import { compare, genSalt, hash } from "bcrypt";
import { ConfigurationService } from "../../config/configuration.service";

@Injectable()
export class PasswordService {
  constructor(private configurationService: ConfigurationService) {}

  async hashPassword(
    password: string,
    email: string,
  ): Promise<{ salt: string; passwordHashed: string }> {
    const saltRounds = this.configurationService.saltRounds;
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
