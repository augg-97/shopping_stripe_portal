import { HttpException, HttpStatus } from "@nestjs/common";

export class TokenConflictException extends HttpException {
  constructor() {
    super(
      {
        errorCode: "GENERATE_TOKEN_FAIL",
        message: "Error while generate token",
      },
      HttpStatus.CONFLICT,
    );
  }
}
