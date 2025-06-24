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
import { CachingInterceptor } from '@interceptors/caching.interceptor';
import { CacheInterceptor } from '@interceptors/cache.interceptor';
import { UserIncludeType } from '@repositories/user.repository';

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

  @CacheTTL()
  @CacheKey('USER')
  @UseInterceptors(CacheInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async getMe(
    @AuthUserRequest('user') authUser: AuthUser,
  ): Promise<UserIncludeType> {
    return await this.getMeService.execute(authUser);
  }

  @CacheTTL()
  @CacheKey('USER')
  @UseInterceptors(CacheInterceptor)
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getUserById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserIncludeType> {
    if (req.user && Number(req.user.id) === id) {
      return await this.getMeService.execute(req.user);
    }

    return await this.getUserByIdService.execute(id);
  }

  @CacheTTL()
  @CacheKey('USER')
  @UseInterceptors(CachingInterceptor)
  @HttpCode(HttpStatus.OK)
  @Put('')
  async updateProfile(
    @AuthUserRequest('user') authUser: AuthUser,
    @Body() payload: UpdateProfilePayload,
  ): Promise<UserIncludeType> {
    return await this.updateProfileService.execute(authUser, payload);
  }
}
