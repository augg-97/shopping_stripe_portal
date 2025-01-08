import { HttpException, HttpStatus } from '@nestjs/common';

interface IBaseHttpExceptionRes {
  errorCode: string;
  message: string;
}

export class BaseHttpException extends HttpException {
  constructor(
    private readonly errorCode: string,
    message: string,
    status: HttpStatus,
  ) {
    super(message, status);
  }

  getResponse(): IBaseHttpExceptionRes {
    return {
      errorCode: this.errorCode,
      message: this.message,
    };
  }
}
