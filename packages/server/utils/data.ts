import type { IResponseWithPaginate } from 'pagination';
import type { Reaction } from '../src/models/reaction';

const paginateResponse = <T>(
  count: number,
  rows: Array<T>,
  offset = 0,
  limit = 0
): IResponseWithPaginate<T> => {
  return {
    count,
    rows,
    offset: offset * limit,
    elementCount: rows.length
  }
}

type ExtendReaction = Omit<Reaction, 'user'> & { user_id: number }

const groupingReaction = (reactions: Array<ExtendReaction>, user_id?: number) => {
  const newObject: Record<string, any> = {}

  for (const reaction of reactions) {
    if (newObject[reaction.reaction.name]) {
      newObject[reaction.reaction.name] = {
        ...newObject[reaction.reaction.name],
        count: newObject[reaction.reaction.name].count + 1,
        hasCurrentUserReacted: newObject[reaction.reaction.name].hasCurrentUserReacted ?? reaction.user_id === user_id
      }
    } else {
      newObject[reaction.reaction.name] = {
        count: 1,
        hasCurrentUserReacted: reaction.user_id === user_id,
        emoji: reaction.reaction.emoji
      }
    }
  }

  return newObject;
}

export {
  paginateResponse,
  groupingReaction
}
