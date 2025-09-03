import { Attachment } from 'src/attachement/attachment.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('medical_histories')
export class MedicalHistory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  doctor: string;
  @Column()
  diagnosis: string;
  @Column()
  treatment: string;
  @Column()
  date: Date;
  @Column({ nullable: true })
  notes: string;
  @CreateDateColumn()
  createdAt: Date;
  @ManyToOne(() => User, (user) => user.medicalHistories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @OneToMany(() => Attachment, (attachment) => attachment.medicalHistory, {
    onDelete: 'CASCADE',
  })
  attachments: Attachment[];
}
