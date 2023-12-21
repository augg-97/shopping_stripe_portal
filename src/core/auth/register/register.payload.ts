import { Type } from "class-transformer";
import {
  IsArray,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  Matches,
  MaxLength,
  Min,
  ValidateNested,
} from "class-validator";

class Info {
  @Min(1)
  @IsNumber()
  @IsDefined()
  @Type(() => Number)
  age = 0;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  born = "";
}

export class RegisterPayload {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  email = "";

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
  password = "";

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  fullName = "";

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Info)
  info: Info;
}
