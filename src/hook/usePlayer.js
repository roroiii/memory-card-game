import { useState } from 'react';

export default function usePlayer() {
  const [player, setPlayer] = useState('');

  const handlePlayerNameChange = (e) => {
    setPlayer(e.target.value);
  };

  return {
    player,
    handlePlayerNameChange,
  };
}
