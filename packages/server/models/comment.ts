/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Column, Model, HasMany, DataType, BelongsTo } from 'sequelize-typescript';
import { Topic } from './topic';
import { User } from './user';

@Table({
  tableName: 'comments',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Comment extends Model {
  @Column({
    type: DataType.TEXT,
  })
  message!: string;

  @BelongsTo(() => User, {
    foreignKey: 'user_id',
  })
  user!: User;

  // This may have many answers.
  @HasMany(() => Comment, {
    foreignKey: 'comment_id',
  })
  comments?: Comment[];

  // This is the answer.
  @BelongsTo(() => Comment, {
    foreignKey: 'comment_id',
  })
  comment?: Comment;

  @BelongsTo(() => Topic, {
    foreignKey: 'topic_id',
  })
  topic!: Topic;
}
