import { Tile } from '../Tile/Tile';
import './GameBoard.css';

export function GameBoard({ guesses, currentGuess, currentRow, wordLength, targetWord, gameOver }) {
  const getLetterState = (rowIndex, colIndex) => {
    const guess = guesses[rowIndex];

    if (rowIndex > currentRow) return 'empty';
    if (rowIndex === currentRow && !gameOver) return 'current';
    if (!guess || !guess[colIndex]) return 'empty';

    const letter = guess[colIndex];

    if (targetWord[colIndex] === letter) return 'correct';
    if (targetWord.includes(letter)) return 'present';
    return 'absent';
  };

  return (
    <section className="gameBoard" aria-label="Game board">
      {Array(6).fill(null).map((_, rowIndex) => (
        <article key={rowIndex} className="gameBoardRow" role="row">
          {Array(wordLength).fill(null).map((_, colIndex) => {
            const state = getLetterState(rowIndex, colIndex);
            const letter = rowIndex === currentRow && !gameOver
              ? currentGuess[colIndex] || ''
              : guesses[rowIndex]?.[colIndex] || '';

            return (
              <Tile
                key={colIndex}
                letter={letter}
                state={state}
                wordLength={wordLength}
              />
            );
          })}
        </article>
      ))}
    </section>
  );
}

export default GameBoard