import React, { useState, useEffect } from 'react';
import Piano from './Piano';
import Staff from './Staff';
import CompletionAnimation from './CompletionAnimation';
import './GameInterface.css';

interface GameInterfaceProps {
  onScoreUpdate: (score: number) => void;
}

const GameInterface: React.FC<GameInterfaceProps> = ({ onScoreUpdate }) => {
  const [currentNoteIndex, setCurrentNoteIndex] = useState<number>(0);
  const [playedNotes, setPlayedNotes] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [allNotesPlayed, setAllNotesPlayed] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  const handleStartLevel = () => {
    setGameStarted(true);
    setCurrentNoteIndex(0);
    setPlayedNotes([]);
    setScore(0);
    setStreak(0);
    setAllNotesPlayed(false);
    setIsComplete(false);
    setShowAnimation(false);
  };

  const handleNotePlay = (note: string) => {
    if (!gameStarted || isComplete) return;

    if (note === 'C') {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      
      // Update the played notes state first
      setPlayedNotes(prev => {
        const newPlayedNotes = [...prev, note];
        return newPlayedNotes;
      });

      // Check if all notes have been played
      if (currentNoteIndex === 2) {
        setAllNotesPlayed(true);
        setIsComplete(true);
        setShowAnimation(true);
        // Hide animation after 2 seconds
        setTimeout(() => {
          setShowAnimation(false);
        }, 2000);
      } else {
        setCurrentNoteIndex(prev => prev + 1);
      }
    } else {
      setStreak(0);
    }
  };

  return (
    <div className="game-interface">
      <div className="score-container">
        <div className="score">Score: {score}</div>
        <div className="streak">Streak: {streak}</div>
      </div>
      <div className="staff-container">
        <Staff currentNote="C" playedNotes={playedNotes} />
        <CompletionAnimation isVisible={showAnimation} />
      </div>
      <Piano onNotePlay={handleNotePlay} />
      {!gameStarted && (
        <button className="start-button" onClick={handleStartLevel}>
          Start Level
        </button>
      )}
    </div>
  );
};

export default GameInterface; 