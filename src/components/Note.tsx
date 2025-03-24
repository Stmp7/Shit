import React from 'react';
import './Note.css';

interface NoteProps {
  note: string;
  x: number;
  y: number;
  isPlayed: boolean;
}

const Note: React.FC<NoteProps> = ({ note, x, y, isPlayed }) => {
  const color = isPlayed ? '#4CAF50' : '#4B4B4B';
  
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle
        className={`note-head ${isPlayed ? 'played' : ''}`}
        r="6"
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
      <line
        className="note-stem"
        x1="6"
        y1="-30"
        x2="6"
        y2="0"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <text
        className="note-label"
        x="0"
        y="40"
        textAnchor="middle"
        fill={color}
        fontSize="12"
        fontFamily="Arial, sans-serif"
      >
        {note}
      </text>
    </g>
  );
};

export default Note; 