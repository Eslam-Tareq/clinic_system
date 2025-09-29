import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { ResponseDto } from '../common/filters/response.dto';
import { RoleGuard } from '../common/guards/role.gaurd';
import { Role } from '../common/guards/role.decorator';
import { UserRoles } from '../enums/user-role.enum';
import { ChangeAppointmentStatusDto } from './dto/change-appointment-status.dto';
import { StatusQueryDto } from './dto/status-query.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}
  @UseGuards(AuthGuard)
  @Post('book')
  async bookAppointment(
    @Req() req: any,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) {
    try {
      const user_id = req.user.id;
      const result = await this.appointmentService.bookAppointment(
        createAppointmentDto,
        user_id,
      );
      return ResponseDto.created(result, 'Appointment booked successfully');
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard)
  @Get('my-appointments')
  async getMyAppointments(@Req() req: any) {
    try {
      const user_id = req.user.id;
      const result = await this.appointmentService.getMyAppointments(user_id);
      return ResponseDto.ok(result, 'My Appointments fetched successfully');
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard)
  @Put('cancel/:appointment_id')
  async cancelAppointment(
    @Req() req: any,
    @Param('appointment_id', ParseIntPipe) appointment_id: number,
  ) {
    try {
      const user_id = req.user.id;
      const result = await this.appointmentService.cancelAppointment(
        appointment_id,
        user_id,
      );
      return ResponseDto.ok(result, 'Appointment cancelled successfully');
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard, RoleGuard)
  @Role([UserRoles.ADMIN])
  @Get()
  async getAllAppointments(@Query() query: StatusQueryDto) {
    try {
      const { status } = query;
      const result = await this.appointmentService.getAllAppointments(status);
      return ResponseDto.ok(result);
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard, RoleGuard)
  @Role([UserRoles.ADMIN])
  @Put('update-status/:appointmentId/')
  async updateAppointmentStatus(
    @Param('appointmentId', ParseIntPipe) appointment_id: number,
    @Body() changeAppointmentStatusDto: ChangeAppointmentStatusDto,
  ) {
    try {
      const result = await this.appointmentService.changeAppointmentStatus(
        appointment_id,
        changeAppointmentStatusDto.status,
      );
      return ResponseDto.ok(result, 'Appointment status updated successfully');
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Role([UserRoles.ADMIN])
  @Put('accept/:appointment_id')
  async acceptAppointment(
    @Param('appointment_id', ParseIntPipe) appointment_id: number,
  ) {
    try {
      const result =
        await this.appointmentService.acceptAppointment(appointment_id);
      return ResponseDto.ok(result, 'Appointment accepted successfully');
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(AuthGuard, RoleGuard)
  @Role([UserRoles.ADMIN])
  @Put('reject/:appointment_id')
  async rejectAppointment(
    @Param('appointment_id', ParseIntPipe) appointment_id: number,
  ) {
    try {
      const result =
        await this.appointmentService.rejectAppointment(appointment_id);
      return ResponseDto.ok(result, 'Appointment rejected successfully');
    } catch (error) {
      throw error;
    }
  }
}
