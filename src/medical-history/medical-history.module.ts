import { Module } from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { MedicalHistoryController } from './medical-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalHistory } from './medical-history.entity';
import { SupabaseModule } from '../supabase/supabase.module';
import { Attachment } from '../attachement/attachment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalHistory, Attachment]),
    SupabaseModule,
  ],
  providers: [MedicalHistoryService],
  controllers: [MedicalHistoryController],
})
export class MedicalHistoryModule {}
