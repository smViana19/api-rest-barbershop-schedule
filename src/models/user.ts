import { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { AllowNull, AutoIncrement, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: false,
})
export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @Column(DataType.STRING)
  @AllowNull(false)
  declare name: string;

  @Column(DataType.STRING)
  @AllowNull(false)
  declare email: string;

  @Column(DataType.STRING)
  @AllowNull(false)
  declare password: string;

  @Column(DataType.ENUM('ADMIN', 'GUEST'))
  @Default('GUEST')
  @AllowNull(false)
  declare role: string


  //associations

}