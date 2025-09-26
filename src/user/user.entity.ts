import { AppointmentBooking } from '../appointment/appointment-booking.entity';
import { Appointment } from '../appointment/appointment.entity';
import { DoctorProfile } from '../doctor/doctor-profile.entity';
import { UserGender } from '../enums/user-gender.enum';
import { UserRoles } from '../enums/user-role.enum';
import { MedicalHistory } from '../medical-history/medical-history.entity';
import { TimeSlot } from '../time-slots/time-slot.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('identity')
  id: number;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column({ unique: true })
  email: string;
  @Column({ nullable: true })
  password: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true })
  google_id: string;
  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role: string;
  @Column({ type: 'enum', enum: UserGender, nullable: true })
  gender: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @OneToMany(() => MedicalHistory, (medicalHistory) => medicalHistory.user)
  medicalHistories: MedicalHistory[];
  @OneToOne(() => DoctorProfile, (doctorProfile) => doctorProfile.doctor)
  doctorProfile: DoctorProfile;
  // @OneToMany(() => TimeSlot, (timeslot) => timeslot.doctor, {
  //   onDelete: 'CASCADE',
  // })
  // slots: TimeSlot[];
  @OneToMany(() => Appointment, (appointment) => appointment.patient, {
    onDelete: 'CASCADE',
  })
  appointments: Appointment[];
  @OneToMany(
    () => AppointmentBooking,
    (appointment_booking) => appointment_booking.patient,
    {
      onDelete: 'CASCADE',
    },
  )
  appointment_bookings: AppointmentBooking[];
}
