import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './resource/auth/auth.module';
import { User } from './resource/auth/model/user.model';
import { ProductsModule } from './resource/products/products.module';
import { Product } from './resource/products/model/product.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '54.169.69.87',
      port: 3306,
      username: 'rtd',
      password: 'Tiny722$',
      database: 'keker',
      models: [User, Product],
      autoLoadModels: true,
      sync: {},
    }),
    AuthModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
