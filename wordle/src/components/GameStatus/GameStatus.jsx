import './GameStatus.css';

export function GameStatus({ gameOver, won, targetWord, onPlayAgain }) {
  if (!gameOver) return null;

  return (
    <aside className="gameStatus" role="status" aria-live="polite">
      <p className="gameStatusMessage">
        {won ? '🎉 You won!' : 'Game Over!'}
      </p>
      {!won && (
        <p className="gameStatusWord">
          The word was: <strong>{targetWord}</strong>
        </p>
      )}
      <button onClick={onPlayAgain} className="gameStatusButton">
        Play Again
      </button>
    </aside>
  );
}
