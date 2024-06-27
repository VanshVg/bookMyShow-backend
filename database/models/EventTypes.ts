import { Optional } from "sequelize";
import { eventTypesAttributes } from "../../interfaces/modelInterface";
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Event from "./Event";

interface eventTypeCreationAttributes extends Optional<eventTypesAttributes, "id"> {}

@Table({
  timestamps: true,
  tableName: "event_types",
})
class EventTypes extends Model<eventTypesAttributes, eventTypeCreationAttributes> {
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
  declare type: string;

  @HasMany(() => Event, "type_id")
  declare events: Event[];
}

export default EventTypes;
