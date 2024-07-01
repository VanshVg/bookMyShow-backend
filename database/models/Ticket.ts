import { Optional } from "sequelize";
import { TicketAttributes } from "../../interfaces/modelInterface";
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Booking from "./UserBooking";
import Seat from "./Seats";

interface TicketCreationAttributes extends Optional<TicketAttributes, "id"> {}

@Table({
  timestamps: true,
  tableName: "tickets",
  paranoid: true,
})
class Ticket extends Model<TicketAttributes, TicketCreationAttributes> {
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
  declare booking_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare seat_id: number;

  @BelongsTo(() => Booking, "booking_id")
  declare bookings: Booking;

  @BelongsTo(() => Seat, "seat_id")
  declare seats: Seat;
}

export default Ticket;
