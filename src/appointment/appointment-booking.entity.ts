import { AppointmentPaymentMethod } from 'src/enums/appointment-payment-method.enum';
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
import { Appointment } from './appointment.entity';
import { User } from 'src/user/user.entity';

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
}
