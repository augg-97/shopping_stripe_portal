import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './decorators/allowAnonymous.decorator';
import { UserIncludeType } from './modules/user/user.repository';
import { UserDto } from './dto/user.dto';
import { plainToClass } from 'class-transformer';

@ApiTags('root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('ping')
  ping() {
    return this.appService.ping();
  }

  @Public()
  @Get('test/users')
  getUser(): UserDto {
    const user: UserIncludeType = {
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
      stores: [],
    };

    return plainToClass(UserDto, user);
  }

  @Public()
  @Get('test/users2')
  getUser2(): UserDto {
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
      coverImage: {
        id: 4,
        fileName: 'file_4',
        url: 'file_4.png',
        uploaderId: 2,
        productId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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

    return plainToClass(UserDto, user, { groups: ['private'] });
  }
}
