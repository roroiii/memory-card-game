import { useState, useRef, useCallback, useEffect } from 'react';

export default function useTimer() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  // 開始計時
  const handleStartTimer = useCallback(() => {
    startTimeRef.current = new Date();
    setTimerRunning(true);
  }, []);

  // 結束計時
  const handleEndTimer = useCallback(() => {
    if (startTimeRef.current) {
      setTimerRunning(false);
    } else {
      console.warn('請先開始計時');
    }
  }, []);

  // 清除時間
  const handleCleanTimer = () => {
    setTimeElapsed(0);
    setTimerRunning(false);
  };

  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed(new Date() - startTimeRef.current);
      }, 1000); // 更新時間間隔，這裡設定為1秒
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [timerRunning]);

  return { timeElapsed, handleStartTimer, handleEndTimer, handleCleanTimer };
}
