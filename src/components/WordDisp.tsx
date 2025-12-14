import React from 'react';

interface WordDispProps {
  word: string;
  guessedLetters: Set<string>;
}

export default function WordDisp({ word, guessedLetters }: WordDispProps) {
  return (
    <div id="Word-component" className="word-display">
      <div className="word">
        {word.split('').map((letter, index) => (
          <span key={index} className="letter-box">
            {guessedLetters.has(letter) ? letter : '_'}
          </span>
        ))}
      </div>
    </div>
  );
}
