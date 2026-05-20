import { useState, useEffect } from 'react';
import { useWords } from '../contexts/WordsContext';

export function useGameLogic() {
  const { getDailyWord } = useWords();
  const [targetWord, setTargetWord] = useState('');
  const [wordLength, setWordLength] = useState(5);
  const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [keyboardState, setKeyboardState] = useState({});

  useEffect(() => {
    const word = getDailyWord();
    setTargetWord(word);
    setWordLength(word.length);
  }, [getDailyWord]);

  const handleLetter = (letter) => {
    if (currentGuess.length < wordLength && !gameOver) {
      setCurrentGuess(prev => prev + letter);
    }
  };

  const handleBackspace = () => {
    setCurrentGuess(prev => prev.slice(0, -1));
  };

  const updateKeyboardState = (guess) => {
    const newState = { ...keyboardState };

    guess.split('').forEach((letter, i) => {
      if (targetWord[i] === letter) {
        newState[letter] = 'correct';
      } else if (targetWord.includes(letter) && newState[letter] !== 'correct') {
        newState[letter] = 'present';
      } else if (!targetWord.includes(letter)) {
        newState[letter] = 'absent';
      }
    });

    setKeyboardState(newState);
  };

  const handleEnter = () => {
    if (currentGuess.length !== wordLength || gameOver) return;

    const newGuesses = [...guesses];
    newGuesses[currentRow] = currentGuess;
    setGuesses(newGuesses);

    updateKeyboardState(currentGuess);

    if (currentGuess === targetWord) {
      setGameOver(true);
      setWon(true);
    } else if (currentRow === 5) {
      setGameOver(true);
      setWon(false);
    } else {
      setCurrentRow(prev => prev + 1);
      setCurrentGuess('');
    }
  };

  const handleKeyClick = (key) => {
    if (key === 'ENTER') {
      handleEnter();
    } else if (key === 'BACK') {
      handleBackspace();
    } else {
      handleLetter(key);
    }
  };

  const resetGame = () => {
    setGuesses(Array(6).fill(''));
    setCurrentGuess('');
    setCurrentRow(0);
    setGameOver(false);
    setWon(false);
    setKeyboardState({});
  };

  useEffect(() => {
    if (gameOver) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleEnter();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key.match(/^[a-zA-Z]$/) && currentGuess.length < wordLength) {
        handleLetter(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, currentRow, gameOver, targetWord, wordLength]);

  return {
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
  };
}
