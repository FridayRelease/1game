/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Column, Model, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user';

@Table({
  tableName: 'user_configs',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [{ unique: true, fields: ['user_id'] }],
})
export class UserConfig extends Model {
  @Column
  current_theme!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  user_id!: number;

  @BelongsTo(() => User, {
    foreignKey: 'user_id',
  })
  user!: User;
}
