import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { PasswordValidator } from "src/validators/Password.validator";

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
  password: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  fullName: string;
}
