"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, wrap } from "framer-motion";
// import "./style.css"

type Props = {
  elements: React.ReactNode[];
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? "-100%" : "100%",
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Carousel = ({ elements }: Props) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, elements.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPage([page + 1, 1]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [page]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center carousel-container">
        <span
          className="material-symbols-rounded prev"
          style={{ zIndex: 2 }}
          onClick={() => paginate(-1)}
        >
          chevron_left
        </span>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            //   transition={{ duration: 0.5 }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <div className={`carousel-content items-center flex h-200`}>
              {elements[imageIndex]}
            </div>
          </motion.div>
        </AnimatePresence>
        <span
          className="material-symbols-rounded next"
          style={{ zIndex: 2 }}
          onClick={() => paginate(1)}
        >
          chevron_right
        </span>
      </div>
    </div>
  );
};

export default Carousel;
