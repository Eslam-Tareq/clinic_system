import { AppointmentStatus } from 'src/enums/appointment-status.enum';
import { AppointmentType } from 'src/enums/appointment-type.enum';
import { TimeSlot } from 'src/time-slots/time-slot.entity';
import { User } from 'src/user/user.entity';
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
import { AppointmentBooking } from './appointment-booking.entity';

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
  @Column({
    type: 'enum',
    enum: AppointmentType,
    default: AppointmentType.Normal,
  })
  type: string;
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
}
