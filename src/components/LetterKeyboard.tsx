import React from 'react';

interface LetterKeyboardProps {
  letter: string;
  onClick: () => void;
  isGuessed: boolean;
  isWrong: boolean;
  disabled: boolean;
}

export default function LetterKeyboard({
  letter,
  onClick,
  isGuessed,
  isWrong,
  disabled
}: LetterKeyboardProps) {
  return (
    <button 
      onClick={onClick} 
      className={`letter-keyboard-component ${isGuessed ? 'guessed' : ''} ${isWrong ? 'wrong' : ''}`}
      disabled={disabled}
    >
      {letter}
    </button>
  );
}

