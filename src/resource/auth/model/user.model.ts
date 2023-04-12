import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    primaryKey: true,
  })
  id: string;

  @Column
  username: string;

  @Column
  phone: string;

  @Column
  email: string;

  @Column
  password: string;
}
