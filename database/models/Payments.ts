import { CreationOptional, Optional } from "sequelize";
import { PaymentAttributes } from "../../interfaces/modelInterface";
import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import Booking from "./UserBooking";

interface PaymentCreationAttributes extends Optional<PaymentAttributes, "id"> {}

@Table({
  timestamps: true,
  tableName: "payments",
  paranoid: true,
})
class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> {
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
    type: DataType.FLOAT,
    allowNull: false,
  })
  declare total_amount: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare payment_type: string;

  @DeletedAt
  declare deletedAt: Date | null;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;

  @BelongsTo(() => Booking, "booking_id")
  declare bookings: Booking;
}

export default Payment;
