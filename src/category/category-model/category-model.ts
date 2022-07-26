import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Category extends Model {
  @Column
  name: string;
}
