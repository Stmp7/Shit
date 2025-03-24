import React, { useState } from 'react'
import GameInterface from './components/GameInterface'
import './App.css'

function App() {
  const [score, setScore] = useState(0)

  return (
    <div className="app">
      <h1>Piano Learning App</h1>
      <div className="game-container">
        <GameInterface onScoreUpdate={setScore} />
      </div>
      <div className="total-score">
        Total Score: {score}
      </div>
    </div>
  )
}

export default App
