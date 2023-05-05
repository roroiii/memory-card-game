import React from 'react';

export default function HistoryScore({ history }) {
  const sortedHistory = history.sort((a, b) => a.time - b.time);

  return (
    <div className="history-board">
      <h2>計分板</h2>
      <ul>
        {sortedHistory.map((record, index) => (
          <li key={index}>
            {record.player}: {record.time} 秒
          </li>
        ))}
      </ul>
    </div>
  );
}
