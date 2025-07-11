import React, { useEffect, useState } from "react";

const directions = ["left", "right", "top", "bottom"];

const PeekCharacter = () => {
  const [position, setPosition] = useState({ top: "50%", left: "-150px" });
  const [direction, setDirection] = useState("left");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDir = directions[Math.floor(Math.random() * directions.length)];
      const newPos = getRandomPosition(newDir);

      setDirection(newDir);
      setPosition(newPos);
      setVisible(true);

      // بعد از چند ثانیه مخفی شه
      setTimeout(() => setVisible(false), 2000);
    }, 6000); // هر ۶ ثانیه

    return () => clearInterval(interval);
  }, []);

  const getRandomPosition = (dir) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const topRand = Math.random() * (vh - 120);
    const leftRand = Math.random() * (vw - 120);

    switch (dir) {
      case "left":
        return { top: `${topRand}px`, left: `-120px` };
      case "right":
        return { top: `${topRand}px`, left: `${vw}px` };
      case "top":
        return { top: `-120px`, left: `${leftRand}px` };
      case "bottom":
        return { top: `${vh}px`, left: `${leftRand}px` };
      default:
        return { top: "50%", left: "-120px" };
    }
  };

  return (
    <img
      src="/404/404.png"
      alt="peek character"
      className={`peeker ${visible ? "show" : ""} ${direction}`}
      style={position}
    />
  );
};

export default PeekCharacter;
