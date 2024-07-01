import { CreationOptional, Optional } from "sequelize";
import { BookingAttributes } from "../../interfaces/modelInterface";
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
import Ticket from "./Ticket";
import Payment from "./Payments";

interface BookingCreationAttributes extends Optional<BookingAttributes, "id"> {}

@Table({
  timestamps: true,
  tableName: "user_bookings",
  paranoid: true,
})
class Booking extends Model<BookingAttributes, BookingCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare show_or_section_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare show_or_section: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare seats: number;

  @DeletedAt
  declare deletedAt: Date | null;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;

  @HasMany(() => Ticket, "booking_id")
  declare tickets: Ticket[];

  @HasMany(() => Payment, "booking_id")
  declare payments: Payment[];
}

export default Booking;
