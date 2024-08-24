import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
  constructor(errorCode: string, message: string) {
    super({ errorCode, message }, HttpStatus.CONFLICT);
  }
}
