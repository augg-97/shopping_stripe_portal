import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductService } from './createProduct/createProduct.service';
import { Request } from 'express';
import { CreateProductPayload } from './createProduct/createProduct.payload';
import { CreateProductGuard } from '../../guards/createProduct.guard';

@ApiBearerAuth()
@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly createProductService: CreateProductService) {}

  @UseGuards(CreateProductGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createProduct(
    @Req() req: Request,
    @Body() payload: CreateProductPayload,
  ) {
    return await this.createProductService.execute(req.user, payload);
  }
}
