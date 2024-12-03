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
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Specialty from './specialty';

@Table({
  tableName: 'services',
  underscored: true,
  timestamps: false,
})
export default class Service extends Model<
  InferAttributes<Service>,
  InferCreationAttributes<Service>
> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @ForeignKey(() => Specialty)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare specialtyId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare price: number;

  @BelongsTo(() => Specialty)
  declare speciality?: Specialty[];
}
