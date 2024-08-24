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

export class AbstractListDto {
  total: number;
  currentPage: number;
}
