import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationType } from '../enums/notification-type.enum';
import { User } from '../user/user.entity';
import { Appointment } from '../appointment/appointment.entity';
import { AppointmentBooking } from '../appointment/appointment-booking.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;
  @Column()
  title: string;
  @Column()
  message: string;
  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  user: User;
  @ManyToOne(() => Appointment, (appointment) => appointment.notifications, {
    onDelete: 'CASCADE',
  })
  appointment: Appointment;
  @ManyToOne(() => AppointmentBooking, (booking) => booking.notifications, {
    onDelete: 'CASCADE',
  })
  booking: AppointmentBooking;
}
