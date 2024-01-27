import { Injectable } from "@nestjs/common";
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  matches,
  registerDecorator,
} from "class-validator";
import { ConfigurationService } from "../config/configuration.service";
import { decryptPassword } from "../helpers/decryptPassword";

@ValidatorConstraint({ name: "PasswordValidator", async: false })
@Injectable()
export class PasswordValidatorRule implements ValidatorConstraintInterface {
  constructor(private configurationService: ConfigurationService) {}

  validate(value: string): boolean {
    const passwordDecrypted = decryptPassword(
      value,
      this.configurationService.encryptionPrivateKey,
    );
    console.log(
      "🚀 ~ PasswordValidatorRule ~ validate ~ passwordDecrypted:",
      passwordDecrypted,
    );
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^\s])[A-Za-z\d~!@#$%^\s]{8,16}$/g;

    return matches(passwordDecrypted, passwordRegex);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(validationArguments?: ValidationArguments): string {
    return "Password must have a combination of lower and upper case letters, numbers, and special characters, between 8 and 16 characters in length.";
  }
}

export function PasswordValidator(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "PasswordValidator",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: PasswordValidatorRule,
    });
  };
}
