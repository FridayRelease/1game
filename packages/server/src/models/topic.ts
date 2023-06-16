/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Column, Model, BelongsTo, HasMany } from 'sequelize-typescript';
import { Comment } from './comment';
import { User } from './user';
import { Reaction } from './reaction';

@Table({
  tableName: 'topics',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

class Topic extends Model {
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

  @HasMany(() => Reaction, "topic_id")
  reaction: Reaction[] | undefined;
}

export { Topic }
