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
import { GetMeService } from './getMe/getMe.service';
import { Public } from '../../decorators/allowAnonymous.decorator';
import { GetUserByIdService } from './getUserById/getUserById.service';
import { CacheKey } from '../../decorators/cacheKey.decorator';
import { IdentifyCacheKey } from '../../decorators/identifyCacheKey.decorator';
import { CacheInterceptor } from '../../interceptors/cache.interceptor';
import { UpdateProfilePayload } from './updateProfile/updateProfile.payload';
import { UpdateProfileService } from './updateProfile/updateProfile.service';
import { CachingInterceptor } from '../../interceptors/caching.interceptor';
import { CacheTTL } from '../../decorators/cacheTTL.decorator';
import { IUserDto } from '../../dtos/user.dto';

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
  @IdentifyCacheKey('USER')
  @UseInterceptors(CacheInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async getMe(@Req() req: Request): Promise<IUserDto> {
    return await this.getMeService.execute(req.user);
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
  ): Promise<IUserDto> {
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
    @Req() req: Request,
    @Body() payload: UpdateProfilePayload,
  ): Promise<IUserDto> {
    return await this.updateProfileService.execute(req.user, payload);
  }
}
