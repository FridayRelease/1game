class AudioBoard {
  buffers: Map<string, AudioBuffer>;

  constructor() {
    this.buffers = new Map();
  }

  addAudio(name: string, buffer: AudioBuffer) {
    this.buffers.set(name, buffer);
  }

  playAudio(name: string, audioContext: AudioContext) {
    const buffer = this.buffers.get(name);
    if (buffer) {
      const source = audioContext.createBufferSource();
      source.connect(audioContext.destination);
      source.buffer = buffer;
      source.start(0);
    }
  }
}

export { AudioBoard };
