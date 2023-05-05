import React, { useEffect } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import Celebration from './component/Celebration';
import './css/App.css';
import useGame from './hook/useGame';
import usePlayer from './hook/usePlayer';
import useTimer from './hook/useTimer';
import useHistory from './hook/useHistory';
import HistoryScore from './component/HistoryScore';

export default function MemoryCardGame() {
  const {
    cards,
    openCards,
    matchedCards,
    showCongrats,
    setShowCongrats,
    timeElapsed,
    gameHistory,
    player,
    handlePlayerNameChange,
    handleClickResetGame,
    handleClickOpen,
    handleCheckMatchingCards,
  } = useGame();

  return (
    <>
      {/* 輸入玩家名稱的區塊 */}
      <div className="player-name-input">
        <label htmlFor="player-name">玩家名稱：</label>
        <input type="text" id="player-name" value={player} onChange={handlePlayerNameChange} />
      </div>

      {showCongrats ? (
        <div>總過花了 {Math.floor(timeElapsed / 1000)} 秒完成遊戲</div>
      ) : (
        <>{timeElapsed !== 0 && <div>遊戲已經經過了{Math.floor(timeElapsed / 1000)} 秒</div>}</>
      )}
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
      <HistoryScore history={gameHistory} />
    </>
  );
}
