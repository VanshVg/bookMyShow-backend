import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { usersAttributes } from "../../interfaces/modelInterface";

@Table({
  timestamps: true,
  tableName: "Users",
  paranoid: true,
})
class User extends Model<usersAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare contact_no: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare verification_token: string;
}

export default User;
