import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { ModelLoaderController } from './model-loader/model-loader.controller';
import { UploadImgsModule } from './upload-imgs/upload-imgs.module';

@Module({
  imports: [AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env'
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
    }),
    ProductModule,
    CartModule,
    UploadImgsModule,
  ],
  controllers: [ModelLoaderController],
  providers: [],
})
export class AppModule { }
