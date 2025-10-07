import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppointmentType as AppointmentTypeEnum } from '../enums/appointment-type.enum';
import { Appointment } from '../appointment/appointment.entity';
@Entity('appointment_types')
export class AppointmentType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({ type: 'enum', enum: AppointmentTypeEnum })
  type: string;
  @Column({ type: 'decimal' })
  price: number;
  @Column({ type: 'decimal', nullable: true })
  discount: number;
  @Column({ type: 'decimal' })
  total_price: number;
  @Column({ type: 'text' })
  description: string;
  @CreateDateColumn()
  createdAt: Date;
  @OneToMany(() => Appointment, (appointment) => appointment.appointment_type)
  appointments: Appointment[];
}
