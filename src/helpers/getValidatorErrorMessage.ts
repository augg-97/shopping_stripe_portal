import { ValidationError } from '@nestjs/common';

export const getValidatorError = (errors: ValidationError[]): string => {
  const flattenedErrors = flattenError(errors);

  return flattenedErrors[0]?.constraints
    ? Object.values(flattenedErrors[0].constraints)[0]
    : 'Validation error';
};

export const flattenError = (errors: ValidationError[]): ValidationError[] =>
  errors.reduce<ValidationError[]>((acc, error) => {
    const { children, ...restError } = error;
    acc.push(restError);

    if (children && children.length > 0) {
      acc.push(...flattenError(children));
    }

    return acc;
  }, []);
