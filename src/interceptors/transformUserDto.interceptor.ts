import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, map } from 'rxjs';

import { UserDtoBuilder } from '@dtos/users/user.builder';
import { IUserDto, UserEntity } from '@dtos/users/user.interface';
import { UserWithStoreDto } from '@dtos/users/userWithStore.dto';
import { AuthUser } from '@services/tokenService/authUser';

@Injectable()
export class TransformUserDtoInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<UserEntity>,
  ): Observable<IUserDto> {
    const { user, path } = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      map((entity) => {
        const builder = new UserDtoBuilder();
        const dto = new UserWithStoreDto(
          builder,
          this.isTransformPrivate(entity.id, path, user),
        );
        dto.build(entity);

        return builder.toDto();
      }),
    );
  }

  isTransformPrivate(id: number, path: string, authUser?: AuthUser): boolean {
    const isAuthPath = this.isAuthPath(path);
    if (isAuthPath) {
      return true;
    }

    if (authUser && Number(authUser.id) !== id) {
      return true;
    }

    return false;
  }

  isAuthPath(path: string): boolean {
    return !!path.match(/\/v1\/auth\//g);
  }
}
