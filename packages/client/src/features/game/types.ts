import { ITileDTO } from '@/api/types';
import { Entity } from './entity';

type TraitName = 'go' | 'behavior' | 'bullet' | 'enemy' | 'go' | 'physics' | 'playerController' | 'solid' | 'killable';

type MatchTile = {
  tile: ITileDTO;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  indexX: number;
  indexY: number;
};

type IExpandedTile = {
  tile: ITileDTO;
  x: number;
  y: number;
};

type ILevel = {
  backgrounds: Array<ITileDTO>;
};

type Layer = (ctx: CanvasRenderingContext2D | null) => void;

type Position = { x: number; y: number };

type EntityFactoryCallback = () => Entity;

type CallBackFunction = () => void;

export {
  type TraitName,
  type MatchTile,
  type EntityFactoryCallback,
  type CallBackFunction,
  type IExpandedTile,
  type ILevel,
  type Layer,
  type Position,
};
