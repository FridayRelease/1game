enum SIDES {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

enum ENTITY_POSITION {
  NONE = 0,
  FRIEND = 1,
  VILLAIN = 2,
}

enum ENTITY_TYPE {
  NONE = 0,
  TANK = 1,
  ENEMY_TANK = 2,
  BULLET = 3,
}

export { SIDES, ENTITY_POSITION, ENTITY_TYPE as EntityType };
