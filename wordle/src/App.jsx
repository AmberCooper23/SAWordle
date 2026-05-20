import { WordsProvider } from './contexts/WordsContext';
import { GameBoard } from './components/GameBoard/GameBoard';
import { Keyboard } from './components/Keyboard/Keyboard';
import { GameStatus } from './components/GameStatus/GameStatus';
import { useGameLogic } from './hooks/useGameLogic';
import './App.css';

function Game() {
  const {
    targetWord,
    wordLength,
    guesses,
    currentGuess,
    currentRow,
    gameOver,
    won,
    keyboardState,
    handleKeyClick,
    resetGame,
  } = useGameLogic();

  return (
    <main className="app">
      <header className="appHeader">
        <h1 className="appTitle">SA WORDLE</h1>
        <p className="appHint">Today's word has {wordLength} letters</p>

        <GameStatus
          gameOver={gameOver}
          won={won}
          targetWord={targetWord}
          onPlayAgain={resetGame}
        />
      </header>

      <GameBoard
        guesses={guesses}
        currentGuess={currentGuess}
        currentRow={currentRow}
        wordLength={wordLength}
        targetWord={targetWord}
        gameOver={gameOver}
      />

      <Keyboard
        keyboardState={keyboardState}
        onKeyClick={handleKeyClick}
        gameOver={gameOver}
      />
    </main>
  );
}

export default function App() {
  return (
    <WordsProvider>
      <Game />
    </WordsProvider>
  );
}