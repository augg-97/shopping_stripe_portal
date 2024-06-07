import { PickType } from "@nestjs/swagger";
import { ResetPasswordPayload } from "../resetPassword/resetPassword.payload";

export class VerifyEmailPayload extends PickType(ResetPasswordPayload, [
  "email",
  "token",
]) {}
