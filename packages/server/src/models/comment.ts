/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Column, Model, HasMany, DataType, BelongsTo, ForeignKey, AllowNull, Default } from 'sequelize-typescript';
import { Topic } from './topic';
import { User } from './user';

@Table({
  tableName: 'comments',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class Comment extends Model {
  @Column({
    type: DataType.TEXT,
  })
  message!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  user_id!: number;

  @BelongsTo(() => User, {
    foreignKey: 'user_id',
  })
  user!: User;

  // This may have many answers.
  @HasMany(() => Comment, {
    foreignKey: 'comment_id',
  })
  comments?: Comment[];

  @ForeignKey(() => Comment)
  @AllowNull(true)
  @Column
  comment_id!: number;

  @BelongsTo(() => Topic, {
    foreignKey: 'topic_id',
  })
  topic!: Topic;

  @Default(0)
  @Column
  nested_comment_count!: number;
}
