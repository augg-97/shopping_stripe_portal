import {
  Controller,
  Get,
  ParseArrayPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';
import { Product, User } from '@prisma/client';

import { CacheInterceptor } from '@interceptors/cache.interceptor';
import { CacheTTL } from '@decorators/cacheTTL.decorator';
import { Public } from '@decorators/allowAnonymous.decorator';
import { CacheKey } from '@decorators/cacheKey.decorator';
import { CACHE_EXPIRED } from '@helpers/constant';
import { ResponseSerializerInterceptor } from '@interceptors/responseSerializer.interceptor';
import { BaseProductDto } from '@dtos/products/baseProduct.dto';
import { UserDto } from '@dtos/users/user.dto';

import { ProductInclude } from './repositories/product.repository';
import { UserIncludeType } from './repositories/user.repository';
import { AppLoggerService } from './services/appLoggerService/appLogger.service';
import { AppService } from './app.service';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: AppLoggerService,
  ) {
    this.logger.serviceName = AppController.name;
  }

  @Public()
  @Get('ping')
  ping(): { message: string } {
    return this.appService.ping();
  }

  @Public()
  @CacheKey('USER')
  @CacheTTL(CACHE_EXPIRED)
  // @UseInterceptors(CacheInterceptor)
  @UseInterceptors(new ResponseSerializerInterceptor(UserDto))
  @Get('mock/:id')
  mock(
    @Query('name', new ParseArrayPipe({ separator: ',', optional: true }))
    name?: string[],
  ): User | User[] | Product {
    const user: UserIncludeType = {
      id: 2,
      fullName: 'test 2',
      email: 'lhhoang98197+2@gmail.com',
      type: 'USER',
      isVerify: true,
      salt: 'salt',
      passwordHashed: 'hash',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      profileImageId: 3,
      coverImageId: 4,
      profileImage: {
        id: 3,
        fileName: 'file_3',
        url: 'file_3.png',
        uploaderId: 2,
        productId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      coverImage: null,
      // coverImage: {
      //   id: 4,
      //   fileName: 'file_4',
      //   url: 'file_4.png',
      //   uploaderId: 2,
      //   productId: null,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      stores: [
        {
          id: 1,
          name: 'test store',
          ownerId: 2,
          deletedAt: null,
          profileImageId: 5,
          coverImageId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          profileImage: {
            id: 5,
            fileName: 'file_5',
            url: 'file_5.png',
            uploaderId: 2,
            productId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          coverImage: null,
        },
      ],
    };

    const product: ProductInclude = {
      id: 123,
      name: 'product_1',
      description: 'This is product_1',
      info: null,
      stock: 99,
      price: new Decimal(0.99),
      storeId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdUser: 1,
      media: [
        {
          id: 1,
          fileName: 'file_1',
          url: 'file_1.png',
          uploaderId: 2,
          productId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          fileName: 'file_2',
          url: 'file_2.png',
          uploaderId: 2,
          productId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          fileName: 'file_3',
          url: 'file_3.png',
          uploaderId: 2,
          productId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      createdBy: {
        id: 1,
        fullName: 'test 1',
        email: 'lhhoang98197@gmail.com',
        type: 'USER',
        isVerify: true,
        salt: 'salt',
        passwordHashed: 'hash',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        profileImageId: 1,
        coverImageId: 2,
        profileImage: {
          id: 1,
          fileName: 'file_1',
          url: 'file_1.png',
          uploaderId: 1,
          productId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        coverImage: {
          id: 2,
          fileName: 'file_2',
          url: 'file_2.png',
          uploaderId: 1,
          productId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      store: {
        id: 1,
        name: 'test store',
        ownerId: 2,
        deletedAt: null,
        profileImageId: 5,
        coverImageId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        profileImage: {
          id: 5,
          fileName: 'file_5',
          url: 'file_5.png',
          uploaderId: 2,
          productId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        coverImage: null,
      },
    };

    const { profileImage, coverImage, stores, ...entity } = user;

    this.logger.log('🚀 ~ AppController ~ mock ~ entity:', entity);

    return user;
  }
}
