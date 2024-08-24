import { Prisma, Product } from '@prisma/client';
import { MediaDto } from './media.dto';
import { Exclude } from 'class-transformer';

// export class ProductDto implements Product {
//   id: number;

//   name: string;

//   description: string;

//   info: string;

//   price: Prisma.Decimal;

//   stock: number;

//   createdAt: Date;

//   updatedAt: Date;

//   store?: StoreDto;

//   media: MediaDto[];

//   createdBy?: UserDto;

//   @Exclude()
//   createdUser: number;

//   @Exclude()
//   storeId: number;

//   constructor(product: Partial<ProductDto>) {
//     Object.assign(this, product);

//     if (product.media && product.media.length > 0) {
//       this.media = product.media.map((item) => new MediaDto(item));
//     }

//     if (product.createdBy) {
//       this.createdBy = new UserDto(product.createdBy);
//     }

//     if (product.store) {
//       this.store = new StoreDto(product.store);
//     }
//   }
// }

// export class
