/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Model, BelongsTo } from 'sequelize-typescript';
import { User } from './user';
import { ReactionType } from './reaction-type';
import { Topic } from './topic';

@Table({
  tableName: 'reactions',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
class Reaction extends Model {
  @BelongsTo(() => Topic, 'topic_id')
  topic!: Topic;

  @BelongsTo(() => ReactionType, 'reaction_id')
  reaction!: ReactionType;

  @BelongsTo(() => User, 'user_id')
  user!: User;
}

export { Reaction }
