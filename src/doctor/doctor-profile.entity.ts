import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('doctor_profiles')
export class DoctorProfile {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @OneToOne(() => User, (user) => user.doctorProfile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  doctor: User;

  @Column({ length: 100 })
  specialization: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  certificates_url: string;

  @Column({ nullable: true })
  years_of_experience: number;
}
