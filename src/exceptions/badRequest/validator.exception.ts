import { BaseHttpException } from '@exceptions/baseHttp.exception';
import { HttpStatus } from '@nestjs/common';

export class ValidatorException extends BaseHttpException {
  constructor(message: string) {
    super('BAD_REQUEST', message, HttpStatus.BAD_REQUEST);
  }
}
