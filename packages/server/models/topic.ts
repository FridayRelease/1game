/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Column, Model, BelongsTo, HasMany } from 'sequelize-typescript';
import { Comment } from './comment';
import { User } from './user';

@Table({
  tableName: 'topics',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Topic extends Model {
  @Column
  subject!: string;

  @BelongsTo(() => User, {
    foreignKey: 'user_id',
  })
  user!: User;

  @HasMany(() => Comment, {
    foreignKey: 'topic_id',
  })
  comments?: Comment[];
}
