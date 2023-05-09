import React from 'react';
import '../css/History.css';

export default function HistoryScore({ history }) {
  const sortedHistory = history.sort((a, b) => a.time - b.time);

  return (
    <div className="history-board">
      <h2>比賽結果</h2>
      <ul>
        {sortedHistory.map((record, index) => (
          <div key={index}>
            {index === 0 && (
              <div className="first">
                <div>第{index + 1}名</div>
                <div>{record.time} 秒</div>
              </div>
            )}

            {index < 3 ? (
              <li className="li">
                <p className="li-num">{index + 1}</p>
                <div className="li-name">
                  <p>{record.player ? record.player : '神秘人'}</p> <p>{record.time} 秒</p>
                </div>
              </li>
            ) : (
              <></>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}
