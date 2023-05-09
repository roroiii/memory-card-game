import { useState, useEffect, useCallback } from 'react';
import useTimer from './useTimer';
import useHistory from './useHistory';

function generateCards() {
  const cardContents = [...Array(8).keys()].concat([...Array(8).keys()]); // 產生一組0到7的數字，然後將其複製並合併
  const shuffledCards = cardContents.sort(() => Math.random() - 0.5); // 隨機洗牌排列卡片

  return shuffledCards.map((content, index) => {
    return { id: index, content };
  });
}

export default function useGame() {
  const { timeElapsed, handleStartTimer, handleEndTimer, handleCleanTimer } = useTimer();
  const { gameHistory, handleAddHistory } = useHistory();
  const [cards, setCards] = useState(generateCards());
  const [openCards, setOpenCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const [player, setPlayer] = useState('');

  const handlePlayerNameChange = (e) => {
    setPlayer(e.target.value);
  };

  const handleClickResetGame = () => {
    setShowCongrats(false);
    setOpenCards([]);
    setMatchedCards([]);
    handleEndTimer();
    handleCleanTimer();
    setPlayer('');
    setTimeout(() => {
      setCards(generateCards());
    }, 500);
  };

  const handleClickOpen = (index) => {
    if (openCards.length < 2 && !matchedCards.includes(index) && !openCards.includes(index)) {
      setOpenCards((prev) => [...prev, index]);

      if (openCards.length === 0 && matchedCards.length === 0 && timeElapsed === 0) {
        handleStartTimer();
      }
    }
  };

  const handleCheckMatchingCards = useCallback(
    (openCards) => {
      const [firstCard, secondCard] = openCards;
      if (cards[firstCard].content === cards[secondCard].content) {
        setMatchedCards((prev) => [...prev, ...openCards]); // setMatchedCards((prev) => prev.concat(index))
        setOpenCards([]);
      } else {
        setTimeout(() => {
          setOpenCards([]);
        }, 500);
      }
    },
    [cards]
  );

  useEffect(() => {
    if (openCards.length === 2) {
      handleCheckMatchingCards(openCards);
    }
  }, [handleCheckMatchingCards, openCards]);

  useEffect(() => {
    if (matchedCards.length === 16) {
      setShowCongrats(true); // 完成遊戲
      handleEndTimer();
      handleAddHistory(player, Math.floor(timeElapsed / 1000)); // 新增歷史紀錄
    }
  }, [matchedCards, setShowCongrats, handleAddHistory, handleEndTimer, player, timeElapsed]);

  return {
    cards,
    openCards,
    matchedCards,
    showCongrats,

    timeElapsed,
    gameHistory,
    player,
    handlePlayerNameChange,
    handleClickResetGame,
    handleClickOpen,
  };
}
