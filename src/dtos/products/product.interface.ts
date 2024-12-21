import { Prisma, Product } from '@prisma/client';
import { IMediaDto } from '../media/media.interface';
import { IStoreDto } from '../stores/store.interface';

export const productInclude = Prisma.validator<Prisma.ProductInclude>()({
  media: true,
  store: {
    include: {
      profileImage: true,
      coverImage: true,
    },
  },
});

export type ProductEntity = Prisma.ProductGetPayload<{
  include: typeof productInclude;
}>;

export interface IProductDto
  extends Pick<Product, 'id' | 'name' | 'description' | 'stock'> {
  info?: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  media?: IMediaDto[];
  store?: IStoreDto;
}
