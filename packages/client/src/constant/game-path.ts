// необходимые urls для игры

const assetsApi =
  process.env.NODE_ENV === 'development'
    ? import.meta.env.VITE_DEV_ASSETS_API || '/assets/public/'
    : import.meta.env.VITE_ASSETS_API || '/assets/';

const paths = [
  `${assetsApi}levels/1-1.json`,
  `${assetsApi}levels/1-2.json`,
  `${assetsApi}levels/1-3.json`,
  `${assetsApi}img/fonts.png`,
  `${assetsApi}sprites/bullet.json`,
  `${assetsApi}sprites/tank.json`,
  `${assetsApi}sounds/tank.json`,
  `${assetsApi}sprites/enemy.json`,
  `${assetsApi}sprites/eagle.json`,
  `${assetsApi}img/tanks.png`,
  `${assetsApi}img/bullet.png`,
  `${assetsApi}img/tiles.png`,
  `${assetsApi}sprites/overworld.json`,
  `${assetsApi}img/ground.png`,
  `${assetsApi}sounds/overworld.json`,
  `${assetsApi}sprites/patterns/overworld-pattern.json`,
  `${assetsApi}audio/levelstarting.ogg`,
  `${assetsApi}audio/shoot.ogg`,
  `${assetsApi}audio/fexplosion.ogg`,
  `${assetsApi}audio/moving.ogg`,
  `${assetsApi}audio/tank_idle.wav`,
  `${assetsApi}audio/bonus.ogg`,
];

export { paths };
