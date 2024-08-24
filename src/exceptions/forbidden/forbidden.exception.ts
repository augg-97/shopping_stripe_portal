import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(errorCode?: string, message?: string) {
    super(
      {
        errorCode: errorCode || 'FORBIDDEN_ERROR',
        message: message || "You can't access this resource",
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
