import { Injectable } from "@nestjs/common";
import { RegisterPayload } from "./register.payload";
import { PrismaService } from "../../../services/prismaService/prisma.service";
import { PasswordService } from "../../../services/passwordService/password.service";
import { UserDtoBuilderService } from "../../users/userDtoBuilder/userDtoBuilder.service";
import { ExistsUserException } from "../../../exceptions/badRequest/existsUser.exception";
import { userInclude } from "../../users/userDtoBuilder/userDto.interface";

@Injectable()
export class RegisterService {
  constructor(
    private prismaService: PrismaService,
    private passwordService: PasswordService,
    private userDtoBuilderService: UserDtoBuilderService,
  ) {}

  async execute(payload: RegisterPayload) {
    const { email, preHashPassword, fullName } = payload;
    const hasUser = await this.prismaService.user.findFirst({
      where: {
        AND: [
          {
            email,
          },
          {
            deletedAt: null,
          },
        ],
      },
    });

    if (hasUser) {
      throw new ExistsUserException();
    }

    const { passwordHashed, salt } = await this.passwordService.hashPassword(
      preHashPassword,
      email,
    );
    const user = await this.prismaService.user.create({
      data: {
        email,
        fullName,
        salt,
        passwordHashed,
      },
      include: userInclude,
    });

    return this.userDtoBuilderService.execute(user);
  }
}
