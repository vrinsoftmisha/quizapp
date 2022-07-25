import {
  Column,
  IsUUID,
  Length,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Users extends Model {
  @Column
  userName: string;

  @Column
  email: string;

  @Column
  userAge: number;

  @Length({ min: 5 })
  @Column({ allowNull: false })
  password: string;
}
