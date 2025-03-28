import { useState, useEffect } from "react";

const CountdownTimer = ({ endTime }: { endTime: string }) => {
  const [timeLeft, setTimeLeft] = useState(new Date(endTime).getTime() - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(new Date(endTime).getTime() - Date.now());
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [endTime]);

  if (timeLeft <= 0) {
    return <span>Expired</span>;
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms / 1000 / 60 / 60) % 24);
    const days = Math.floor(ms / 1000 / 60 / 60 / 24);

    return `${days > 0 ? days + 'd' : ''} ${hours > 0 ? hours + 'h' : ''} ${minutes > 0 ? minutes + 'm' : ''}  ${seconds}s`;
  };

  return <span className="text-[#97222D]">{formatTime(timeLeft)}</span>;
};

export default CountdownTimer;
