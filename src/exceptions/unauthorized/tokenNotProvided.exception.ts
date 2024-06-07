import { HttpException, HttpStatus } from "@nestjs/common";

export class TokenNotProvidedException extends HttpException {
  constructor() {
    super(
      { errorCode: "TOKEN_NOT_PROVIDED", message: "Token not provided" },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
