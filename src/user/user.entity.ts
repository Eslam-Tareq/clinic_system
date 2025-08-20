import { UserGender } from 'src/enums/user-gender.enum';
import { UserRoles } from 'src/enums/user-role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
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
}
