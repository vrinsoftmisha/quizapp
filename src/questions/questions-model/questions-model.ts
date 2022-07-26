import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Questions extends Model {
  @Column
  name: string;

  @Column(DataType.JSON)
  options: string;

  @Column
  categoryId: number;

  @Column
  correctAnswer: string;
}
