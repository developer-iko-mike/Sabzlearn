import { useEffect, useState } from "react";

const useCounter = (targetValue, intervalDuration = 5) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      if (counter < targetValue) {
        setCounter((prev) => prev + 1);
      }
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [counter, targetValue, intervalDuration]);

  return counter;
};

export default useCounter;