import { BaseHttpException } from '@exceptions/baseHttp.exception';
import { HttpStatus } from '@nestjs/common';

export class ForbiddenException extends BaseHttpException {
  constructor(
    errorCode = 'FORBIDDEN_ERROR',
    message = "You can't access this resource",
  ) {
    super(errorCode, message, HttpStatus.FORBIDDEN);
  }
}
