import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadImgsController } from './upload-imgs.controller';

@Module({
  controllers: [UploadImgsController],
  imports: [MulterModule.register({ dest: './uploads/images' }),]
})
export class UploadImgsModule {}
