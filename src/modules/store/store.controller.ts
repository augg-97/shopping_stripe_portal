import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { CacheKey } from '@decorators/cacheKey.decorator';
import { AuthUserRequest } from '@decorators/authUserRequest.decorator';
import { AuthUser } from '@services/tokenService/authUser';
import { CreateStoreGuard } from '@guards/createStore.guard';

import { CreateStorePayload } from './createStore/createStore.payload';
import { CreateStoreService } from './createStore/createStore.service';

@ApiBearerAuth()
@ApiTags('stores')
@Controller('stores')
export class StoreController {
  constructor(private createStoreService: CreateStoreService) {}

  @CacheKey('STORE')
  @UseGuards(CreateStoreGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createStore(
    @AuthUserRequest('user') authUser: AuthUser,
    @Body() payload: CreateStorePayload,
  ) {
    return await this.createStoreService.execute(authUser, payload);
  }
}
