import React from 'react';
import { playPianoNote } from '../utils/audio';
import './Piano.css';

interface PianoProps {
  onNotePlay: (note: string) => void;
}

const Piano: React.FC<PianoProps> = ({ onNotePlay }) => {
  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = ['C#', 'D#', '', 'F#', 'G#', 'A#', ''];

  const handleKeyPress = (note: string) => {
    if (note) {
      playPianoNote(note);
      onNotePlay(note);
    }
  };

  return (
    <div className="piano">
      <div className="piano-keys">
        {notes.map((note, index) => (
          <React.Fragment key={note}>
            <div
              className="key white"
              onClick={() => handleKeyPress(note)}
            >
              <span className="note-label">{note}</span>
            </div>
            {blackKeys[index] && (
              <div
                className="key black"
                onClick={() => handleKeyPress(blackKeys[index])}
              >
                <span className="note-label">{blackKeys[index]}</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Piano; 