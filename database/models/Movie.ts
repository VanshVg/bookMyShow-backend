import { CreationOptional, Optional } from "sequelize";
import { moviesAttributes } from "../../interfaces/modelInterface";
import {
  AutoIncrement,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import Theatre from "./Theatre";
import TheatreMovie from "./TheatreMovie";

interface moviesCreationAttributes extends Optional<moviesAttributes, "id"> {}

@Table({
  timestamps: true,
  tableName: "movies",
  paranoid: true,
})
class Movie extends Model<moviesAttributes, moviesCreationAttributes> {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare genre: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare run_time: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare release_date: Date;

  @DeletedAt
  declare deletedAt: Date | null;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;

  @BelongsToMany(() => Theatre, () => TheatreMovie)
  declare theatres: Theatre[];
}

export default Movie;
