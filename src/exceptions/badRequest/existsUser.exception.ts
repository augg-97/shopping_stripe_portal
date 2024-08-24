import { HttpException, HttpStatus } from '@nestjs/common';

export class ExistsUserException extends HttpException {
  constructor() {
    super(
      { errorCode: 'USER_ALREADY_EXISTS', message: 'User already exists' },
      HttpStatus.BAD_REQUEST,
    );
  }
}
