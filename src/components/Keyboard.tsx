import React from 'react';
import LetterKeyboard from './LetterKeyboard';

interface KeyboardProps {
  onLetterClick: (letter: string) => void;
  guessedLetters: Set<string>;
  wrongLetters: Set<string>;
  gameStatus: 'playing' | 'won' | 'lost';
}

export default function Keyboard({ 
  onLetterClick, 
  guessedLetters, 
  wrongLetters,
  gameStatus 
}: KeyboardProps) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  const letters = alphabet.map((letter) => {
    const isGuessed = guessedLetters.has(letter);
    const isWrong = wrongLetters.has(letter);
    
    return (
      <LetterKeyboard 
        key={letter} 
        letter={letter} 
        onClick={() => onLetterClick(letter)}
        isGuessed={isGuessed}
        isWrong={isWrong}
        disabled={isGuessed || isWrong || gameStatus !== 'playing'}
      />
    );
  });

  return (
    <div id="Keyboard-component" className="keyboard-section">
      <div className="letters-container">
        {letters}
      </div>
    </div>
  );
}
