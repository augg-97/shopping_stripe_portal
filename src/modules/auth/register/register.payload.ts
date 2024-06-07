import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class RegisterPayload {
  @ApiProperty({
    description: "email",
    default: "user@mock.com",
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  email: string;

  @ApiProperty({
    description: "password",
    default: "12345Hoang",
  })
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
  password: string;

  @ApiProperty({
    description: "fullName",
    default: "mock user",
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  fullName: string;
}
