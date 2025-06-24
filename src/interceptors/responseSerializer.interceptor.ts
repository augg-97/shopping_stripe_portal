import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseSerializerInterceptor<T> implements NestInterceptor {
  constructor(
    private readonly type: Type<T>,
    private readonly transformOption?: ClassTransformOptions,
  ) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      map((data) => {
        const result = plainToInstance(this.type, data, {
          excludeExtraneousValues: true,
          ...this.transformOption,
        });

        return result;
      }),
    );
  }
}
