import React, { useEffect, useState } from 'react';
import Draw from './Draw';
import Keyboard from './Keyboard';
import WordDisp from './WordDisp';
import wordsData from '../data/words.json';

export default function Game() {
  const [word, setWord] = useState<string>('');

  /** Set des lettres correctement devinées */
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());

  /** Set des lettres incorrectes (compteur d'erreurs) */
  const [wrongLetters, setWrongLetters] = useState<Set<string>>(new Set());

  /** État du jeu : 'playing' | 'won' | 'lost' */
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');


  useEffect(() => {
    // Charger les mots depuis le JSON
    const words: string[] = Array.isArray((wordsData as any).words)
      ? (wordsData as any).words
      : [];

    if (words.length === 0) return;

    // Choisir aléatoirement un mot et le mettre en majuscules
    const randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    setWord(randomWord);
  }, []); // [] = Exécuté UNE SEULE FOIS au montage du composant


  useEffect(() => {
    // Ne rien faire si le mot n'est pas encore chargé
    if (word === '') return;

    // Le joueur a gagné si TOUTES les lettres du mot sont trouvées
    const wordLetters = new Set(word.split(''));
    const allLettersGuessed = Array.from(wordLetters).every(letter => 
      guessedLetters.has(letter)
    );
    
    if (allLettersGuessed && guessedLetters.size > 0) {
      setGameStatus('won');
      console.log('🎉 Victoire !');
    }

    // Le joueur a perdu s'il a 6 erreurs
    if (wrongLetters.size >= 6) {
      setGameStatus('lost');
      console.log('😢 Défaite !');
    }

  }, [guessedLetters, wrongLetters, word]);


  const handleLetterClick = (letter: string) => {
    // Vérifications avant de traiter le clic
    
    // Le jeu doit être en cours
    if (gameStatus !== 'playing') return;
    
    // La lettre ne doit pas déjà être cliquée
    if (guessedLetters.has(letter) || wrongLetters.has(letter)) return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);

    // Vérifier si la lettre est dans le mot
    if (word.includes(letter)) {
      // Bonne lettre - ajouter à guessedLetters
      setGuessedLetters(newGuessedLetters);
      console.log(`✓ ${letter} - Correct!`);
    } else {
      // Mauvaise lettre - ajouter aussi à wrongLetters (erreur++)
      const newWrongLetters = new Set(wrongLetters);
      newWrongLetters.add(letter);
      setWrongLetters(newWrongLetters);
      setGuessedLetters(newGuessedLetters);
      console.log(`✗ ${letter} - Incorrect!`);
    }
  };



  const resetGame = () => {
    // Charger un nouveau mot
    const words: string[] = Array.isArray((wordsData as any).words)
      ? (wordsData as any).words
      : [];
    const randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    
    // Réinitialiser tous les états à zéro
    setWord(randomWord);
    setGuessedLetters(new Set());
    setWrongLetters(new Set());
    setGameStatus('playing');
    console.log('🔄 Nouvelle partie commencée');
  };


  return (
    <div id="game-component" className="game-container">
      {/* AFFICHAGE DU STATUT DE LA PARTIE */}
      <div className="game-status">
        {gameStatus === 'won' && (
          <div className="victory">
            <h2>Victoire !</h2>
            <p>Vous avez trouvé le mot: <strong>{word}</strong></p>
          </div>
        )}
        {gameStatus === 'lost' && (
          <div className="defeat">
            <h2>Défaite</h2>
            <p>Le mot était: <strong>{word}</strong></p>
            <p>Tentatives incorrectes: {wrongLetters.size} / 6</p>
          </div>
        )}
      </div>

      {/* AFFICHAGE DU DESSIN DU PENDU */}
      <Draw wrongCount={wrongLetters.size} />
      
      {/* INFORMATIONS UTILES */}
      <div className="game-info">
        <p>Erreurs: {wrongLetters.size} / 6</p>
        {wrongLetters.size > 0 && (
          <p>Lettres incorrectes: {Array.from(wrongLetters).join(', ')}</p>
        )}
      </div>

      {/* AFFICHAGE DU MOT AVEC LETTRES MASQUÉES */}
      <WordDisp 
        word={word} 
        guessedLetters={guessedLetters}
      />

      {/* CLAVIER AVEC LETTRES */}
      <Keyboard 
        onLetterClick={handleLetterClick}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        gameStatus={gameStatus}
      />

      {/* BOUTON RECOMMENCER */}
      {gameStatus !== 'playing' && (
        <button onClick={resetGame} className="restart-button">
          Nouvelle partie
        </button>
      )}
    </div>
  );
}
