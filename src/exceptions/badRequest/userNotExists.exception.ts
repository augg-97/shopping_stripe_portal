import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotExistsException extends HttpException {
  constructor() {
    super(
      { errorCode: 'USER_NOT_EXISTS', message: "User doesn't exists" },
      HttpStatus.BAD_REQUEST,
    );
  }
}
