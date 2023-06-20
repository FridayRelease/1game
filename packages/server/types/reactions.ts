import type { Reaction } from '../src/models/reaction';

type ExtendReaction = Omit<Reaction, 'user'> & { user_id: number }

interface ObjectReaction {
  count: number;
  hasCurrentUserReacted: boolean;
  emoji: string;
  id: number;
}

export {
  ExtendReaction,
  ObjectReaction
}
