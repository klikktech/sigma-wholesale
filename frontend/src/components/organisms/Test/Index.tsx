"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type Props = {
    elements: React.ReactNode[];
};

const Carousel = ({ elements }: Props) => {
    const [active, setActive] = useState(0);
    const [animationEnabled, setAnimationEnabled] = useState(true);
    const totalElements = elements.length;

    const handleNext = () => {
        if (active < totalElements - 1) {
            setActive((prev) => prev + 1);
        } else {
            setActive(0);
        }
        setAnimationEnabled(false);
    };

    const handlePrev = () => {
        if (active === 0) {
            setActive(totalElements - 1);
        } else {
            setActive((prev) => prev - 1);
        }
        setAnimationEnabled(false);
    };

    //   const handlePrevClick = () => {
    //     setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    //     setAnimationEnabled(false);
    //   };

    //   const handleNextClick = () => {
    //     setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    //     setAnimationEnabled(false);
    //   };

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (animationEnabled) {
                setActive((prevIndex) => (prevIndex + 1) % elements.length);
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, [animationEnabled]);


    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center">
                <motion.div
                    animate={{ x: -active * 100 + '%' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    <div className="flex justify-center items-center">
                        <span className="material-symbols-rounded" onClick={handlePrev}>
                            chevron_left
                        </span>
                        {elements.map((element, index) => (
                            <>
                                {active === index && (
                                    <div
                                        key={`carousel-${index}`}
                                        className={`carousel-content items-center flex h-200`}
                                    >
                                        {element}
                                    </div>
                                )}
                            </>
                        ))}
                        <span className="material-symbols-rounded" onClick={handleNext}>
                            chevron_right
                        </span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Carousel;