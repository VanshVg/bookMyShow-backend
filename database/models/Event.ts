import { Optional } from "sequelize";
import { eventAttributes } from "../../interfaces/modelInterface";
import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import User from "./User";
import UserEvent from "./UserEvent";
import EventTypes from "./EventTypes";

interface eventCreationAttributes extends Optional<eventAttributes, "id"> {}

@Table({
  timestamps: true,
  tableName: "events",
  paranoid: true,
})
class Event extends Model<eventAttributes, eventCreationAttributes> {
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
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @ForeignKey(() => EventTypes)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare type_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare address: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare start_time: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare end_time: Date;

  @BelongsTo(() => EventTypes, "type_id")
  declare eventTypes: EventTypes;

  @BelongsToMany(() => User, () => UserEvent)
  declare users: User[];
}

export default Event;
