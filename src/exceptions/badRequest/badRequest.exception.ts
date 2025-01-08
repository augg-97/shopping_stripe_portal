import { BaseHttpException } from '@exceptions/baseHttp.exception';
import { HttpStatus } from '@nestjs/common';

export class BadRequestException extends BaseHttpException {
  constructor(errorCode: string, message: string) {
    super(errorCode, message, HttpStatus.BAD_REQUEST);
  }
}
