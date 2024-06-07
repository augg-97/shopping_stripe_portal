import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
  constructor() {
    super(
      {
        errorCode: "FORBIDDEN_ERROR",
        message: "You can't access this resource",
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
