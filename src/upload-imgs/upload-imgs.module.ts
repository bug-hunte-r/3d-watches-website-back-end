import { Module } from '@nestjs/common';
import { UploadImgsService } from './upload-imgs.service';
import { UploadImgsController } from './upload-imgs.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [UploadImgsController],
  providers: [UploadImgsService],
  imports: [MulterModule.register({ dest: './uploads/images' }),]
})
export class UploadImgsModule {}
