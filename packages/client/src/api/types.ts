export type StatusResponse = 'OK';

export type ErrorResponse = {
  reason: string;
  error: string;
};

export type SignUpResponseDTO = {
  id: number;
};

export type IUserDTO = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
};

export enum Status {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  UNEXPECTED_ERROR = 500,
}

export type LeaderboardListDTO = {
  id?: number;
  name: string;
  score: number|string;
}[];

export interface ILeaderboardAddUser{
  data: {
    name:string,
    score:number|string,
  },
  ratingFieldName: string,
  teamName: string
}

export interface ILeaderAll{
  data?: {
    name:string,
    score:number|string,
  },
  ratingFieldName?: string,
  cursor?: number,
  limit?: number,
  teamName?: string
}

export interface IQuery{
  ratingFieldName: string,
  cursor: number,
  limit: number,
}

export interface IFrameDTO {
  name: string;
  rect: Array<number>;
}

export interface IEntityDTO {
  name: string;
  pos: Array<number>;
}

export interface ITileDTO {
  name?: string;
  type: string;
  pattern?: string;
  ranges: Array<number[]>;
}

export interface ILayerDTO {
  tiles: Array<ITileDTO>;
}

export interface IPatternDTO {
  [key: string]: {
    tiles: Array<ITileDTO>;
  };
}

export interface ILevelDTO {
  spriteSheet: string;
  musicSheet: string;
  patterns: IPatternDTO;
  layers: Array<ILayerDTO>;
  entities: Array<IEntityDTO>;
}

export interface IAnimationDTO {
  name: string;
  frameLen: number;
  frames: Array<string>;
}

export interface ISpriteSheetDTO {
  imageUrl: string;
  tileW: number;
  tileH: number;
  tiles?: Array<{ name: string; index: Array<number> }>;
  frames?: Array<IFrameDTO>;
  animations?: Array<IAnimationDTO>;
}

export interface ISoundSheetDTO {
  [key: string]: {
    url: string;
  };
}
/*
export {
  // eslint-disable-line
  type ISoundSheetDTO,
  // eslint-disable-line
  type ErrorResponse,
  // eslint-disable-line
  type StatusResponse,
  // eslint-disable-line
  type SignUpResponseDTO,
  // eslint-disable-line
  type IUserDTO,
  // eslint-disable-line
  Status,
  type LeaderboardListDTO,
  type ISpriteSheetDTO,
  type IEntityDTO,
  type ITileDTO,
  type ILevelDTO,
  type IPatternDTO,
};
*/
