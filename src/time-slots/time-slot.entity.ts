import { Appointment } from '../appointment/appointment.entity';
import { TimeSlotStatus } from '../enums/time-slot-status.enum';
import { User } from '../user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  Unique,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';

@Entity('time_slots')
export class TimeSlot {
  @PrimaryGeneratedColumn('identity')
  id: number;

  // @ManyToOne(() => User, (doctor) => doctor.slots, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'doctor_id' })
  // doctor: User;
  @Index()
  @Column({ type: 'timestamptz', unique: true })
  date: string;

  @Column({
    type: 'enum',
    enum: TimeSlotStatus,
    default: TimeSlotStatus.Available,
  })
  status: TimeSlotStatus;
  @OneToMany(() => Appointment, (appointment) => appointment.slot)
  appointments: Appointment[];
}
