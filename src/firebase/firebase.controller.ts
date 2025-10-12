import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { FireBaseService } from './firebase.service';
import { ResponseDto } from '../common/filters/response.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RegisterTokenDto } from './dtos/register-token.dto';

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
      //const result = await this.firebaseService.uploadFile(files[0]);
      return ResponseDto.success('File uploaded successfully');
    } catch (error) {
      throw error;
    }
  }
  @Post('register-token')
  @UseGuards(AuthGuard)
  async registerFireToken(
    @Body() registerTokenDto: RegisterTokenDto,
    @Req() req: any,
  ) {
    try {
      const userId = req.user.id;
      const result = await this.firebaseService.registerToken(
        userId,
        registerTokenDto,
      );
      return ResponseDto.created(result);
    } catch (err) {
      throw err;
    }
  }
  @Delete('remove-token/:token')
  @UseGuards(AuthGuard)
  async removeFireToken(@Param('token') token: string) {
    try {
      const result = await this.firebaseService.removeOneInvalidToken(token);
      return ResponseDto.ok(result);
    } catch (err) {
      throw err;
    }
  }
}
