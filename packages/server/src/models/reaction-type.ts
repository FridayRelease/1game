/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'reactions_type',
  createdAt: false,
  updatedAt: false
})
export class ReactionType extends Model {
  @Column
  name!: string;

  @Column
  emoji!: string;
}
