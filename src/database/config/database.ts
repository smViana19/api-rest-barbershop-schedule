import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';
import User from '../../models/user';
import Appointment from '../../models/appointment';
import Service from '../../models/service';
import Professional from '../../models/professional';
import Availability from '../../models/availability';
import Specialty from '../../models/specialty';

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT || '3306'),
  host: process.env.DB_HOST,
  dialect: 'mysql',
  models: [User, Appointment, Service, Professional, Availability, Specialty],
});

export default sequelize;
