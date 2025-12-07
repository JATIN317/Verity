"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
    Upload,
    Search,
    FileText,
    Wallet,
    type LucideIcon,
} from "lucide-react";

// ============================================================================
// Types & Configuration
// ============================================================================

interface ProcessStep {
    id: string;
    number: string;
    title: string;
    description: string;
    icon: LucideIcon;
}

const PROCESS_STEPS: ProcessStep[] = [
    {
        id: "step-1",
        number: "01",
        title: "Upload your situation",
        description:
            "Upload your medical bill or denial letter. Redact personal details if you want—we only need the charges, codes, and what the insurer said.",
        icon: Upload,
    },
    {
        id: "step-2",
        number: "02",
        title: "We analyze it",
        description:
            "For bills, Verity scans line items and codes for common errors and overcharges. For denials, it pulls out the denial reason and helps you line it up with your coverage details and supporting medical information.",
        icon: Search,
    },
    {
        id: "step-3",
        number: "03",
        title: "We build your argument",
        description:
            "You get a clear report plus ready‑to‑use scripts and letters: a bill dispute package for overcharges, or an appeal letter tailored to your denial.",
        icon: FileText,
    },
    {
        id: "step-4",
        number: "04",
        title: "You take action",
        description:
            "Call billing, send your dispute or appeal, and follow a simple next‑steps timeline. Many cases resolve within 30–90 days when you push back with evidence.",
        icon: Wallet,
    },
] as const;

// ============================================================================
// Sub-Components
// ============================================================================

interface StepNodeProps {
    step: ProcessStep;
    index: number;
    isActive: boolean;
    isCompleted: boolean;
    onClick: () => void;
}

const StepNode = React.memo(function StepNode({
    step,
    isActive,
    isCompleted,
    onClick,
}: StepNodeProps) {
    const Icon = step.icon;

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative group flex items-center justify-center",
                "w-14 h-12 md:w-20 md:h-14",
                "rounded-xl border-2 transition-colors duration-300",
                "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                // State-based styling using design system
                isActive && [
                    "border-primary bg-primary/10 text-primary",
                    "shadow-[0_0_20px_oklch(0.8348_0.1302_160.9080/0.3)]",
                ],
                isCompleted && [
                    "border-primary/50 bg-primary/5 text-primary/80",
                ],
                !isActive &&
                !isCompleted && [
                    "border-border bg-card text-muted-foreground",
                    "hover:border-primary/30 hover:text-foreground",
                ]
            )}
            aria-label={`Step ${step.number}: ${step.title}`}
            aria-current={isActive ? "step" : undefined}
        >
            <Icon
                className={cn(
                    "w-5 h-5 md:w-6 md:h-6 transition-transform duration-300",
                    isActive && "scale-110"
                )}
                strokeWidth={isActive ? 2 : 1.5}
            />

            {/* Active glow effect */}
            {isActive && (
                <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 -z-10 rounded-xl bg-primary/20 blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />
            )}
        </motion.button>
    );
});

interface ConnectorLineProps {
    isCompleted: boolean;
}

const ConnectorLine = React.memo(function ConnectorLine({
    isCompleted,
}: ConnectorLineProps) {
    return (
        <div className="flex-1 h-0.5 bg-border relative overflow-hidden mx-2 md:mx-4 rounded-full">
            <motion.div
                className="absolute inset-0 bg-primary origin-left rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isCompleted ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        </div>
    );
});

interface StepContentProps {
    step: ProcessStep;
}

const StepContent = React.memo(function StepContent({ step }: StepContentProps) {
    return (
        <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-4"
        >
            {/* Step Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold tracking-wider text-primary uppercase font-mono">
                    Step {step.number}
                </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                {step.title}
            </h3>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {step.description}
            </p>
        </motion.div>
    );
});

// ============================================================================
// Main Component
// ============================================================================

interface ProcessTimelineProps {
    className?: string;
}

export function ProcessTimeline({ className }: ProcessTimelineProps) {
    const [activeStep, setActiveStep] = useState(0);

    const handleStepClick = useCallback((index: number) => {
        setActiveStep(index);
    }, []);

    const currentStep = useMemo(
        () => PROCESS_STEPS[activeStep],
        [activeStep]
    );

    return (
        <section
            className={cn(
                "w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20",
                className
            )}
            aria-labelledby="process-heading"
        >
            {/* Header Section */}
            <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-border pb-8 mb-12">
                <div className="max-w-xl space-y-3">
                    <span className="text-primary font-mono text-xs tracking-widest uppercase font-semibold">
                        — Process
                    </span>
                    <h2
                        id="process-heading"
                        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight"
                    >
                        How Verity turns{" "}
                        <span className="text-primary drop-shadow-[0_0_15px_oklch(0.8348_0.1302_160.9080/0.5)]">
                            confusion
                        </span>{" "}
                        into savings
                    </h2>
                </div>
                <div className="max-w-md space-y-4">
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                        One workflow for two problems: confusing medical bills and unfair insurance denials.
                    </p>
                    <p className="text-xs font-semibold text-primary flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Tap any step below to see details
                    </p>
                </div>
            </header>

            {/* Timeline Navigation */}
            <nav
                className="relative mb-12"
                aria-label="Process steps"
                role="tablist"
            >
                <div className="flex items-center justify-between w-full">
                    {PROCESS_STEPS.map((step, index) => {
                        const isActive = index === activeStep;
                        const isCompleted = index < activeStep;
                        const isLast = index === PROCESS_STEPS.length - 1;

                        return (
                            <React.Fragment key={step.id}>
                                <StepNode
                                    step={step}
                                    index={index}
                                    isActive={isActive}
                                    isCompleted={isCompleted}
                                    onClick={() => handleStepClick(index)}
                                />

                                {!isLast && <ConnectorLine isCompleted={isCompleted} />}
                            </React.Fragment>
                        );
                    })}
                </div>
            </nav>

            {/* Content Display Area */}
            <div className="min-h-[180px] md:min-h-[200px]" role="tabpanel">
                <AnimatePresence mode="wait">
                    <StepContent step={currentStep} />
                </AnimatePresence>
            </div>
        </section>
    );
}

export default ProcessTimeline;
