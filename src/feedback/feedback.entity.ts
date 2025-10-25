import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  feedback: string;
  @Column()
  rate: number;
  @CreateDateColumn()
  createdAt: Date;
  @ManyToOne(() => User, (user) => user.feedbacks)
  user: User;
}
