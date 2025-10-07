import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Unique,
  CreateDateColumn,
} from 'typeorm';
import { TimeSlot } from '../time-slots/time-slot.entity';
import { User } from '../user/user.entity';
import { AppointmentStatus } from '../enums/appointment-status.enum';
import { AppointmentBooking } from './appointment-booking.entity';
import { AppointmentType } from '../appointment-type/appointment-type.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  phone: string;
  @ManyToOne(() => TimeSlot, (slot) => slot.appointments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'slot_id' })
  slot: TimeSlot;

  @ManyToOne(() => User, (patient) => patient.appointments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: User;
  // @Column({
  //   type: 'enum',
  //   enum: At,
  //   default: At.Normal,
  // })
  // type: string;
  @Column({ nullable: true })
  reason: string;
  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.Pending,
  })
  status: string;
  @Column({ type: 'boolean', default: false })
  is_paid: boolean;
  @Column({ type: 'timestamptz', nullable: true })
  paid_at: Date;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @OneToOne(
    () => AppointmentBooking,
    (appointmentBooking) => appointmentBooking.appointment,
    { onDelete: 'CASCADE' },
  )
  appointment_booking: AppointmentBooking[];
  @ManyToOne(() => AppointmentType, (at) => at.appointments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'appointment_type_id' })
  appointment_type: AppointmentType;
}
