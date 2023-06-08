type StatusResponse = 'OK';

type ErrorResponse = {
  reason: string;
  error: string;
};

type SignUpResponseDTO = {
  id: number;
};

type IUserDTO = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
};

enum Status {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  UNEXPECTED_ERROR = 500,
}

type LeaderboardListDTO = {
  data: {
    name: string;
    score: number;
  };
};

export interface IPlayerInfo {
  name?: string;
  score?: number;
  enemies: number;
}

export interface ILeaderboardAddUser {
  data: IPlayerInfo;
  ratingFieldName: string;
  teamName: string;
}

export interface ILeaderAll {
  data?: {
    name: string;
    score: number | string;
  };
  ratingFieldName?: string;
  cursor?: number;
  limit?: number;
  teamName?: string;
}

export interface IQuery {
  ratingFieldName: string;
  cursor: number;
  limit: number;
}

export interface IFrameDTO {
  name: string;
  rect: Array<number>;
}

interface IEntityDTO {
  name: string;
  pos: Array<number>;
}

interface ITileDTO {
  name?: string;
  type: string;
  pattern?: string;
  ranges: Array<number[]>;
}

interface ILayerDTO {
  tiles: Array<ITileDTO>;
}

interface IPatternDTO {
  [key: string]: {
    tiles: Array<ITileDTO>;
  };
}

interface ITriggersDTO {
  type: string;
  name: string;
  pos?: Array<number[]>;
  count?: number;
}

interface ILevelDTO {
  spriteSheet: string;
  musicSheet: string;
  patterns: IPatternDTO;
  layers: Array<ILayerDTO>;
  entities: Array<IEntityDTO>;
  patternSheet: string;
}

interface IAnimationDTO {
  name: string;
  frameLen: number;
  frames: Array<string>;
}

interface ISpriteSheetDTO {
  imageUrl: string;
  tileW: number;
  tileH: number;
  tiles?: Array<{ name: string; index: Array<number> }>;
  frames?: Array<IFrameDTO>;
  animations?: Array<IAnimationDTO>;
}

interface ISoundSheetDTO {
  [key: string]: {
    url: string;
  };
}

type ForumTopicDTO = {
  id: number;
  subject: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: IUserDTO;
};

type ForumTopicsDTO = {
  count: number;
  elementCount: number;
  offset: number;
  rows: ForumTopicDTO[];
};

export {
  type ISoundSheetDTO,
  type ErrorResponse,
  type StatusResponse,
  type SignUpResponseDTO,
  type IUserDTO,
  Status,
  type LeaderboardListDTO,
  type ISpriteSheetDTO,
  type IEntityDTO,
  type ITileDTO,
  type ILevelDTO,
  type IPatternDTO,
  type ITriggersDTO,
  type ForumTopicDTO,
  type ForumTopicsDTO,
};
