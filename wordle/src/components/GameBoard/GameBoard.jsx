import { Tile } from '../Tile/Tile';
import './GameBoard.css';

export function GameBoard({ guesses, currentGuess, currentRow, wordLength, targetWord, gameOver }) {
  const getRowStates = (letters) => {
    if (!letters || letters.length !== wordLength) return Array(wordLength).fill('empty');

    const states = Array(wordLength).fill('absent');
    const targetLetters = targetWord.split('');
    const used = Array(wordLength).fill(false);

    for (let i = 0; i < wordLength; i++) {
      if (letters[i] === targetLetters[i]) {
        states[i] = 'correct';
        used[i] = true;
      }
    }

    for (let i = 0; i < wordLength; i++) {
      if (states[i] === 'correct') continue;
      const letter = letters[i];
      const idx = targetLetters.findIndex((t, j) => t === letter && !used[j]);
      if (idx !== -1) {
        states[i] = 'present';
        used[idx] = true;
      }
    }

    return states;
  };

  return (
    <section className="gameBoard" aria-label="Game board">
      {Array(6).fill(null).map((_, rowIndex) => {
        const guess = guesses[rowIndex];
        const isSubmitted = rowIndex < currentRow || gameOver;
        const states = isSubmitted ? getRowStates(guess) : Array(wordLength).fill('empty');

        return (
          <article key={rowIndex} className="gameBoardRow" role="row">
            {Array(wordLength).fill(null).map((_, colIndex) => {
              let letter = '';
              let state = states[colIndex];

              if (rowIndex === currentRow && !gameOver) {
                letter = currentGuess[colIndex] || '';
                if (!guess) {
                  state = letter ? 'current' : 'empty';
                }
              } else {
                letter = guess?.[colIndex] || '';
              }

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
        );
      })}
    </section>
  );
}

export default GameBoard;
