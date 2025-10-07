import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppointmentType as AppointmentTypeEnum } from '../enums/appointment-type.enum';
import { Appointment } from './appointment.entity';
@Entity()
export class AppointmentType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({ type: 'enum', enum: AppointmentTypeEnum })
  type: string;
  @Column()
  price: number;
  @Column({ nullable: true })
  discount: number;
  @Column()
  description: string;
  @CreateDateColumn()
  createdAt: Date;
  @OneToMany(() => Appointment, (appointment) => appointment.appointment_type)
  appointments: Appointment[];
}
