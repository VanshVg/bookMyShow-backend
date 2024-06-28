import {
  AutoIncrement,
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
import { CreationOptional, Optional } from "sequelize";

import { usersAttributes } from "../../interfaces/modelInterface";
import Event from "./Event";
import UserEvent from "./UserEvent";
import Theatre from "./Theatre";

interface userCreationAttributes
  extends Optional<
    usersAttributes,
    "id" | "reset_token" | "reset_time" | "createdAt" | "updatedAt"
  > {}

@Table({
  timestamps: true,
  tableName: "users",
  paranoid: true,
})
class User extends Model<usersAttributes, userCreationAttributes> {
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
  declare first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare contact_no: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare verification_token: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare reset_token: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare reset_time: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare role: "admin" | "user" | "organizer";

  @DeletedAt
  declare deletedAt: Date | null;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;

  @BelongsToMany(() => Event, () => UserEvent)
  declare events: Event[];

  @HasMany(() => Theatre, "owner_id")
  declare theatres: Theatre[];
}

export default User;
