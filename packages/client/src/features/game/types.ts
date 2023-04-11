import { ITileDTO } from '@/api/types';
import { Entity } from './entity';

type MatchTile = {
  tile: { type?: string; name?: string };
  x1: number;
  x2: number;
  y1: number;
  y2: number;
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
  type MatchTile,
  type EntityFactoryCallback,
  type CallBackFunction,
  type IExpandedTile,
  type ILevel,
  type Layer,
  type Position,
};
