"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

interface ThemeToggleProps {
    /** Additional CSS classes */
    className?: string;
    /** Size variant */
    size?: "sm" | "md" | "lg";
    /** Show labels */
    showLabel?: boolean;
}

// ============================================================================
// Component
// ============================================================================

/**
 * Theme toggle switch for dark/light mode
 * Uses next-themes for SSR-safe theme management
 */
export function ThemeToggle({
    className,
    size = "md",
    showLabel = false,
}: ThemeToggleProps) {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch by only rendering after mount
    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }, [resolvedTheme, setTheme]);

    const isDark = resolvedTheme === "dark";

    // Size configurations
    const sizeConfig = {
        sm: {
            track: "h-6 w-11",
            thumb: "h-4 w-4",
            translate: "translate-x-5",
            icon: "h-3 w-3",
        },
        md: {
            track: "h-7 w-13",
            thumb: "h-5 w-5",
            translate: "translate-x-6",
            icon: "h-3.5 w-3.5",
        },
        lg: {
            track: "h-8 w-15",
            thumb: "h-6 w-6",
            translate: "translate-x-7",
            icon: "h-4 w-4",
        },
    };

    const config = sizeConfig[size];

    // Show placeholder during SSR to prevent layout shift
    if (!mounted) {
        return (
            <div
                className={cn(
                    "flex items-center gap-2",
                    className
                )}
                aria-hidden="true"
            >
                <div
                    className={cn(
                        config.track,
                        "rounded-full bg-input animate-pulse"
                    )}
                />
            </div>
        );
    }

    return (
        <div className={cn("flex items-center gap-2", className)}>
            {showLabel && (
                <span className="text-sm text-muted-foreground hidden sm:inline">
                    {isDark ? "Dark" : "Light"}
                </span>
            )}

            <button
                type="button"
                role="switch"
                aria-checked={isDark}
                aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                onClick={toggleTheme}
                className={cn(
                    // Base styles
                    "relative inline-flex shrink-0 cursor-pointer items-center rounded-full",
                    "border-2 border-transparent transition-colors duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    // Track size
                    config.track,
                    // Track colors
                    isDark
                        ? "bg-primary"
                        : "bg-input"
                )}
            >
                {/* Sliding thumb */}
                <span
                    className={cn(
                        // Base styles
                        "pointer-events-none inline-flex items-center justify-center rounded-full",
                        "bg-background shadow-lg ring-0 transition-transform duration-300",
                        // Thumb size
                        config.thumb,
                        // Position
                        isDark ? config.translate : "translate-x-1"
                    )}
                >
                    {/* Icon */}
                    {isDark ? (
                        <Moon
                            className={cn(
                                config.icon,
                                "text-primary transition-all duration-300"
                            )}
                        />
                    ) : (
                        <Sun
                            className={cn(
                                config.icon,
                                "text-amber-500 transition-all duration-300"
                            )}
                        />
                    )}
                </span>

                {/* Screen reader text */}
                <span className="sr-only">
                    {isDark ? "Switch to light mode" : "Switch to dark mode"}
                </span>
            </button>
        </div>
    );
}

export default ThemeToggle;
