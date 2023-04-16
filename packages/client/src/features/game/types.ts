import { ITileDTO } from '@/api/types';
import { Traits } from '@/constant/traits';
import { Entity } from './entity';
import { Level } from './level';

type TraitName =
  | Traits.Go
  | Traits.Behavior
  | Traits.EnemyBehavior
  | Traits.Bullet
  | Traits.Enemy
  | Traits.Physics
  | Traits.PlayerController
  | Traits.Player
  | Traits.Solid
  | Traits.Killable
  | Traits.Shoot
  | Traits.Emitter;

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

type EmmitCallBackFunction = (entity: Entity, level: Level) => void;

type GameContext = {
  deltaTime: number;
  audioContext: AudioContext;
  entityFactory: Record<string, EntityFactoryCallback>;
};

export {
  type TraitName,
  type MatchTile,
  type EntityFactoryCallback,
  type CallBackFunction,
  type IExpandedTile,
  type ILevel,
  type Layer,
  type Position,
  type GameContext,
  type EmmitCallBackFunction,
};
