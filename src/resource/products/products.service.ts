import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './model/product.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async getProducts() {
    const data = await this.productModel.findAll();
    // console.log(data);
    return data;
  }

  async getProductById(id: string) {
    const data = await this.productModel.findOne({ where: { id: id } });
    return data;
  }

  async createProduct(
    name: string,
    price: string,
    location: string,
    image: string,
  ) {
    const nameUsed = await this.productModel.findOne({
      where: { name: name },
    });
    if (nameUsed) {
      throw new HttpException(
        'Product name already used',
        HttpStatus.BAD_REQUEST,
      );
    }

    const id = uuidv4();

    const data = {
      id: id,
      name: name,
      price: price,
      location: location,
      image: image,
    };

    const newProduct = this.productModel.create(data);
    console.log(newProduct);
    return newProduct;
  }
}
