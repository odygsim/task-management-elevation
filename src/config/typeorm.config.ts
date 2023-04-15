import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { Task } from 'src/tasks/task.entity';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'], // 'dist/**/*.entity{.ts,.js}' also works however __dirname + '/../**/*.entity.ts' does not work
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize, // the env var is to be used to auto suynchronize for the first time in production
};
