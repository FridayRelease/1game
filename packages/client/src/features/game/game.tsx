import { useRef, memo } from 'react';
import StartGame from './components/start-game';
import { useStart } from './hooks';

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isStarted, start } = useStart(canvasRef);

  return (
    <>
      <StartGame isStarted={isStarted} handleClick={start} />

      <canvas className="game" ref={canvasRef} id="screen" width="260px" height="260px" />
    </>
  );
};

export default memo(Game);
