import { Column, Length, Model, Table } from 'sequelize-typescript';

@Table
export class Users extends Model {
  @Column
  email: string;

  @Column
  userAge: number;

  @Length({ min: 5 })
  @Column({ allowNull: false })
  password: string;
}
