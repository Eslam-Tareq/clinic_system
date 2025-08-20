import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
const dataBaseConfigurationOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,

  ssl: {
    rejectUnauthorized: true,
    ca: process.env.DB_CA,
  },
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
@Module({ imports: [TypeOrmModule.forRoot(dataBaseConfigurationOptions)] })
export class TypeOrmConfig {}
