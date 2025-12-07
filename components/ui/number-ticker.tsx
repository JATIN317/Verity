'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';

interface NumberTickerProps {
    /** Target value to animate to */
    value: number;
    /** Number of decimal places */
    decimalPlaces?: number;
    /** Animation direction */
    direction?: 'up' | 'down';
    /** Spring stiffness */
    stiffness?: number;
    /** Spring damping */
    damping?: number;
    /** Additional className */
    className?: string;
    /** Delay before animation starts (ms) */
    delay?: number;
    /** Prefix (e.g., '$') */
    prefix?: string;
    /** Suffix (e.g., '%', '+') */
    suffix?: string;
}

/**
 * Animated number counter component that smoothly transitions to target value
 */
export function NumberTicker({
    value,
    decimalPlaces = 0,
    direction = 'up',
    stiffness = 100,
    damping = 30,
    className,
    delay = 0,
    prefix = '',
    suffix = '',
}: NumberTickerProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [hasStarted, setHasStarted] = useState(false);

    const motionValue = useMotionValue(direction === 'down' ? value : 0);
    const springValue = useSpring(motionValue, {
        stiffness,
        damping,
    });

    const [displayValue, setDisplayValue] = useState(
        direction === 'down' ? value : 0
    );

    // Start animation after delay when in view
    useEffect(() => {
        if (!isInView) return;

        const timeout = setTimeout(() => {
            setHasStarted(true);
        }, delay);

        return () => clearTimeout(timeout);
    }, [isInView, delay]);

    // Animate to target value
    useEffect(() => {
        if (!hasStarted) return;
        motionValue.set(direction === 'down' ? 0 : value);
    }, [hasStarted, motionValue, direction, value]);

    // Update display value when spring changes
    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            setDisplayValue(latest);
        });
        return unsubscribe;
    }, [springValue]);

    const formattedValue = Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    }).format(displayValue);

    return (
        <span
            ref={ref}
            className={cn(
                'tabular-nums tracking-tight',
                className
            )}
        >
            {prefix}
            {formattedValue}
            {suffix}
        </span>
    );
}

export default NumberTicker;
