import { ValidatorException } from '@exceptions/badRequest/validator.exception';
import { getValidatorError } from '@helpers/getValidatorErrorMessage';
import { Injectable, ValidationPipe } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      exceptionFactory(errors): void {
        const message = getValidatorError(errors);
        throw new ValidatorException(message);
      },
    });
  }
}
