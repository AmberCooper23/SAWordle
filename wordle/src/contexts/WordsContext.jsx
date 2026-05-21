import { createContext, useContext } from 'react';

const WORDS = [
  //3 letters
  'KAK', 'NEH', 'BRU',
  // 4 letters
  'EINA', 'AWEH', 'LANK', 'BOET', 'NAAI', 'EISH', 'SKEL', 'GAAN', 'DOOS', 'BOER', 'WOZA', 'HADE', 'FEDE', 'AOWA', 'BLOM', 'BAAS',
  'POES',
  // 5 letters
  'SHARP', 'CHINA', 'ROBOT', 'BRAAI', 'BUNNY', 'HAIBO', 'KWAAI',
  'DWAAL', 'VLOEK', 'SLANG', 'SKRIK', 'STOEP', 'SMAAK', 'TJANK', 'SFEBE',
  'YSTER', 'MOERS', 'BAKKE', 'HAIBO', 'BALIE', 'LEKKE', 'CHANA', 'HOWZA', 'PHARA',
   'JIRRE',
  // 6 letters
  'LEKKER', 'BAKGAT', 'KWAITO', 'INDABA', 'PADKOS', 'POTJIE', 'MALUME', 'CHOMZA',
  'GOGGAS', 'NYAOPE', 'BOYTJIE', 'TANNIE', 'GATVOL', 'BAFAZI', 'STUKKIE', 'BUNDUS',
  // 7 letters
  'VOETSEK', 'BLIKSEM', 'CHOMMIE', 'TEKKIES', 'NAARTJE', 'HOWZITS',
  // 8 letters
  'JISLAAIK', 'CHERRIES', 'ZAMALEK', 'POESKLAP'
];

const WordsContext = createContext(undefined);

export function WordsProvider({ children }) {
  const getDailyWord = () => {
    const today = new Date();
    const startDate = new Date('2024-01-01');
    const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const wordIndex = daysSinceStart % WORDS.length;
    return WORDS[wordIndex];
  };

  return (
    <WordsContext.Provider value={{ words: WORDS, getDailyWord }}>
      {children}
    </WordsContext.Provider>
  );
}

export function useWords() {
  const context = useContext(WordsContext);
  if (!context) {
    throw new Error('useWords must be used within a WordsProvider');
  }
  return context;
}