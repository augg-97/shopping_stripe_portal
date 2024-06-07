import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../services/prismaService/prisma.service";
import { Prisma } from "@prisma/client";
import { LoggerService } from "../../services/loggerService/logger.service";

@Injectable()
export class UserRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly loggerService: LoggerService,
  ) {}

  async findUserByEmail(email: string) {
    try {
      return await this.prismaService.user.findFirst({
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
        include: {
          profileImage: true,
          coverImage: true,
        },
      });
    } catch (err) {
      this.loggerService.error(
        "🚀 ~ UserRepository ~ findUserByEmail ~ err:",
        err,
      );
      return null;
    }
  }

  async findUserById(id: number) {
    try {
      return await this.prismaService.user.findFirst({
        where: {
          AND: [
            {
              id,
            },
            {
              deletedAt: null,
            },
          ],
        },
        include: {
          profileImage: true,
          coverImage: true,
        },
      });
    } catch (err) {
      this.loggerService.error(
        "🚀 ~ UserRepository ~ findUserByEmail ~ err:",
        err,
      );

      return null;
    }
  }

  async createUser(data: Prisma.UserCreateInput) {
    try {
      return await this.prismaService.user.create({
        data,
        include: {
          profileImage: true,
          coverImage: true,
        },
      });
    } catch (err) {
      this.loggerService.error("🚀 ~ UserRepository ~ createUser ~ err:", err);
      return null;
    }
  }

  async updateUserById(id: number, data: Prisma.UserUpdateInput) {
    try {
      return await this.prismaService.user.update({
        data,
        where: {
          id,
        },
        include: {
          profileImage: true,
          coverImage: true,
        },
      });
    } catch (err) {
      console.log("🚀 ~ UserRepository ~ updateUserById ~ err:", err);
      return null;
    }
  }
}
