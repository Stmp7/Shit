import React from 'react';
import Note from './Note';
import './Staff.css';

interface StaffProps {
  currentNote: string;
  playedNotes: boolean[];
}

const Staff: React.FC<StaffProps> = ({ currentNote, playedNotes }) => {
  const notes = ['C', 'C', 'C']; // Three C notes
  const xPositions = [150, 200, 250]; // Spread the notes horizontally

  return (
    <div className="staff">
      <svg viewBox="0 0 400 200" className="staff-svg">
        {/* Staff lines */}
        <line x1="50" y1="40" x2="350" y2="40" className="staff-line" />
        <line x1="50" y1="60" x2="350" y2="60" className="staff-line" />
        <line x1="50" y1="80" x2="350" y2="80" className="staff-line" />
        <line x1="50" y1="100" x2="350" y2="100" className="staff-line" />
        <line x1="50" y1="120" x2="350" y2="120" className="staff-line" />
        
        {/* Notes */}
        {notes.map((note, index) => (
          <Note
            key={index}
            note={note}
            x={xPositions[index]}
            y={getNoteYPosition(note)}
            isPlayed={playedNotes[index]}
          />
        ))}
      </svg>
    </div>
  );
};

const getNoteYPosition = (note: string): number => {
  const notePositions: { [key: string]: number } = {
    'C': 140,  // Below the staff
    'D': 120,  // First space
    'E': 100,  // First line
    'F': 80,   // Second space
    'G': 60,   // Second line
    'A': 40,   // Third space
    'B': 20,   // Third line
  };
  return notePositions[note] || 100;
};

export default Staff; 