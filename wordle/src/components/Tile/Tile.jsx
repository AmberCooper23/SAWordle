import './Tile.css';

export function Tile({ letter, state, wordLength }) {
  let sizeClass;

  if (wordLength === 3) {
    sizeClass = 'tileXLarge';   
  } else if (wordLength === 4) {
    sizeClass = 'tileLarge';    
  } else if (wordLength <= 5) {
    sizeClass = 'tileMedium';   
  } else if (wordLength <= 7) {
    sizeClass = 'tileSmall';   
  } else {
    sizeClass = 'tileTiny';     
  }

  const stateClass = `tile${state.charAt(0).toUpperCase()}${state.slice(1)}`;

  return (
    <output className={`tile ${sizeClass} ${stateClass}`}>
      {letter}
    </output>
  );
}

export default Tile;
