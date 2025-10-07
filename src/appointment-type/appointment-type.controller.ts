import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { ResponseDto } from '../common/filters/response.dto';
import { RoleGuard } from '../common/guards/role.gaurd';
import { Role } from '../common/guards/role.decorator';
import { UserRoles } from '../enums/user-role.enum';
import { AppointmentTypeService } from './appointment-type.service';
import { CreateAppointmentTypeDto } from './dto/create-appointment-type.dto';
import { UpdateAppointmentTypeDto } from './dto/update-appointment-type.dto';

@Controller('appointment-type')
export class AppointmentTypeController {
  constructor(
    private readonly appointmentTypeService: AppointmentTypeService,
  ) {}
  @UseGuards(AuthGuard, RoleGuard)
  @Role([UserRoles.ADMIN])
  @Post()
  async create(@Body() createAppointmentTypeDto: CreateAppointmentTypeDto) {
    try {
      const result = await this.appointmentTypeService.create(
        createAppointmentTypeDto,
      );
      return ResponseDto.created(
        result,
        'Appointment type created successfully',
      );
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard)
  @Get()
  async getAllAppointmentType() {
    try {
      const result = await this.appointmentTypeService.getAll();
      return ResponseDto.ok(result);
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard)
  @Get(':appointment_type_id')
  async getOne(
    @Param('appointment_type_id', ParseIntPipe) appointment_type_id: number,
  ) {
    try {
      const result =
        await this.appointmentTypeService.getById(appointment_type_id);
      return ResponseDto.ok(result);
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard, RoleGuard)
  @Role([UserRoles.ADMIN])
  @Put(':appointment_type_id')
  async UpdateOne(
    @Param('appointment_type_id', ParseIntPipe) appointment_type_id: number,
    @Body() updateAppointmentTypeDto: UpdateAppointmentTypeDto,
  ) {
    try {
      const result = await this.appointmentTypeService.update(
        appointment_type_id,
        updateAppointmentTypeDto,
      );
      return ResponseDto.ok(result, 'Appointment type updated successfully');
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard, RoleGuard)
  @Role([UserRoles.ADMIN])
  @Delete(':appointment_type_id')
  async deleteOne(
    @Param('appointment_type_id', ParseIntPipe) appointment_type_id: number,
  ) {
    try {
      const result =
        await this.appointmentTypeService.delete(appointment_type_id);
      return ResponseDto.ok(result, 'Appointment type deleted successfully');
    } catch (error) {
      throw error;
    }
  }
}
