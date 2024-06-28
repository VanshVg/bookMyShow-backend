import { CreationOptional, Optional } from "sequelize";
import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

import { userEventAttributes } from "../../interfaces/modelInterface";
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

  @DeletedAt
  declare deletedAt: Date | null;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;
}

export default UserEvent;