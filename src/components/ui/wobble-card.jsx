import React, { useState } from "react";
import { motion } from "framer-motion";

export const WobbleCard = ({
  children,
  containerStyle,
  className = "",
  style = {}
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };

  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
          : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease-out",
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
        ...containerStyle,
      }}
      className={className}
    >
      <div
        style={{
          transform: isHovering
            ? `translate3d(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px, 0) scale3d(1.03, 1.03, 1)`
            : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
          transition: "transform 0.1s ease-out",
          height: "100%",
          width: "100%",
          padding: "32px",
          ...style
        }}
      >
        {children}
      </div>
    </motion.section>
  );
};
