import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class Product extends Model {
  @Column({ primaryKey: true })
  id: string;

  @Column
  name: string;

  @Column
  price: string;

  @Column
  location: string;

  // @Column
  // longitude: string;

  // @Column
  // latitude: string;

  @Column
  image: string;

  @Column
  rating: string;

  @Column
  rates_num: string;

  // @Column
  // location: string;
}
