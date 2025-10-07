import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAppointmentTypeDto } from './dto/create-appointment-type.dto';
import { UserService } from '../user/user.service';
import { TimeSlotService } from '../time-slots/time-slot.service';
import { AppointmentStatus } from '../enums/appointment-status.enum';
import { TimeSlotStatus } from '../enums/time-slot-status.enum';
import { AppointmentType } from './appointment-type.entity';
import { UpdateAppointmentTypeDto } from './dto/update-appointment-type.dto';

@Injectable()
export class AppointmentTypeService {
  constructor(
    @InjectRepository(AppointmentType)
    private readonly AppointmentTypeRepo: Repository<AppointmentType>,
  ) {}
  async create(createAppointmentTypeDto: CreateAppointmentTypeDto) {
    const { title, type, price, discount, description } =
      createAppointmentTypeDto;
    const newAppointment = new AppointmentType();
    newAppointment.title = title;
    newAppointment.type = type;
    newAppointment.price = price;
    newAppointment.discount = discount || 0;
    newAppointment.description = description;
    newAppointment.total_price = discount
      ? price - (price * discount) / 100
      : price;
    return await this.AppointmentTypeRepo.save(newAppointment);
  }
  async getAll() {
    return await this.AppointmentTypeRepo.find();
  }

  async getById(id: number) {
    const type = await this.AppointmentTypeRepo.findOne({ where: { id } });
    if (!type) {
      throw new NotFoundException('Appointment type not found');
    }
    return type;
  }
  async delete(id: number) {
    const type = await this.AppointmentTypeRepo.findOne({ where: { id } });
    if (!type) {
      throw new NotFoundException('Appointment type not found');
    }
    return await this.AppointmentTypeRepo.remove(type);
  }
  async update(id: number, updateAppointmentTypeDto: UpdateAppointmentTypeDto) {
    const type = await this.AppointmentTypeRepo.findOne({ where: { id } });
    if (!type) {
      throw new NotFoundException('Appointment type not found');
    }
    const {
      title,
      type: newType,
      price,
      discount,
      description,
    } = updateAppointmentTypeDto;
    if (title) type.title = title || type.title;
    if (newType) type.type = newType || type.type;
    if (price) type.price = price || type.price;
    if (discount !== undefined) type.discount = discount || type.discount;
    if (description) type.description = description || type.description;
    type.total_price = type.discount
      ? type.price - (type.price * type.discount) / 100
      : type.price;
    return await this.AppointmentTypeRepo.save(type);
  }
}
