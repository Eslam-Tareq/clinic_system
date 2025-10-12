import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class FirebaseToken {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  token: string;
  @ManyToOne(() => User, (user) => user.firebaseTokens, { onDelete: 'CASCADE' })
  user: User;
  @CreateDateColumn()
  created_at: Date;
}
