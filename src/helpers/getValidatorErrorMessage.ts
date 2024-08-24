import { ValidationError } from '@nestjs/common';

export const getValidatorError = (errors: ValidationError[]): string => {
  if (errors.length === 0) {
    return '';
  }

  const error = errors[0];
  if (error.children && error.children.length > 0) {
    return getValidatorError(error.children);
  }

  return error.constraints ? Object.values(error.constraints)[0] : '';
};
