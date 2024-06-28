import { CreationOptional, Optional } from "sequelize";
import { SeatsAttributes } from "../../interfaces/modelInterface";
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
import Shows from "./Show";

interface SeatsCreationAttributes extends Optional<SeatsAttributes, "id"> {}

@Table({
  timestamps: false,
  tableName: "seats",
  paranoid: true,
})
class Seat extends Model<SeatsAttributes, SeatsCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: number;

  @ForeignKey(() => Shows)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare show_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare seat_no: string;

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

  @BelongsTo(() => Shows, "show_id")
  declare shows: Shows;
}

export default Seat;
