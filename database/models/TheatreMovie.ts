import { Optional } from "sequelize";
import { TheatreMoviesAttributes } from "../../interfaces/modelInterface";
import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Theatre from "./Theatre";
import Movie from "./Movie";

interface TheatreMoviesCreationAttributes extends Optional<TheatreMoviesAttributes, "id"> {}

@Table({
  timestamps: false,
  tableName: "theatre_movies",
  paranoid: false,
})
class TheatreMovie extends Model<TheatreMoviesAttributes, TheatreMoviesCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: number;

  @ForeignKey(() => Theatre)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare theatre_id: number;

  @ForeignKey(() => Movie)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare movie_id: number;
}

export default TheatreMovie;
