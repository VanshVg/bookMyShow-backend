import { CreationOptional, Optional } from "sequelize";
import { ScreensAttributes } from "../../interfaces/modelInterface";
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
import Theatre from "./Theatre";
import Shows from "./Show";

interface ScreensCreationAttributes extends Optional<ScreensAttributes, "id"> {}

@Table({
  timestamps: true,
  tableName: "theatre_screens",
  paranoid: true,
})
class Screen extends Model<ScreensAttributes, ScreensCreationAttributes> {
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

  @ForeignKey(() => Theatre)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare theatre_id: number;

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

  @BelongsTo(() => Theatre, "theatre_id")
  declare theatres: Theatre[];

  @HasMany(() => Shows, "screen_id")
  declare shows: Shows[];
}

export default Screen;
