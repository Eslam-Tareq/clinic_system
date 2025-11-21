import { NextApiRequest, NextApiResponse } from 'next';
import { DataSource } from 'typeorm';
import { TimeSlot } from '../src/time-slots/time-slot.entity';

// لازم تستخدم نفس الإعدادات بتاعة TypeORM بتاعة NestJS
const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [TimeSlot],
  synchronize: false,
});

export const config = {
  schedule: '0 0 */2 * *', // كل يومين
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('⏳ Cron Job: generate time slots started');

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const repo = AppDataSource.getRepository(TimeSlot);

    // آخر تاريخ
    const [last] = await repo.query(`
      SELECT max(date) AS max FROM time_slots LIMIT 1;
    `);

    const timeIntervalAsDays = Math.ceil(
      (new Date(last.max).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24),
    );

    // لو ناقص 14 يوم
    if (timeIntervalAsDays <= 14) {
      await repo.query(`
        INSERT INTO time_slots (date, status)
        SELECT 
            ts AS date,
            'available'::time_slots_status_enum
        FROM generate_series(
            (SELECT (max(date) + interval '1 day') FROM time_slots),
            (SELECT (max(date) + interval '15 day') FROM time_slots),
            interval '1 hour'
        ) AS ts
        WHERE EXTRACT(HOUR FROM ts) BETWEEN 10 AND 16;
      `);
    }

    return res.status(200).json({ message: 'Cron executed successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Cron job failed', details: err });
  }
}
