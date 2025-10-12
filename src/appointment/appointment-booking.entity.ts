import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppointmentPaymentMethod } from '../enums/appointment-payment-method.enum';
import { Appointment } from './appointment.entity';
import { User } from '../user/user.entity';
import { Notification } from '../notification/notification.entity';

@Entity()
export class AppointmentBooking {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'enum', enum: AppointmentPaymentMethod })
  payment_method: string;
  @Column()
  amount: number;
  @Column()
  paid_at: Date;
  @CreateDateColumn()
  created_at: Date;
  @OneToOne(
    () => Appointment,
    (appointment) => appointment.appointment_booking,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;
  @ManyToOne(() => User, (user) => user.appointment_bookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: User;
  @OneToMany(() => Notification, (notification) => notification.booking, {
    onDelete: 'CASCADE',
  })
  notifications: Notification[];
}
