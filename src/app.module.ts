import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { UploadImgsModule } from './upload-imgs/upload-imgs.module';
import { UploadModelsController } from './model-loader/model-loader.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads/models'),
      serveRoot: '/uploads/models',
    })
  ],
  controllers: [UploadModelsController],
  providers: [],
})
export class AppModule { }
