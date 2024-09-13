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
import { StoreDto } from '../../dtos/store.dto';

@ApiBearerAuth()
@ApiTags('stores')
@Controller('stores')
export class StoreController {
  constructor(private createStoreService: CreateStoreService) {}

  @CacheKey('STORE')
  @UseInterceptors(CachingInterceptor<StoreDto>)
  @UseGuards(CreateStoreGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createStore(@Req() req: Request, @Body() payload: CreateStorePayload) {
    return await this.createStoreService.execute(req.user, payload);
  }
}
