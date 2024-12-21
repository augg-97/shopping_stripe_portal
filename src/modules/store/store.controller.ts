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
import { CreateStoreService } from './createStore/createStore.service';
import { Request } from 'express';
import { CreateStorePayload } from './createStore/createStore.payload';
import { CreateStoreGuard } from '../../guards/createStore.guard';
import { CacheKey } from '../../decorators/cacheKey.decorator';
import { CachingInterceptor } from '../../interceptors/caching.interceptor';
import { IStoreDto } from '../../dtos/stores/store.interface';

@ApiBearerAuth()
@ApiTags('stores')
@Controller('stores')
export class StoreController {
  constructor(private createStoreService: CreateStoreService) {}

  @CacheKey('STORE')
  @UseInterceptors(CachingInterceptor<IStoreDto>)
  @UseGuards(CreateStoreGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createStore(@Req() req: Request, @Body() payload: CreateStorePayload) {
    return await this.createStoreService.execute(req.user, payload);
  }
}
