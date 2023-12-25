import { HttpException, HttpStatus } from "@nestjs/common";

export class AccessTokenExpiredException extends HttpException {
  constructor() {
    super(
      { errorCode: "ACCESS_TOKEN_EXPIRED", message: "Access token is expired" },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
