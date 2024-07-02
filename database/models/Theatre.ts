import { CreationOptional, Optional } from "sequelize";
import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
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

import { TheatresAttributes } from "../../interfaces/modelInterface";
import Movie from "./Movie";
import TheatreMovie from "./TheatreMovie";
import Screen from "./Screen";

interface TheatresCreationAttributes extends Optional<TheatresAttributes, "id"> {}

@Table({
  timestamps: false,
  tableName: "theatre",
  paranoid: true,
})
class Theatre extends Model<TheatresAttributes, TheatresCreationAttributes> {
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
  declare address: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare screens: number;

  @DeletedAt
  declare deletedAt: Date | null;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;

  @BelongsToMany(() => Movie, () => TheatreMovie)
  declare movies: Movie[];

  @HasMany(() => Screen, "theatre_id")
  declare theatre_screens: Screen[];
}

export default Theatre;
