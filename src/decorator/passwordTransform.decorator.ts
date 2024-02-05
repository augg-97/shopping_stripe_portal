import {
  createParamDecorator,
  ExecutionContext,
  ValidationPipe,
} from "@nestjs/common";
import { ConfigurationService } from "../config/configuration.service";
import { decryptPassword } from "../helpers/decryptPassword";
import { matches } from "class-validator";
import { getValidatorError } from "../helpers/getValidatorErrorMessage";
import { ValidatorException } from "../exceptions/badRequest/validator.exception";

export const PasswordTransformDecorator = createParamDecorator(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (data: any, ctx: ExecutionContext) => {
    const { body } = ctx.switchToHttp().getRequest();
    const configurationService = ctx;
    console.log("🚀 ~ configurationService:", configurationService);
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^\s])[A-Za-z\d~!@#$%^\s]{8,16}$/g;

    return body;
    // if (!body.preHashPassword) {
    //   return body;
    // }

    // console.log("🚀 ~ body.preHashPassword:", body.preHashPassword);
    // try {
    //   const passwordDecrypted = decryptPassword(
    //     body.preHashPassword,
    //     configurationService.encryptionPrivateKey,
    //   );

    //   return {
    //     ...body,
    //     preHashPassword: matches(passwordDecrypted, regex)
    //       ? passwordDecrypted
    //       : "",
    //   };
    // } catch (error) {
    //   if (
    //     error instanceof Error &&
    //     "code" in error &&
    //     error.code === "ERR_OSSL_UNSUPPORTED" &&
    //     matches(body.preHashPassword, regex)
    //   ) {
    //     return body;
    //   }

    //   return {
    //     ...body,
    //     preHashPassword: "",
    //   };
    // }
  },
);

export const CredentialsBodyValidation = () =>
  PasswordTransformDecorator(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      exceptionFactory(errors) {
        const message = getValidatorError(errors);
        throw new ValidatorException(message);
      },
    }),
  );
