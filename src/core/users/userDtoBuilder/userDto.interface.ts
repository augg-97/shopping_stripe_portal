import { Prisma } from "@prisma/client";

export interface MediaDto {
  id: string;
  code: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserDto {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
  profile: MediaDto | null;
  cover: MediaDto | null;
}

export const userInclude = Prisma.validator<Prisma.UserInclude>()({
  profileImage: true,
  coverImage: true,
});

export type UserDBQuery = Prisma.UserGetPayload<{
  include: typeof userInclude;
}>;
