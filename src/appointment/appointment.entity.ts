import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Unique,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { TimeSlot } from '../time-slots/time-slot.entity';
import { User } from '../user/user.entity';
import { AppointmentStatus } from '../enums/appointment-status.enum';
import { AppointmentBooking } from './appointment-booking.entity';
import { AppointmentType } from '../appointment-type/appointment-type.entity';
import { Notification } from '../notification/notification.entity';
import { UserGender } from '../enums/user-gender.enum';

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

  @ManyToOne(() => User, (user) => user.appointments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
  // @Column({
  //   type: 'enum',
  //   enum: At,
  //   default: At.Normal,
  // })
  // type: string;
  @Column({ type: 'enum', enum: UserGender, default: UserGender.MALE })
  gender: string;
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
  @OneToMany(() => Notification, (notification) => notification.appointment, {
    onDelete: 'CASCADE',
  })
  notifications: Notification[];
}
