import { MusicPlayer } from './music-player';

class MusicController {
  player: MusicPlayer | null;
  constructor() {
    this.player = null;
  }

  pause() {
    this.player?.pauseAll();
  }

  setPlayer(player: MusicPlayer) {
    this.player = player;
  }

  playTheme(speed = 1) {
    const audio = this.player?.playTrack('main');
    if (audio) {
      audio.playbackRate = speed;
    }
  }

  playHurryTheme(speed = 1) {
    const audio = this.player?.playTrack('hurry');

    if (audio) {
      audio.loop = false;
      audio.playbackRate = speed;
      audio.addEventListener(
        'ended',
        () => {
          this.playTheme(1.3);
        },
        { once: true }
      );
    }
  }
}

export { MusicController };
