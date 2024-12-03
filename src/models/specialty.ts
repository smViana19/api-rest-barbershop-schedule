import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
@Table({
  tableName: 'specialties',
  timestamps: false,
  underscored: false,
})
export default class Specialty extends Model<
  InferAttributes<Specialty>,
  InferCreationAttributes<Specialty>
> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @Default('')
  @AllowNull(false)
  @Column(DataType.STRING)
  declare description: string;
}
