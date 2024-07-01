import { CreationOptional, Optional } from "sequelize";
import {
  AutoIncrement,
  BelongsTo,
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

import { UserEventAttributes } from "../../interfaces/modelInterface";
import User from "./User";
import Event from "./Event";

interface UserEventCreationAttributes extends Optional<UserEventAttributes, "id"> {}

@Table({
  timestamps: false,
  tableName: "user_events",
})
class UserEvent extends Model<UserEventAttributes, UserEventCreationAttributes> {
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

  @BelongsTo(() => User, "organizer_id")
  declare users: User;

  @BelongsTo(() => Event, "event_id")
  declare events: Event;
}

export default UserEvent;
