import React, { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

const AnimatedCounter = ({ value, duration = 2 }) => {
    const nodeRef = useRef();

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        const controls = animate(0, value, {
            duration: duration,
            onUpdate: (value) => {
                node.textContent = Math.round(value).toLocaleString();
            },
            ease: "easeOut"
        });

        return () => controls.stop();
    }, [value, duration]);

    return <span ref={nodeRef} />;
};

export default AnimatedCounter;
