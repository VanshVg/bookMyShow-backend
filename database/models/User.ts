import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { usersAttributes } from "../../interfaces/modelInterface";
import { Optional } from "sequelize";
import Event from "./Event";
import UserEvent from "./UserEvent";

interface userCreationAttributes
  extends Optional<usersAttributes, "id" | "reset_token" | "reset_time"> {}

@Table({
  timestamps: true,
  tableName: "users",
  paranoid: true,
})
class User extends Model<usersAttributes, userCreationAttributes> {
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

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare reset_token: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare reset_time: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare role: "admin" | "user" | "organizer";

  @BelongsToMany(() => Event, () => UserEvent)
  declare events: Event[];
}

export default User;
