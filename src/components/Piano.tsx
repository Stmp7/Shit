import React, { useEffect, useRef } from 'react';
import './Piano.css';

interface PianoProps {
  onNotePlay: (note: string) => void;
}

const Piano: React.FC<PianoProps> = ({ onNotePlay }) => {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = [
    { note: 'C#', position: 55 },
    { note: 'D#', position: 115 },
    { note: 'F#', position: 235 },
    { note: 'G#', position: 295 },
    { note: 'A#', position: 355 }
  ];

  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext
    audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Cleanup
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  const getNoteFrequency = (note: string): number => {
    const frequencies: { [key: string]: number } = {
      'C': 261.63,  // C4
      'C#': 277.18,
      'D': 293.66,
      'D#': 311.13,
      'E': 329.63,
      'F': 349.23,
      'F#': 369.99,
      'G': 392.00,
      'G#': 415.30,
      'A': 440.00,
      'A#': 466.16,
      'B': 493.88
    };
    return frequencies[note] || 440;
  };

  const createPianoSound = (frequency: number) => {
    if (!audioContext.current) return;

    const now = audioContext.current.currentTime;
    
    // Create main oscillator (sine wave for fundamental frequency)
    const mainOsc = audioContext.current.createOscillator();
    mainOsc.type = 'sine';
    mainOsc.frequency.value = frequency;
    
    // Create harmonics
    const harmonic1 = audioContext.current.createOscillator();
    harmonic1.type = 'triangle';
    harmonic1.frequency.value = frequency * 2;
    
    const harmonic2 = audioContext.current.createOscillator();
    harmonic2.type = 'sine';
    harmonic2.frequency.value = frequency * 3;
    
    // Create gain nodes for each oscillator
    const mainGain = audioContext.current.createGain();
    const harmonic1Gain = audioContext.current.createGain();
    const harmonic2Gain = audioContext.current.createGain();
    
    // Connect oscillators to their gain nodes
    mainOsc.connect(mainGain);
    harmonic1.connect(harmonic1Gain);
    harmonic2.connect(harmonic2Gain);
    
    // Connect all gain nodes to the destination
    mainGain.connect(audioContext.current.destination);
    harmonic1Gain.connect(audioContext.current.destination);
    harmonic2Gain.connect(audioContext.current.destination);
    
    // Set initial volumes
    mainGain.gain.value = 0.3;
    harmonic1Gain.gain.value = 0.1;
    harmonic2Gain.gain.value = 0.05;
    
    // Create envelope
    mainGain.gain.setValueAtTime(0, now);
    mainGain.gain.linearRampToValueAtTime(0.3, now + 0.01);
    mainGain.gain.exponentialRampToValueAtTime(0.01, now + 1);
    
    harmonic1Gain.gain.setValueAtTime(0, now);
    harmonic1Gain.gain.linearRampToValueAtTime(0.1, now + 0.01);
    harmonic1Gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    
    harmonic2Gain.gain.setValueAtTime(0, now);
    harmonic2Gain.gain.linearRampToValueAtTime(0.05, now + 0.01);
    harmonic2Gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    
    // Start oscillators
    mainOsc.start(now);
    harmonic1.start(now);
    harmonic2.start(now);
    
    // Stop oscillators after envelope completes
    mainOsc.stop(now + 1);
    harmonic1.stop(now + 0.8);
    harmonic2.stop(now + 0.6);
  };

  const handleKeyPress = (note: string) => {
    // Play the sound
    if (audioContext.current) {
      createPianoSound(getNoteFrequency(note));
    }
    // Call the parent's onNotePlay callback
    onNotePlay(note);
  };

  return (
    <div className="piano">
      <div className="piano-keys">
        {whiteKeys.map((note) => (
          <div 
            key={note} 
            className="white-key" 
            onClick={() => handleKeyPress(note)}
          >
            <span className="key-label">{note}</span>
          </div>
        ))}
        {blackKeys.map(({ note, position }) => (
          <div 
            key={note} 
            className="black-key" 
            onClick={() => handleKeyPress(note)}
            style={{ left: `${position}px` }}
          >
            <span className="key-label">{note}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Piano; 