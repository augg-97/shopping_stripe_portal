import { Injectable } from "@nestjs/common";
import { RegisterPayload } from "./register.payload";
import { PrismaService } from "src/services/prismaService/prisma.service";
import { ExistsUserException } from "src/exceptions/badRequest/existsUser.exception";
import { PasswordService } from "src/services/passwordService/password.service";

@Injectable()
export class RegisterService {
  constructor(
    private prismaService: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async execute(payload: RegisterPayload) {
    const { email, password, fullName } = payload;
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

    const { passwordHashed, salt } =
      await this.passwordService.hashPassword(password);
    const user = await this.prismaService.user.create({
      data: {
        email,
        fullName,
        salt,
        passwordHashed,
      },
    });

    return payload;
  }
}
