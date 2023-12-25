import { HttpException, HttpStatus } from "@nestjs/common";

export class TokenInvalidException extends HttpException {
  constructor() {
    super(
      { errorCode: "INVALID_TOKEN", message: "Token is invalid" },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
