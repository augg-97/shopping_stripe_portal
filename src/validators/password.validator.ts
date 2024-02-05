import { Injectable } from "@nestjs/common";
import { ConfigurationService } from "../config/configuration.service";
import {
  ValidationArguments,
  ValidatorConstraintInterface,
  isNotEmpty,
  isString,
  matches,
  validate,
} from "class-validator";
import { decryptPassword } from "../helpers/decryptPassword";

@Injectable()
export class PasswordValidator {
  constructor(private readonly configurationService: ConfigurationService) {}

  // @validate((value: any) => isString(value))
  // @validate((value: any) => isNotEmpty(value))
  validatePassword(value: string) {
    console.log("here::");

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^\s])[A-Za-z\d~!@#$%^\s]{8,16}$/g;
    try {
      const passwordDecrypted = decryptPassword(
        value,
        this.configurationService.encryptionPrivateKey,
      );

      return matches(passwordDecrypted, regex) ? passwordDecrypted : "";
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ERR_OSSL_UNSUPPORTED"
      ) {
        return matches(value, regex) ? value : "";
      }

      return "";
    }
  }
}
