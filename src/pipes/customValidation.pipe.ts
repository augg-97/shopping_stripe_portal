import { Injectable, ValidationError, ValidationPipe } from '@nestjs/common';

import { ValidatorException } from '@exceptions/badRequest/validator.exception';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      exceptionFactory(errors): void {
        const message = CustomValidationPipe.getValidatorError(errors);
        throw new ValidatorException(message);
      },
    });
  }

  private static getValidatorError(errors: ValidationError[]): string {
    const flattenedErrors = this.flattenError(errors);

    return flattenedErrors[0]?.constraints
      ? Object.values(flattenedErrors[0].constraints)[0]
      : 'Validation error';
  }

  private static flattenError(errors: ValidationError[]): ValidationError[] {
    return errors.reduce<ValidationError[]>((acc, error) => {
      const { children, ...restError } = error;
      acc.push(restError);

      if (children && children.length > 0) {
        acc.push(...this.flattenError(children));
      }

      return acc;
    }, []);
  }
}
