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
import User from './user';
import Specialty from './specialty';

@Table({
  tableName: 'professionals',
  underscored: true,
  timestamps: false,
})
export default class Professional extends Model<
  InferAttributes<Professional>,
  InferCreationAttributes<Professional>
> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare userId: number;

  @ForeignKey(() => Specialty)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare specialtyId: number;

  @BelongsTo(() => Specialty)
  declare speciality?: Specialty[];

  @BelongsTo(() => User)
  declare user?: User[];
}
