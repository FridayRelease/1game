import { useEffect, useState } from 'react'

const useTimer = (seconds: number) => {
  const [timer, setTimer] = useState(seconds);
  const [isActive, setIsActive] = useState(false);

  const handleStart = () => {
    setIsActive(true)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (isActive) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  return {
    timer,
    isActive,
    hasShowTimer: seconds !== timer,
    handleStart
  }
}

export default useTimer;
