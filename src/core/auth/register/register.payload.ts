import { Transform, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class RegisterPayload {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly email: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^\s])[A-Za-z\d~!@#$%^\s]{8,16}$/g,
    {
      message:
        "Password must have a combination of lower and upper case letters, numbers, and special characters, between 8 and 16 characters in length.",
    },
  )
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly preHashPassword: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly fullName: string;
}
