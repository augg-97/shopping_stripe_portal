import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { USER_ROLE } from "@prisma/client";
import { Request } from "express";
import { ForbiddenException } from "../exceptions/forbidden/forbidden.exception";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const { user } = req;
    const roles = this.reflector.get<USER_ROLE[]>(
      "roles",
      context.getHandler(),
    );

    const needAdminRole = roles && roles.includes(USER_ROLE.ADMIN);
    if (!needAdminRole) {
      return true;
    }

    if (!user || user.role !== USER_ROLE.ADMIN) {
      throw new ForbiddenException();
    }

    return true;
  }
}
