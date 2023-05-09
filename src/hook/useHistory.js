import { useState, useEffect, useCallback } from 'react';

export default function useHistory() {
  const [gameHistory, setGameHistory] = useState(() => {
    const storedHistory = localStorage.getItem('gameHistory');
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  const handleAddHistory = useCallback((player, timer) => {
    const newRecord = { player, time: timer }; // 新增這一行
    setGameHistory((prev) => {
      const updatedHistory = [...prev, newRecord];
      localStorage.setItem('gameHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  }, []);

  useEffect(() => {
    const storedHistory = localStorage.getItem('gameHistory');
    if (storedHistory) {
      setGameHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    if (gameHistory.length > 0) {
      localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
    }
  }, [gameHistory]);

  return {
    gameHistory,
    handleAddHistory,
  };
}
