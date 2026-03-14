"use client";

import { useState, useEffect } from "react";

interface ScrollPosition {
    x: number;
    y: number;
    direction: "up" | "down" | null;
    isAtTop: boolean;
}

export function useScrollPosition(threshold = 50): ScrollPosition {
    const [position, setPosition] = useState<ScrollPosition>({
        x: 0,
        y: 0,
        direction: null,
        isAtTop: true,
    });

    useEffect(() => {
        let lastY = 0;

        const handleScroll = () => {
            const currentY = window.scrollY;
            setPosition({
                x: window.scrollX,
                y: currentY,
                direction: currentY > lastY ? "down" : "up",
                isAtTop: currentY < threshold,
            });
            lastY = currentY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [threshold]);

    return position;
}
