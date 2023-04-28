class MusicPlayer {
  tracks: Map<string, HTMLAudioElement>;
  constructor() {
    this.tracks = new Map();
  }

  addTrack(name: string, url: string) {
    const audio = new Audio();
    audio.loop = false;
    audio.src = url;
    this.tracks.set(name, audio);
  }

  playTrack(name: string) {
    const audio = this.tracks.get(name);
    audio?.play();
  }

  pauseTrack(name: string) {
    const audio = this.tracks.get(name);

    audio?.pause();
  }
}

export { MusicPlayer };
