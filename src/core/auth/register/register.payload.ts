import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { PasswordValidator } from "../../../validators/Password.validator";

export class RegisterPayload {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  email: string;

  @PasswordValidator()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  preHashPassword: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  fullName: string;
}
