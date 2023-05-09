import React from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import Celebration from './component/Celebration';
import './css/App.css';
import useGame from './hook/useGame';
import HistoryScore from './component/HistoryScore';

export default function MemoryCardGame() {
  const {
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
  } = useGame();

  return (
    <div className="memory-box">
      <div className="game-title-box">
        <h1 className="game-title">Memory Card Game</h1>
        <div className="game-info">遊戲說明：按下卡牌後遊戲計時開始，中間無法暫停直至遊戲結束。</div>
      </div>
      {/* 輸入玩家名稱的區塊 */}
      <div className="player-name-input">
        <label htmlFor="player-name">輸入比賽名稱：</label>
        <input type="text" id="player-name" placeholder="神秘人" value={player} onChange={handlePlayerNameChange} />
      </div>

      <div className={`${showCongrats ? '' : 'game-time-box'}`}>
        {showCongrats ? (
          <div className="game-time">總共花了 {Math.floor(timeElapsed / 1000)} 秒完成遊戲</div>
        ) : (
          <>{timeElapsed !== 0 && <div className="game-time">遊戲已經經過了{Math.floor(timeElapsed / 1000)} 秒</div>}</>
        )}
      </div>
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
    </div>
  );
}
