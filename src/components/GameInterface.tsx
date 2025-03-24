import React, { useState } from 'react';
import Piano from './Piano';
import Staff from './Staff';
import './GameInterface.css';

interface GameInterfaceProps {
  onScoreUpdate: (score: number) => void;
}

const GameInterface: React.FC<GameInterfaceProps> = ({ onScoreUpdate }) => {
  const [currentNoteIndex, setCurrentNoteIndex] = useState<number>(0);
  const [playedNotes, setPlayedNotes] = useState<boolean[]>([false, false, false]);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [allNotesPlayed, setAllNotesPlayed] = useState<boolean>(false);

  const handleStartLevel = () => {
    setGameStarted(true);
    setCurrentNoteIndex(0);
    setPlayedNotes([false, false, false]);
    setScore(0);
    setStreak(0);
    setAllNotesPlayed(false);
  };

  const handleNotePlay = (note: string) => {
    if (!gameStarted) {
      return;
    }

    // If all notes have been played, ignore further key presses
    if (allNotesPlayed) {
      return;
    }

    if (note === 'C') {
      // Update the played notes state first
      setPlayedNotes(prev => {
        const newPlayedNotes = [...prev];
        newPlayedNotes[currentNoteIndex] = true;
        return newPlayedNotes;
      });

      // Update score and streak
      setScore(prev => {
        const newScore = prev + 1;
        onScoreUpdate(newScore); // Call onScoreUpdate with the new score
        return newScore;
      });
      setStreak(prev => prev + 1);
      
      // Check if we've played all notes
      if (currentNoteIndex === 2) {
        setAllNotesPlayed(true);
      } else {
        setCurrentNoteIndex(prev => prev + 1);
      }
    } else {
      setStreak(0);
    }
  };

  return (
    <div className="game-interface">
      <div className="game-info">
        <div className="score">Score: {score}</div>
        <div className="streak">Streak: {streak}</div>
      </div>
      <Staff currentNote="C" playedNotes={playedNotes} />
      <Piano onNotePlay={handleNotePlay} />
      {!gameStarted && (
        <button className="start-button" onClick={handleStartLevel}>
          Start Level
        </button>
      )}
      {allNotesPlayed && (
        <div className="complete-message">
          Great job! You've played all the notes!
        </div>
      )}
    </div>
  );
};

export default GameInterface; 