import { CreationOptional, Optional } from "sequelize";
import { EventAttributes } from "../../interfaces/modelInterface";
import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import User from "./User";
import UserEvent from "./UserEvent";
import EventTypes from "./EventType";
import EventSection from "./EventSections";

interface EventCreationAttributes
  extends Optional<EventAttributes, "id" | "createdAt" | "updatedAt"> {}

@Table({
  timestamps: true,
  tableName: "events",
  paranoid: true,
})
class Event extends Model<EventAttributes, EventCreationAttributes> {
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

  @DeletedAt
  declare deletedAt: Date | null;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;

  @BelongsTo(() => EventTypes, "type_id")
  declare eventTypes: EventTypes;

  @BelongsToMany(() => User, () => UserEvent)
  users!: User[];

  @HasMany(() => EventSection, "event_id")
  declare eventSections: EventSection[];
}

export default Event;
