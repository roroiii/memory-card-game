import React, { useState, useEffect, useCallback } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import './App.css';

const MemoryCardGame = () => {
  const [cards, setCards] = useState(generateCards());
  const [openCards, setOpenCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);

  function generateCards() {
    const cardContents = [...Array(8).keys()].concat([...Array(8).keys()]); // 產生一組0到7的數字，然後將其複製並合併
    const shuffledCards = cardContents.sort(() => Math.random() - 0.5); // 隨機洗牌排列卡片

    return shuffledCards.map((content, index) => {
      return { id: index, content };
    });
  }

  const handleClickResetGame = () => {
    setShowCongrats(false);
    setOpenCards([]);
    setMatchedCards([]);
    setTimeout(() => {
      setCards(generateCards());
    }, 500);
  };

  const handleClickOpen = (index) => {
    if (openCards.length < 2 && !matchedCards.includes(index) && !openCards.includes(index)) {
      setOpenCards((prev) => [...prev, index]);
    }
  };

  const handleCheckMatchingCards = useCallback(
    (openCards) => {
      if (openCards.length === 2) {
        const [firstCard, secondCard] = openCards;
        if (cards[firstCard].content === cards[secondCard].content) {
          setMatchedCards((prev) => [...prev, ...openCards]); // setMatchedCards((prev) => prev.concat(index))
          setShowCongrats(true);
        } else {
          setTimeout(() => {
            setOpenCards([]);
          }, 500);
        }
      }
    },
    [openCards, cards]
  );

  useEffect(() => {
    handleCheckMatchingCards(openCards);
  }, [handleCheckMatchingCards, openCards]);

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
        <div className="congrats">
          恭喜！卡片匹配成功！<button onClick={handleClickResetGame}>再玩一局</button>
        </div>
      )}
    </>
  );
};

export default MemoryCardGame;
