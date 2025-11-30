import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadModelsController } from './model-loader.controller';

@Module({
  imports: [
    MulterModule.register({ dest: './uploads/models' }), // Multer فقط برای آپلود
  ],
  controllers: [UploadModelsController],
})
export class UploadModelsModule {}
