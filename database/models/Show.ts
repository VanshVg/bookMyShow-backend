import { CreationOptional, Optional } from "sequelize";
import { ShowsAttributes } from "../../interfaces/modelInterface";
import {
  AutoIncrement,
  BelongsTo,
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
import Movie from "./Movie";
import Screen from "./Screen";
import Seat from "./Seats";
import Booking from "./UserBooking";

interface ShowsCreationAttributes extends Optional<ShowsAttributes, "id"> {}

@Table({
  timestamps: false,
  tableName: "screen_shows",
  paranoid: true,
})
class Shows extends Model<ShowsAttributes, ShowsCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: number;

  @ForeignKey(() => Screen)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare screen_id: number;

  @ForeignKey(() => Movie)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare movie_id: number;

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

  @BelongsTo(() => Screen, "screen_id")
  declare screens: Screen;

  @BelongsTo(() => Movie, "movie_id")
  declare movies: Movie;

  @HasMany(() => Seat, {
    foreignKey: "show_or_section_id",
    constraints: false,
    scope: {
      show_or_section: "show",
    },
  })
  declare seats: Seat[];

  @HasMany(() => Booking, {
    foreignKey: "show_or_section_id",
    constraints: false,
    scope: {
      show_or_section: "show",
    },
  })
  declare bookings: Booking[];
}

export default Shows;
