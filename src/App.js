import React, { useEffect } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import Celebration from './component/Celebration';
import './css/App.css';
import useGame from './hook/useGame';

const MemoryCardGame = () => {
  const {
    cards,
    openCards,
    matchedCards,
    showCongrats,
    setShowCongrats,

    handleClickResetGame,
    handleClickOpen,
    handleCheckMatchingCards,
  } = useGame();

  useEffect(() => {
    if (openCards.length === 2) {
      handleCheckMatchingCards(openCards);
    }
  }, [handleCheckMatchingCards, openCards]);

  useEffect(() => {
    if (matchedCards.length === 16) {
      setShowCongrats(true); // 完成遊戲
    }
  }, [matchedCards, setShowCongrats]);

  return (
    <>
      <Flipper flipKey={openCards} className="memory-card-game">
        {cards.map((card, index) => (
          <Flipped key={card.id} flipId={card.id}>
            <div
              className={`card ${openCards.includes(index) || matchedCards.includes(index) ? 'flipped' : ''}`}
              onClick={() => handleClickOpen(index)}
            >
              <div className="card-face front" />
              <div className="card-face back">{card.content}</div>
            </div>
          </Flipped>
        ))}
      </Flipper>

      {showCongrats && (
        <>
          <Celebration />
          <div className="congrats">
            Congratulations！<button onClick={handleClickResetGame}>play again</button>
          </div>
        </>
      )}
    </>
  );
};

export default MemoryCardGame;
