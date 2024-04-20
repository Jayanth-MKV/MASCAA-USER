"use client"
import { useEffect, useState } from 'react';

const CountdownTimer = ({ startTime, endTime }: any) => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime:any = new Date();
      const targetTime:any = new Date(endTime);
      const difference = targetTime - currentTime;

      if (difference > 0) {
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div>
      <p>Time Left:</p>
      <p className='font-bold text-red-600'>{`${timeLeft.minutes} minutes ${timeLeft.seconds} seconds`}</p>
    </div>
  );
};

export default CountdownTimer;
