import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './decorators/allowAnonymous.decorator';
import { Decimal } from '@prisma/client/runtime/library';
import { ProductInclude } from './repositories/product.repository';
import { UserIncludeType } from './repositories/user.repository';
import { LoggerService } from './services/loggerService/logger.service';
import { UserDtoBuilder } from './dtos/users/user.builder';
import { UserWithStoreDto } from './dtos/users/userWithStore.dto';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: LoggerService,
  ) {}

  @Public()
  @Get('ping')
  ping(): { message: string } {
    return this.appService.ping();
  }

  @Public()
  @Get('mock')
  mock() {
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
      media: [],
      // media: [
      //   {
      //     id: 1,
      //     fileName: 'file_1',
      //     url: 'file_1.png',
      //     uploaderId: 2,
      //     productId: null,
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   {
      //     id: 2,
      //     fileName: 'file_2',
      //     url: 'file_2.png',
      //     uploaderId: 2,
      //     productId: null,
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   {
      //     id: 3,
      //     fileName: 'file_3',
      //     url: 'file_3.png',
      //     uploaderId: 2,
      //     productId: null,
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      // ],
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

    const builder = new UserDtoBuilder();
    const dto = new UserWithStoreDto(builder);
    dto.build(user);

    return builder.toDto();
  }
}
