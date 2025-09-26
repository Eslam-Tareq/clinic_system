import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { MedicalHistory } from './medical-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { CreateMedicalHistoryDto } from './dtos/create-medical-history.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { Attachment } from '../attachement/attachment.entity';
import { UpdateMedicalHistoryDto } from './dtos/update-medical-history.dto';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @InjectRepository(MedicalHistory)
    private readonly medicalHistoryRepo: Repository<MedicalHistory>,
    @InjectRepository(Attachment)
    private readonly attachmentRepo: Repository<Attachment>,
    private readonly supabaseService: SupabaseService,
  ) {}
  async create(
    createMedicalHistoryDto: CreateMedicalHistoryDto,
    files: Express.Multer.File[],
    userId: number,
  ) {
    const medicalHistory = this.medicalHistoryRepo.create({
      doctor: createMedicalHistoryDto.doctor,
      diagnosis: createMedicalHistoryDto.diagnosis,
      treatment: createMedicalHistoryDto.treatment,
      date: createMedicalHistoryDto.date,
      notes: createMedicalHistoryDto.notes,
      user: { id: userId },
    });
    const newMedicalHistory =
      await this.medicalHistoryRepo.save(medicalHistory);
    const uploadFiles =
      files.length > 0 ? await this.supabaseService.uploadFile(files) : [];
    const attachmentsPromises = uploadFiles.map((file) => {
      const attachment = this.attachmentRepo.create({
        url: file.url,
        path: file.path,
        size: file.size,
        mimeType: file.mimeType,
        filename: file.filename,
        medicalHistory: { id: newMedicalHistory.id },
      });
      return attachment;
    });
    const attachments = await this.attachmentRepo.save(attachmentsPromises);

    return { ...newMedicalHistory, attachments };
  }
  async getMyMedicalHistories(userId: number) {
    return this.medicalHistoryRepo.find({
      where: { user: { id: userId } },
      relations: ['attachments'],
      order: { date: 'DESC' },
    });
  }
  async getOneById(id: number) {
    const medicalHistory = await this.medicalHistoryRepo.findOne({
      where: { id },
      relations: ['attachments'],
    });
    if (!medicalHistory) {
      throw new NotFoundException('Medical history not found');
    }
    return medicalHistory;
  }
  async updateOne(
    id: number,
    updateMedicalHistoryDto: UpdateMedicalHistoryDto,
    files: Express.Multer.File[],
    userId: number,
  ) {
    const removed_attachments_ids =
      updateMedicalHistoryDto.removed_attachments_ids;
    delete updateMedicalHistoryDto.removed_attachments_ids;
    const medicalHistory = await this.medicalHistoryRepo.findOne({
      where: { id, user: { id: userId } },
      relations: ['attachments'],
    });
    if (!medicalHistory) {
      throw new NotFoundException('Medical history not found');
    }
    const updateMedicalHistory = await this.medicalHistoryRepo.update(
      id,
      updateMedicalHistoryDto,
    );
    const updatedMedicalHistory = await this.medicalHistoryRepo.findOne({
      where: { id },
      relations: ['attachments'],
    });
    if (removed_attachments_ids && removed_attachments_ids.length > 0) {
      const removedAttachments = await this.attachmentRepo.query(`
      select * from attachments
      where medical_history_id =${medicalHistory.id} and id in (${removed_attachments_ids.join(',')})
      
      `);
      if (removedAttachments && removedAttachments.length > 0) {
        await this.supabaseService.deleteFiles(
          removedAttachments.map((att: Attachment) => att.path),
        );
        await this.attachmentRepo.query(
          `delete from attachments where medical_history_id =${medicalHistory.id} and id in (${removed_attachments_ids.join(',')})`,
        );
      }
    }

    if (files && files.length > 0) {
      const uploadFiles = await this.supabaseService.uploadFile(files);
      const attachmentsPromises = uploadFiles.map((file) => {
        const attachment = this.attachmentRepo.create({
          url: file.url,
          size: file.size,
          mimeType: file.mimeType,
          filename: file.filename,
          path: file.path,
          medicalHistory: { id: medicalHistory.id },
        });
        return attachment;
      });
      const attachments = await this.attachmentRepo.save(attachmentsPromises);
      return {
        ...updatedMedicalHistory,
        attachments: [...attachments, ...medicalHistory.attachments],
      };
    }
    return updatedMedicalHistory;
  }
  async deleteOne(id: number, userId: number) {
    const medicalHistory = await this.medicalHistoryRepo.findOne({
      where: { id, user: { id: userId } },
      relations: ['attachments'],
    });
    if (!medicalHistory) {
      throw new NotFoundException('Medical history not found');
    }
    await this.medicalHistoryRepo.delete(id);
    if (medicalHistory.attachments && medicalHistory.attachments.length > 0) {
      await this.supabaseService.deleteFiles(
        medicalHistory.attachments.map((att) => att.path),
      );
    }
  }
  async getMedicalHistoriesByUserId(userId: number) {
    const medicalHistories = await this.medicalHistoryRepo.find({
      where: { user: { id: userId } },
      relations: ['attachments'],
    });

    return medicalHistories;
  }
}
