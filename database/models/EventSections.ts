import { CreationOptional, Optional } from "sequelize";
import { EventSectionAttributes } from "../../interfaces/modelInterface";
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
import Event from "./Event";

interface EventSectionCreationAttributes extends Optional<EventSectionAttributes, "id"> {}

@Table({
  timestamps: true,
  tableName: "event_sections",
  paranoid: true,
})
class EventSection extends Model<EventSectionAttributes, EventSectionCreationAttributes> {
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

  @ForeignKey(() => Event)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare event_id: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  declare price: number;

  @DeletedAt
  declare deletedAt: Date | null;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;

  @BelongsTo(() => Event, "event_id")
  declare events: Event;
}

export default EventSection;
