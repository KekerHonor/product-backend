import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('get')
  @UseGuards(AuthGuard)
  getProducts() {
    return this.productsService.getProducts();
  }

  // @Get('')
  // getProductById(@Query() params: any) {
  //   const id = params['id'];
  //   return this.productsService.getProductById(id);
  // }
  @Get(':id')
  @UseGuards(AuthGuard)
  getProductById(@Param('id') id: any) {
    return this.productsService.getProductById(id);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  createProduct(@Body() data) {
    console.log(data);
    return this.productsService.createProduct(
      data.name,
      data.price,
      data.location,
      data.image,
    );
  }
}
