import React, { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(11, 11, 13)",
  gradientBackgroundEnd = "rgb(20, 20, 25)",
  firstColor = "50, 60, 80",
  secondColor = "40, 35, 45",
  thirdColor = "60, 65, 75",
  fourthColor = "35, 30, 40",
  fifthColor = "45, 50, 60",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className = "",
  interactive = true,
  containerClassName = "",
}) => {
  const interactiveRef = useRef(null);
  const tgXRef = useRef(0);
  const tgYRef = useRef(0);
  const curXRef = useRef(0);
  const curYRef = useRef(0);

  useEffect(() => {
    document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart);
    document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, [
    gradientBackgroundStart,
    gradientBackgroundEnd,
    firstColor,
    secondColor,
    thirdColor,
    fourthColor,
    fifthColor,
    pointerColor,
    size,
    blendingValue,
  ]);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (event) => {
      tgXRef.current = event.clientX;
      tgYRef.current = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId;
    
    const move = () => {
      if (!interactiveRef.current) return;
      
      curXRef.current = curXRef.current + (tgXRef.current - curXRef.current) / 20;
      curYRef.current = curYRef.current + (tgYRef.current - curYRef.current) / 20;
      
      interactiveRef.current.style.transform = `translate(${Math.round(curXRef.current)}px, ${Math.round(curYRef.current)}px)`;
      animationFrameId = requestAnimationFrame(move);
    };

    move();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive]);

  return (
    <div
      className={`bga-container ${containerClassName}`}
    >
      <svg className="bga-svg">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="bga-gradients-container">
        <div className="bga-first"></div>
        <div className="bga-second"></div>
        <div className="bga-third"></div>
        <div className="bga-fourth"></div>
        <div className="bga-fifth"></div>
        {interactive && <div ref={interactiveRef} className="bga-interactive"></div>}
      </div>
      <div className={`bga-content ${className}`}>
        {children}
      </div>
    </div>
  );
};
