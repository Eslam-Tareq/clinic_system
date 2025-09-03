import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import * as multer from 'multer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ResponseDto } from 'src/common/filters/response.dto';
import { UpdateMedicalHistoryDto } from './dtos/update-medical-history.dto';
import { CreateMedicalHistoryDto } from './dtos/create-medical-history.dto';
import { RoleGuard } from 'src/common/guards/role.gaurd';
import { Role } from 'src/common/guards/role.decorator';
import { UserRoles } from 'src/enums/user-role.enum';
@Controller('medical-history')
export class MedicalHistoryController {
  constructor(private readonly medicalHistoryService: MedicalHistoryService) {}
  static multerOptions: multer.Options = { storage: multer.memoryStorage() };
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FilesInterceptor('files', 10, MedicalHistoryController.multerOptions),
  )
  @Post()
  async createFile(
    @Body() createMedicalHistoryDto: CreateMedicalHistoryDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: any,
  ) {
    try {
      const result = await this.medicalHistoryService.create(
        createMedicalHistoryDto,
        files,
        req.user.id,
      );
      return ResponseDto.created(
        result,
        'Medical history created successfully',
      );
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard)
  @Get('my-medical-histories')
  async getMyMedicalHistories(@Req() req: any) {
    try {
      const result = await this.medicalHistoryService.getMyMedicalHistories(
        req.user.id,
      );
      return ResponseDto.ok(result);
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async getOneMedicalHistory(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.medicalHistoryService.getOneById(id);
      return ResponseDto.ok(result);
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FilesInterceptor('files', 10, MedicalHistoryController.multerOptions),
  )
  @Put(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMedicalHistoryDto: UpdateMedicalHistoryDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: any,
  ) {
    try {
      const result = await this.medicalHistoryService.updateOne(
        id,
        updateMedicalHistoryDto,
        files,
        req.user.id,
      );
      return ResponseDto.ok(result, 'Medical history created successfully');
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FilesInterceptor('files', 10, MedicalHistoryController.multerOptions),
  )
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    try {
      await this.medicalHistoryService.deleteOne(id, req.user.id);
      return ResponseDto.ok(undefined, 'Medical history deleted successfully');
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard, RoleGuard)
  @Role([UserRoles.ADMIN])
  @Get('user/:userId')
  async getMedicalHistoriesByUserId(
    @Param('userId', ParseIntPipe) UserId: number,
  ) {
    try {
      const result =
        await this.medicalHistoryService.getMedicalHistoriesByUserId(UserId);
      return ResponseDto.ok(result);
    } catch (err) {
      throw err;
    }
  }
}
