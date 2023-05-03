import Confetti from 'react-confetti';

export default function Celebration() {
  const confettiOptions = {
    initialVelocityX: { min: -10, max: 10 }, // 設置水平方向的初速度範圍
    initialVelocityY: { min: 10, max: 10 }, // 設置垂直方向的初速度範圍，增大最小值和最大值以加快速度
    recycle: false,
  };

  return <Confetti {...confettiOptions} />;
}
