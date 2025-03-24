import React from 'react';
import './Note.css';

interface NoteProps {
  note: string;
  x: number;
  y: number;
  isPlayed: boolean;
}

const Note: React.FC<NoteProps> = ({ note, x, y, isPlayed }) => {
  return (
    <g className={`note ${isPlayed ? 'played' : ''}`} transform={`translate(${x}, ${y})`}>
      <circle className="note-head" cx="0" cy="0" r="6" />
      {note === 'C' && <line className="note-line" x1="-6" y1="0" x2="6" y2="0" />}
      <line className="note-stem" x1="6" y1="-40" x2="6" y2="0" />
    </g>
  );
};

export default Note; 