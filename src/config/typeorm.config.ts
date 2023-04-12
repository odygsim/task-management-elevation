import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'odysseas',
  password: 'Mekonia!',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'], // 'dist/**/*.entity{.ts,.js}' also works however __dirname + '/../**/*.entity.ts' does not work
  synchronize: true,
};
