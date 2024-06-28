import { CreationOptional, Optional } from "sequelize";
import {
  AutoIncrement,
  BelongsTo,
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

import { theatresAttributes } from "../../interfaces/modelInterface";
import User from "./User";
import Movie from "./Movie";
import TheatreMovie from "./TheatreMovie";

interface theatresCreationAttributes extends Optional<theatresAttributes, "id"> {}

@Table({
  timestamps: false,
  tableName: "theatre",
  paranoid: true,
})
class Theatre extends Model<theatresAttributes, theatresCreationAttributes> {
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare owner_id: number;

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

  @BelongsTo(() => User, "owner_id")
  declare users: User;

  @BelongsToMany(() => Movie, () => TheatreMovie)
  declare movies: Movie[];
}

export default Theatre;
