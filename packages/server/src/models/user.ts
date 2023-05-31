/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Column, Model, HasMany, HasOne } from 'sequelize-typescript';
import { Comment } from './comment';
import { Topic } from './topic';
import { UserConfig } from './user-config';

@Table({
  tableName: 'users',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [{ unique: true, fields: ['email'] }],
})
export class User extends Model {
  @Column
  first_name!: string;

  @Column
  last_name!: string;

  @Column
  email!: string;

  @Column
  display_name?: string;

  @Column
  avatar?: string;

  @HasMany(() => Topic, {
    foreignKey: 'user_id',
  })
  topics?: Topic[];

  @HasMany(() => Comment, {
    foreignKey: 'user_id',
  })
  comments?: Comment[];

  @HasOne(() => UserConfig, {
    foreignKey: 'user_id',
  })
  userconfig?: UserConfig;
}
