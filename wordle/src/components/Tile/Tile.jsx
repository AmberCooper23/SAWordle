import './Tile.css';

export function Tile({ letter, state, wordLength }) {
  const sizeClass = wordLength <= 5 ? 'tileLarge' : wordLength <= 7 ? 'tileMedium' : 'tileSmall';
  const stateClass = `tile${state.charAt(0).toUpperCase()}${state.slice(1)}`;

  return (
    <output className={`tile ${sizeClass} ${stateClass}`}>
      {letter}
    </output>
  );
}

export default Tile