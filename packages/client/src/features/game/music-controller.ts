import { MusicPlayer } from './music-player';

class MusicController {
  player: MusicPlayer | null;
  constructor() {
    this.player = null;
  }

  setPlayer(player: MusicPlayer) {
    this.player = player;
  }
}

export { MusicController };
