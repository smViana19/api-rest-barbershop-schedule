import { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { AllowNull, AutoIncrement, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: 'users',
  timestamps: false,
  underscored: false,
})
export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;

  @Default('GUEST')
  @AllowNull(false)
  @Column(DataType.ENUM('ADMIN', 'GUEST'))
  declare role: string


  //associations

}