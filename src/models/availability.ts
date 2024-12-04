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
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Professional from './professional';

@Table({
  tableName: 'availability',
  underscored: true,
  timestamps: false,
})
export default class Availability extends Model<
  InferAttributes<Availability>,
  InferCreationAttributes<Availability>
> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @ForeignKey(() => Professional)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare professionalId: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare date: Date;

  @AllowNull(false)
  @Column(DataType.TIME)
  declare time: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  declare isAvailable: boolean;

  @BelongsTo(() => Professional)
  declare professional?: Professional[];
}
