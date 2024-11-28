import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';
import User from '../../models/user';

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT || '3306'),
  host: process.env.DB_HOST,
  dialect: 'mysql',
  models: [User]
});

export default sequelize;
