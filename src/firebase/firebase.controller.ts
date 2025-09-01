import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { FireBaseService } from './firebase.service';
import { ResponseDto } from 'src/common/filters/response.dto';

@Controller('firebase')
export class FirebaseController {
  static multerOptions: multer.Options = { storage: multer.memoryStorage() };
  constructor(private readonly firebaseService: FireBaseService) {}
  @UseInterceptors(
    FilesInterceptor('files', 10, FirebaseController.multerOptions),
  )
  @Post('upload')
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    try {
      const result = await this.firebaseService.uploadFile(files[0]);
      return ResponseDto.success('File uploaded successfully');
    } catch (error) {
      throw error;
    }
  }
}
