import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;
  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }
  async uploadFile(files: Express.Multer.File[]) {
    return Promise.all(
      files.map(async (file) => {
        const originalFileName = file.originalname;
        const fileExtension = originalFileName.substring(
          originalFileName.lastIndexOf('.') + 1,
        );
        const filePath = `medical_histories/medical-history-${Math.round(
          Math.random() * 1e9,
        )}-${Date.now()}.${fileExtension}`;

        const { data, error } = await this.supabase.storage
          .from('clinic_bucket')
          .upload(filePath, file.buffer, {
            cacheControl: '3600',
            upsert: true,
          });

        if (error) throw error;

        const { data: publicUrlData } = this.supabase.storage
          .from('clinic_bucket')
          .getPublicUrl(filePath);

        return {
          path: data.path,
          url: publicUrlData.publicUrl,
          filename: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
        };
      }),
    );
  }
  async deleteFiles(filePath: string[]) {
    try {
      console.log('from delete files' + filePath);
      const { data, error } = await this.supabase.storage
        .from('clinic_bucket')
        .remove(filePath);

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error) {
      throw error;
    }
  }
}
