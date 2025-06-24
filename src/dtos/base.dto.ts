import { Expose } from 'class-transformer';

export class BaseDto {
  @Expose()
  id!: number;

  @Expose()
  createdAt!: string;

  @Expose()
  updatedAt!: string;
}
