import { Entity } from './entity';

interface ITileDto {
  name?: string;
  type: string;
  pattern?: string;
  ranges: Array<number[]>;
}

type IExpandedTile = {
  tile: ITileDto;
  x: number;
  y: number;
};

type ILevel = {
  backgrounds: Array<ITileDto>;
};

type Layer = (ctx: CanvasRenderingContext2D | null) => void;

type Position = { x: number; y: number };

interface ISpriteSheet {
  imageUrl: string;
  tileW: number;
  tileH: number;
  tiles?: Array<{ name: string; index: Array<number> }>;
  frames?: Array<IFrameDTO>;
  animations?: Array<IAnimationDTO>;
}

interface IPattern {
  [key: string]: {
    tiles: Array<ITileDto>;
  };
}

interface ILayerDto {
  tiles: Array<ITileDto>;
}

interface ILevelDTO {
  spriteSheet: string;
  patterns: IPattern;
  layers: Array<ILayerDto>;
  entities: Array<IEntityDTO>;
}

interface IAnimationDTO {
  name: string;
  frameLen: number;
  frames: Array<string>;
}

interface IFrameDTO {
  name: string;
  rect: Array<number>;
}

interface IEntityDTO {
  name: string;
  pos: Array<number>;
}

type EntityFactoryCallback = () => Entity;

export {
  type EntityFactoryCallback,
  type IEntityDTO,
  type IFrameDTO,
  type IAnimationDTO,
  type ILayerDto,
  type IExpandedTile,
  type ILevelDTO,
  type ITileDto,
  type ILevel,
  type Layer,
  type Position,
  type ISpriteSheet,
  type IPattern,
};
