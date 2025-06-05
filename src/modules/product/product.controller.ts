import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateProductGuard } from '@guards/createProduct.guard';
import { AuthUserRequest } from '@decorators/authUserRequest.decorator';
import { AuthUser } from '@services/tokenService/authUser';

import { CreateProductPayload } from './createProduct/createProduct.payload';
import { CreateProductService } from './createProduct/createProduct.service';

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly createProductService: CreateProductService) {}

  @UseGuards(CreateProductGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createProduct(
    @AuthUserRequest('user') authUser: AuthUser,
    @Body() payload: CreateProductPayload,
  ) {
    return await this.createProductService.execute(authUser, payload);
  }
}
