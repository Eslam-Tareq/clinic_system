import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UserService } from '../user/user.service';
import { TimeSlotService } from '../time-slots/time-slot.service';
import { AppointmentStatus } from '../enums/appointment-status.enum';
import { TimeSlotStatus } from '../enums/time-slot-status.enum';
import { ChangeAppointmentStatusDto } from './dto/change-appointment-status.dto';
import { AppointmentTypeService } from '../appointment-type/appointment-type.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly AppointmentRepo: Repository<Appointment>,
    private readonly appointmentTypeService: AppointmentTypeService,
    private readonly userService: UserService,
    private readonly timeSlotService: TimeSlotService,
  ) {}
  async bookAppointment(
    createAppointmentDto: CreateAppointmentDto,
    user_id: number,
  ) {
    const user = await this.userService.findById(user_id);
    const { name, phone, appointment_type_id, reason, time_slot_id } =
      createAppointmentDto;
    const slot = await this.timeSlotService.getTimeSlotById(time_slot_id);
    if (!slot) {
      throw new NotFoundException('Time slot not found');
    }
    const type = await this.appointmentTypeService.getById(appointment_type_id);
    if (!type) {
      throw new NotFoundException('Appointment type not found');
    }
    if (new Date(slot.date).getTime() < new Date().getTime()) {
      throw new BadRequestException('Cannot book past time slots');
    }
    if (slot.status === TimeSlotStatus.Booked) {
      throw new BadRequestException('Time slot already booked');
    }
    const isExistingAppointment = await this.AppointmentRepo.findOne({
      where: { slot: { id: time_slot_id }, patient: { id: user_id } },
    });
    if (isExistingAppointment) {
      throw new BadRequestException('You have already booked this slot');
    }
    const newAppointment = new Appointment();
    newAppointment.name = name;
    newAppointment.phone = phone;
    newAppointment.appointment_type = type;
    newAppointment.reason = reason;
    newAppointment.patient = user;
    newAppointment.slot = slot;

    return await this.AppointmentRepo.save(newAppointment);
  }
  async getMyAppointments(user_id: number) {
    return await this.AppointmentRepo.find({
      where: { patient: { id: user_id } },
      relations: ['slot', 'patient', 'appointment_type'],
      order: { slot: { date: 'DESC' } },
    });
  }
  async cancelAppointment(appointment_id: number, user_id: number) {
    const appointment = await this.AppointmentRepo.findOne({
      where: { id: appointment_id, patient: { id: user_id } },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    if (appointment.status === 'cancelled') {
      throw new BadRequestException('Appointment already cancelled');
    }
    appointment.status = 'cancelled';
    return await this.AppointmentRepo.save(appointment);
  }
  async getAllAppointments(status: AppointmentStatus) {
    return await this.AppointmentRepo.find({
      where: { status },
      relations: ['slot', 'patient', 'appointment_type'],
      order: { slot: { date: 'ASC' } },
    });
  }

  async acceptAppointment(appointment_id: number) {
    const appointment = await this.AppointmentRepo.findOne({
      where: { id: appointment_id },
      relations: ['slot'],
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    const isExistingAppointmentAcceptedOnTimeSlot =
      await this.AppointmentRepo.findOne({
        where: {
          slot: { id: appointment.slot.id },
          status: AppointmentStatus.Accepted,
        },
      });
    if (isExistingAppointmentAcceptedOnTimeSlot) {
      throw new BadRequestException(
        `Another appointment is already accepted on this time slot`,
      );
    }
    if (appointment.status === 'accepted') {
      throw new BadRequestException(
        `Appointment already ${appointment.status}`,
      );
    }
    appointment.status = 'accepted';
    const bookTimeSlot = await this.timeSlotService.updateTimeSlotStatus(
      appointment.slot.id,
      TimeSlotStatus.Booked,
    );
    const updatedAppointment = await this.AppointmentRepo.save(appointment);
    delete updatedAppointment.slot;
    return { ...updatedAppointment, slot: bookTimeSlot };
  }
  async rejectAppointment(appointment_id: number) {
    return this.changeAppointmentStatus(
      appointment_id,
      AppointmentStatus.Rejected,
    );
  }
  async changeAppointmentStatus(
    appointment_id: number,
    status: ChangeAppointmentStatusDto['status'],
  ) {
    const appointment = await this.AppointmentRepo.findOne({
      where: { id: appointment_id },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    if (appointment.status === status) {
      throw new BadRequestException(
        `Appointment already ${appointment.status}`,
      );
    }
    appointment.status = status;
    return await this.AppointmentRepo.save(appointment);
  }
}
