import { Exclude, Transform } from 'class-transformer';

export class AbstractDto {
  id: number;

  @Transform((data) => data.value.toISOString())
  createdAt: Date;

  @Transform((data) => data.value.toISOString())
  updatedAt: Date;

  @Exclude()
  deletedAt: Date | null;
}

export interface IAbstractDto {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export class IAbstractListDto<T> {
  total: number;
  currentPage: number;
  data: T[];
}
