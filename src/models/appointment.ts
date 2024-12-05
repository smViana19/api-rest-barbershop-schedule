import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import User from './user';
import Professional from './professional';
import Service from './service';
import Availability from './availability';

@Table({
  tableName: 'appointments',
  timestamps: false,
  underscored: true,
})
export default class Appointment extends Model<InferAttributes<Appointment>, InferCreationAttributes<Appointment>> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare userId: number;

  @BelongsTo(() => User)
  declare user?: User;

  @ForeignKey(() => Professional)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare professionalId: number;

  @BelongsTo(() => Professional)
  declare professional?: Professional;

  @ForeignKey(() => Service)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare serviceId: number;

  @BelongsTo(() => Service)
  declare service?: Service;

  @ForeignKey(() => Availability)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare availabilityId: number

  @BelongsTo(() => Availability)
  declare availability?: Availability;

  @Default('PENDING')
  @AllowNull(false)
  @Column(DataType.ENUM('PENDING', 'COMPLETED', 'CANCELED'))
  declare status: string;
}
