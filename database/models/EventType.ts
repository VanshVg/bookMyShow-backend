import { CreationOptional, Optional } from "sequelize";
import { eventTypesAttributes } from "../../interfaces/modelInterface";
import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
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

  @DeletedAt
  declare deletedAt: Date | null;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;

  @HasMany(() => Event, "type_id")
  declare events: Event[];
}

export default EventTypes;
