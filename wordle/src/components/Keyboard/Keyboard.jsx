import './Keyboard.css';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
];

export function Keyboard({ keyboardState, onKeyClick, gameOver }) {
  const getKeyClass = (letter) => {
    const state = keyboardState[letter];
    const isSpecial = letter === 'ENTER' || letter === 'BACK';

    const classes = ['keyboardKey'];

    if (isSpecial) {
      classes.push('keyboardKeySpecial');
    }

    switch (state) {
      case 'correct':
        classes.push('keyboardKeyCorrect');
        break;
      case 'present':
        classes.push('keyboardKeyPresent');
        break;
      case 'absent':
        classes.push('keyboardKeyAbsent');
        break;
      default:
        classes.push('keyboardKeyUnused');
    }

    return classes.join(' ');
  };

  return (
    <nav className="keyboard" aria-label="On-screen keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <menu key={rowIndex} className="keyboardRow">
          {row.map(key => (
            <button
              key={key}
              onClick={() => onKeyClick(key)}
              className={getKeyClass(key)}
              disabled={gameOver}
            >
              {key === 'BACK' ? '⌫' : key}
            </button>
          ))}
        </menu>
      ))}
    </nav>
  );
}
