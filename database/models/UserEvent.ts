import { Optional } from "sequelize";
import { userEventAttributes } from "../../interfaces/modelInterface";
import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import User from "./User";
import Event from "./Event";

interface userEventCreationAttributes extends Optional<userEventAttributes, "id"> {}

@Table({
  timestamps: false,
  tableName: "user_events",
})
class UserEvent extends Model<userEventAttributes, userEventCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare organizer_id: number;

  @ForeignKey(() => Event)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare event_id: number;
}

export default UserEvent;
