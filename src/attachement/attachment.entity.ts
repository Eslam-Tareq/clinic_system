import { MedicalHistory } from 'src/medical-history/medical-history.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string; // الاسم الأصلي للملف

  @Column()
  path: string; // المسار داخل Supabase أو السيرفر

  @Column({ nullable: true })
  url: string; // رابط مباشر للملف (مثلاً من Supabase public URL)

  @Column({ nullable: true })
  mimeType: string; // نوع الملف (image/png, application/pdf ...)

  @Column({ type: 'int', nullable: true })
  size: number; // حجم الملف بالبايت

  @CreateDateColumn()
  createdAt: Date;
  @ManyToOne(() => MedicalHistory, (md) => md.attachments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'medical_history_id' })
  medicalHistory: MedicalHistory;
}
