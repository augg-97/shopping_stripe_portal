import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { Public } from '@decorators/allowAnonymous.decorator';
import { CacheKey } from '@decorators/cacheKey.decorator';
import { CacheTTL } from '@decorators/cacheTTL.decorator';
import { AuthUserRequest } from '@decorators/authUserRequest.decorator';
import { AuthUser } from '@services/tokenService/authUser';
import { TransformUserDtoInterceptor } from '@interceptors/transformUserDto.interceptor';
import { UserEntity } from '@dtos/users/user.interface';
import { CachingInterceptor } from '@interceptors/caching.interceptor';
import { CacheInterceptor } from '@interceptors/cache.interceptor';
import { BadRequestException } from '@exceptions/badRequest/badRequest.exception';

import { UpdateProfileService } from './updateProfile/updateProfile.service';
import { UpdateProfilePayload } from './updateProfile/updateProfile.payload';
import { GetUserByIdService } from './getUserById/getUserById.service';
import { GetMeService } from './getMe/getMe.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly getMeService: GetMeService,
    private readonly getUserByIdService: GetUserByIdService,
    private readonly updateProfileService: UpdateProfileService,
  ) {}

  @UseInterceptors(TransformUserDtoInterceptor)
  @CacheTTL()
  @CacheKey('USER')
  @UseInterceptors(CacheInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async getMe(
    @AuthUserRequest('user') authUser: AuthUser,
  ): Promise<UserEntity> {
    return await this.getMeService.execute(authUser);
  }

  @UseInterceptors(TransformUserDtoInterceptor)
  @CacheTTL()
  @CacheKey('USER')
  @UseInterceptors(CacheInterceptor)
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getUserById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserEntity> {
    if (req.user && Number(req.user.id) === id) {
      return await this.getMeService.execute(req.user);
    }

    return await this.getUserByIdService.execute(id);
  }

  @UseInterceptors(TransformUserDtoInterceptor)
  @CacheTTL()
  @CacheKey('USER')
  @UseInterceptors(CachingInterceptor)
  @HttpCode(HttpStatus.OK)
  @Put('')
  async updateProfile(
    @AuthUserRequest('user') authUser: AuthUser,
    @Body() payload: UpdateProfilePayload,
  ): Promise<UserEntity> {
    return await this.updateProfileService.execute(authUser, payload);
  }
}
