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
      return { id: index, content, isFlipped: false };
    });
  }

  function handleClickResetGame() {
    setShowCongrats(false);
    setOpenCards([]);
    setMatchedCards([]);
    setMatchedCards([]);
    setTimeout(() => {
      setCards(generateCards());
    }, 500);
  }

  function handleClickOpen(index) {
    if (openCards.length < 2 && !matchedCards.includes(index)) {
      setOpenCards((prev) => [...prev, index]);
    }
  }

  const checkMatchingCards = useCallback(
    (openCards) => {
      const [firstCard, secondCard] = openCards;
      if (cards[firstCard].content === cards[secondCard].content) {
        setMatchedCards((prev) => [...prev, ...openCards]); // setMatchedCards((prev) => prev.concat(index))
      } else {
        setTimeout(() => {
          setOpenCards([]);
        }, 1000);
      }
    },
    [cards]
  );

  useEffect(() => {
    if (openCards.length === 2) {
      checkMatchingCards(openCards);
    }
  }, [openCards, checkMatchingCards]);

  useEffect(() => {
    if (openCards.length === 2) {
      const [firstCard, secondCard] = openCards;
      if (cards[firstCard].content === cards[secondCard].content) {
        setMatchedCards((prev) => [...prev, ...openCards]);
        setShowCongrats(true); // Add this line
      } else {
        setTimeout(() => {
          setOpenCards([]);
        }, 1000);
      }
    }
  }, [openCards, cards]);

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
