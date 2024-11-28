import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT || '3306'),
  host: process.env.DB_HOST,
  dialect: 'mysql',
};

export = config;
