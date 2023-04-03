import React, { useState, useEffect, useRef } from "react";

function HoldAndPressButton({ isBtnParamFull, onSubmit }) {
  const [isHeldDown, setIsHeldDown] = useState(false);
  const [isFullyPressed, setIsFullyPressed] = useState(false);
  const [transitionTime, setTransitionTime] = useState(0);

  const timer = useRef();

  useEffect(() => {
    if (isHeldDown) {
      const startTime = new Date().getTime();

      timer.current = setInterval(() => {
        const elapsed = new Date().getTime() - startTime;

        if (elapsed >= 3000) {
          clearInterval(timer.current);
          setIsFullyPressed(true);
          setTransitionTime(0);
        } else {
          const progress = (elapsed / 3000) * 100;

          setTransitionTime(progress);
        }
      }, 10);
    } else {
      clearInterval(timer.current);
      setIsFullyPressed(false);
      setTransitionTime(0);
    }
  }, [isHeldDown]);

  const handleMouseDown = () => {
    setIsHeldDown(true);
    setTransitionTime(0);
  };

  const handleMouseUp = () => {
    setIsHeldDown(false);
    if (transitionTime < 3000) {
      setTransitionTime(0);
    }
  };

  const handleClick = () => {
    if (isFullyPressed && isBtnParamFull) {
      onSubmit();
    }
  };

  const buttonStyle = {
    background: `linear-gradient(to right, rgb(249 200 46) ${transitionTime}%, transparent 0%)`,
    border: "solid red 1px",
    transition: "background 0.05s linear",
    padding: "10px 20px",
    margin: "10px",
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      style={buttonStyle}
    >
      Press and Hold to Say “ Bye Bye “ to your Money !
    </button>
  );
}

export default HoldAndPressButton;