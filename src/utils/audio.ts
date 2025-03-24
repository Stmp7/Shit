// Audio context for generating piano sounds
let audioContext: AudioContext | null = null;

// Initialize audio context
export const initAudio = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

// Generate a piano note frequency
const getNoteFrequency = (note: string): number => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const octave = 4; // Middle octave
  const noteIndex = notes.indexOf(note);
  return 440 * Math.pow(2, (noteIndex - 9 + (octave - 4) * 12) / 12);
};

// Create a piano sound using oscillators and filters
export const playPianoNote = (note: string) => {
  const context = initAudio();
  const frequency = getNoteFrequency(note);
  
  // Create oscillators for different frequencies to create a richer sound
  const mainOsc = context.createOscillator();
  const secondOsc = context.createOscillator();
  const thirdOsc = context.createOscillator();
  
  // Create gain nodes for volume control
  const mainGain = context.createGain();
  const secondGain = context.createGain();
  const thirdGain = context.createGain();
  
  // Create filter for more realistic sound
  const filter = context.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 2000;
  filter.Q.value = 10;
  
  // Set up oscillators
  mainOsc.type = 'sine';
  secondOsc.type = 'triangle';
  thirdOsc.type = 'sine';
  
  mainOsc.frequency.value = frequency;
  secondOsc.frequency.value = frequency * 2;
  thirdOsc.frequency.value = frequency * 3;
  
  // Set up gain nodes
  mainGain.gain.value = 0.5;
  secondGain.gain.value = 0.2;
  thirdGain.gain.value = 0.1;
  
  // Connect nodes
  mainOsc.connect(mainGain);
  secondOsc.connect(secondGain);
  thirdOsc.connect(thirdGain);
  
  mainGain.connect(filter);
  secondGain.connect(filter);
  thirdGain.connect(filter);
  
  filter.connect(context.destination);
  
  // Start oscillators
  mainOsc.start();
  secondOsc.start();
  thirdOsc.start();
  
  // Create release effect
  const releaseTime = 0.5;
  mainGain.gain.setTargetAtTime(0, context.currentTime, releaseTime);
  secondGain.gain.setTargetAtTime(0, context.currentTime, releaseTime);
  thirdGain.gain.setTargetAtTime(0, context.currentTime, releaseTime);
  
  // Stop oscillators after release
  setTimeout(() => {
    mainOsc.stop();
    secondOsc.stop();
    thirdOsc.stop();
  }, 1000);
}; 