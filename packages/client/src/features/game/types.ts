import { ITileDTO } from '@/api/types';
import { Entity } from './entity';

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

export { type EntityFactoryCallback, type IExpandedTile, type ILevel, type Layer, type Position };
