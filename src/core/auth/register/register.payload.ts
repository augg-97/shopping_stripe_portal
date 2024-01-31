import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { ConfigurationService } from "../../../config/configuration.service";

export class RegisterPayload {
  @ApiProperty({
    description: "email",
    default: "user@mock.com",
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly email: string;

  @ApiProperty({
    description: "preHashPassword",
    default:
      "HwdvzXe07GCePZMw7Lhg11yNMlcj0O6eYvAyiEn54ZLcldHHiIWeDbQSoFmjEOgRyEVjFc0xSNSZc1Xdg4hCBN44KTW9tYll4Jq7sIMfdt7nLApnvIOm0DGmx4TtahhSiUJZS4WGgYcGmBGeXfPtgLcZB4gcYLRHugqysCiFaWUHLo5qjwKM3dx9SNJsOK+EU0LBwbdQUrzqBNKXg5pabvPDr4RcxsvL4gTsEOydoVTEdQRtSEjUPpSWxzxa22gMnLnWJ2GdGV5VwCs2eLH2K/ZPSHQbD0G2KNTr407MFeC6dERIawLTojUiHW1VTNQKNNcjV+JrmiDuC41Z1aIDbQ==",
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^\s])[A-Za-z\d~!@#$%^\s]{8,16}$/g,
    {
      message:
        "Password must have a combination of lower and upper case letters, numbers, and special characters, between 8 and 16 characters in length.",
    },
  )
  // @PasswordValidator()
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly preHashPassword: string;

  @ApiProperty({
    description: "fullName",
    default: "mock user",
  })
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  readonly fullName: string;
}
