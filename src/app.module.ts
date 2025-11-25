import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
