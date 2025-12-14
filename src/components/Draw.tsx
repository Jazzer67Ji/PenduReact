import React from 'react';

interface DrawProps {
  wrongCount: number;
}

export default function Draw({ wrongCount }: DrawProps) {
  // SVG du pendu avec différents états
  const drawParts = [
    // 1. La tête
    <circle key="head" cx="150" cy="80" r="20" stroke="black" strokeWidth="2" fill="none" />,
    // 2. Le corps
    <line key="body" x1="150" y1="100" x2="150" y2="140" stroke="black" strokeWidth="2" />,
    // 3. Bras gauche
    <line key="left-arm" x1="150" y1="110" x2="120" y2="100" stroke="black" strokeWidth="2" />,
    // 4. Bras droit
    <line key="right-arm" x1="150" y1="110" x2="180" y2="100" stroke="black" strokeWidth="2" />,
    // 5. Jambe gauche
    <line key="left-leg" x1="150" y1="140" x2="120" y2="170" stroke="black" strokeWidth="2" />,
    // 6. Jambe droite
    <line key="right-leg" x1="150" y1="140" x2="180" y2="170" stroke="black" strokeWidth="2" />,
  ];

  return (
    <div id="draw-component" className="draw-section">
      <svg width="200" height="250" viewBox="0 0 200 250">
        {/* Potence */}
        <line x1="10" y1="20" x2="10" y2="230" stroke="black" strokeWidth="4" />
        <line x1="10" y1="20" x2="130" y2="20" stroke="black" strokeWidth="4" />
        <line x1="130" y1="20" x2="130" y2="50" stroke="black" strokeWidth="2" />
        
        {/* Corde */}
        <line x1="130" y1="50" x2="150" y2="60" stroke="black" strokeWidth="1" />

        {/* Plateau */}
        <line x1="10" y1="230" x2="50" y2="230" stroke="black" strokeWidth="4" />

        {/* Corps du pendu - affichés selon le nombre d'erreurs */}
        {wrongCount >= 1 && drawParts[0]}
        {wrongCount >= 2 && drawParts[1]}
        {wrongCount >= 3 && drawParts[2]}
        {wrongCount >= 4 && drawParts[3]}
        {wrongCount >= 5 && drawParts[4]}
        {wrongCount >= 6 && drawParts[5]}
      </svg>
      
      <div className="draw-info">
        <p className="wrong-count">Tentatives perdues: <strong>{wrongCount} / 6</strong></p>
        {wrongCount === 6 && <p className="game-over">Jeu terminé!</p>}
      </div>
    </div>
  );
}
