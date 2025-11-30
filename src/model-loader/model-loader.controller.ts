import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller('models')
export class UploadModelsController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '../../uploads/models'), // مسیر مطلق
        filename: (req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowed = ['.glb', '.gltf'];
        const ext = extname(file.originalname).toLowerCase();
        if (!allowed.includes(ext)) return cb(new BadRequestException('Only .glb and .gltf allowed'), false);
        cb(null, true);
      },
      limits: { fileSize: 50 * 1024 * 1024 },
    }),
  )
  uploadModel(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');
    return {
      message: 'uploaded',
      filename: file.filename,
      url: `/uploads/models/${file.filename}`, // URL برای دسترسی از فرانت
    };
  }
}
