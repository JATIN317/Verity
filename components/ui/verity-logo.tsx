import React from "react";
import { cn } from "@/lib/utils";

interface VerityLogoProps {
    className?: string;
    withText?: boolean;
}

export function VerityLogo({ className, withText = true }: VerityLogoProps) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                fill="none"
                className="h-8 w-8 shrink-0"
                aria-label="Verity Logo"
            >
                {/* Document Background */}
                <path
                    d="M25 10H65L80 25V90H25V10Z"
                    className="fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600"
                    strokeWidth="4"
                // strokeLinejoin="round"
                />
                <path
                    d="M65 10V25H80"
                    className="fill-slate-200 dark:fill-slate-700 stroke-slate-300 dark:stroke-slate-600"
                    strokeWidth="4"
                // strokeLinejoin="round"
                />
                {/* Document Lines */}
                <path
                    d="M35 30H60"
                    className="stroke-slate-300 dark:stroke-slate-600"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
                <path
                    d="M35 45H50"
                    className="stroke-slate-300 dark:stroke-slate-600"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                {/* Magnifying Glass (The lens) */}
                <circle
                    cx="55"
                    cy="60"
                    r="24"
                    className="fill-white dark:fill-slate-900 stroke-emerald-600 dark:stroke-emerald-500"
                    strokeWidth="6"
                />

                {/* Graph Line inside Lens */}
                <path
                    d="M38 68L48 58L55 65L72 48"
                    className="stroke-emerald-500 dark:stroke-emerald-400"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Magnifying Glass Handle */}
                <path
                    d="M72 77L88 93"
                    className="stroke-emerald-700 dark:stroke-emerald-600"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
            </svg>
            {withText && (
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Verity
                </span>
            )}
        </div>
    );
}
