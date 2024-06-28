import { Optional } from "sequelize";
import { theatreMoviesAttributes } from "../../interfaces/modelInterface";
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

interface theatreMoviesCreationAttributes extends Optional<theatreMoviesAttributes, "id"> {}

@Table({
  timestamps: false,
  tableName: "theatre_movies",
  paranoid: false,
})
class TheatreMovie extends Model<theatreMoviesAttributes, theatreMoviesCreationAttributes> {
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
