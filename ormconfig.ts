import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'student',
  password: 'student',
  database: 'nest_project',
  entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/database/migrations/**/*{.ts,.js}'],
  synchronize: false,
});
