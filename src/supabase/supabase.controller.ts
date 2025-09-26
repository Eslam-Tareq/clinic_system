import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { ResponseDto } from '../common/filters/response.dto';
import { SupabaseService } from './supabase.service';

@Controller('supabase')
export class SupabaseController {
  static multerOptions: multer.Options = { storage: multer.memoryStorage() };
  constructor(private readonly supabaseService: SupabaseService) {}
  @UseInterceptors(
    FilesInterceptor('files', 10, SupabaseController.multerOptions),
  )
  @Post('upload')
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    try {
      const result = await this.supabaseService.uploadFile(files);
      return ResponseDto.success(result, 'File uploaded successfully');
    } catch (error) {
      throw error;
    }
  }
}
