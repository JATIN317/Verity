"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
    FileText,
    ScanLine,
    Scale,
    Brain,
    RefreshCw,
    AlertCircle,
    CheckCircle2,
    Pause,
    RotateCcw,
} from "lucide-react";

// ============================================================================
// Types & Configuration
// ============================================================================

interface AnalysisStage {
    id: string;
    label: string;
    icon: React.ReactNode;
}

interface Insight {
    id: string;
    type: "error" | "success";
    label: string;
    value?: string;
    revealAtStep: number;
}

const ANALYSIS_STAGES: AnalysisStage[] = [
    { id: "scan", label: "Scanning", icon: <ScanLine className="w-5 h-5" /> },
    { id: "verify", label: "Verifying", icon: <Scale className="w-5 h-5" /> },
    { id: "analyze", label: "Analyzing", icon: <Brain className="w-5 h-5" /> },
    { id: "optimize", label: "Optimizing", icon: <RefreshCw className="w-5 h-5" /> },
];

const BILLING_INSIGHTS: Insight[] = [
    { id: "duplicate", type: "error", label: "Duplicate Charge", revealAtStep: 2 },
    { id: "upcoding", type: "error", label: "Upcoding Detected", revealAtStep: 3 },
    { id: "savings", type: "success", label: "Potential Savings", value: "$98.50", revealAtStep: 4 },
];

const DENIAL_INSIGHTS: Insight[] = [
    { id: "denial", type: "error", label: "Improper Denial", revealAtStep: 2 },
    { id: "policy", type: "error", label: "Policy Mismatch", revealAtStep: 3 },
    { id: "appeal", type: "success", label: "Appeal Strength", value: "High", revealAtStep: 4 },
];

const ANIMATION_INTERVAL = 1800; // ms per step

// ============================================================================
// Sub-Components
// ============================================================================

interface StageNodeProps {
    stage: AnalysisStage;
    index: number;
    currentStep: number;
}

const StageNode = React.memo(function StageNode({
    stage,
    index,
    currentStep,
}: StageNodeProps) {
    const isActive = currentStep >= index + 1;
    const isCurrent = currentStep === index + 1;

    return (
        <div className="relative z-10">
            <motion.div
                className={cn(
                    "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center",
                    "transition-colors duration-300",
                    isActive
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-muted text-muted-foreground"
                )}
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
                style={
                    isActive
                        ? { boxShadow: "0 0 20px oklch(0.8348 0.1302 160.9080 / 0.4)" }
                        : {}
                }
            >
                {stage.icon}
            </motion.div>

            {/* Step label */}
            <AnimatePresence>
                {isCurrent && (
                    <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-semibold text-primary whitespace-nowrap"
                    >
                        {stage.label}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
});

interface InsightCardProps {
    insight: Insight;
    isVisible: boolean;
    delay: number;
}

const InsightCard = React.memo(function InsightCard({
    insight,
    isVisible,
    delay,
}: InsightCardProps) {
    const isError = insight.type === "error";

    return (
        <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            transition={{ duration: 0.4, delay: delay * 0.1 }}
            className={cn(
                "flex flex-col gap-3 p-3 rounded-xl border transition-colors min-h-[80px]",
                isError
                    ? "bg-destructive/10 border-destructive/20"
                    : "bg-emerald-500/10 border-emerald-500/20"
            )}
        >
            <div className="flex items-start gap-2.5">
                {isError ? (
                    <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                )}
                <span className="text-xs font-semibold leading-tight text-foreground/90">
                    {insight.label}
                </span>
            </div>

            <div className="flex items-center justify-end w-full">
                {insight.value ? (
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        {insight.value}
                    </span>
                ) : (
                    <span
                        className={cn(
                            "text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded shadow-sm",
                            isError
                                ? "text-destructive-foreground bg-destructive"
                                : "text-emerald-700 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-300"
                        )}
                    >
                        Flagged
                    </span>
                )}
            </div>
        </motion.div>
    );
});

// ============================================================================
// Main Component
// ============================================================================

interface AnalysisEngineVizProps {
    className?: string;
    autoPlay?: boolean;
}

export function AnalysisEngineViz({
    className,
    autoPlay = true,
}: AnalysisEngineVizProps) {
    const [step, setStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoPlay);

    // Auto-advance animation (Reset to 0 after step 4)
    useEffect(() => {
        if (!isPlaying) return;

        const timer = setInterval(() => {
            setStep((prev) => (prev === 4 ? 0 : prev + 1));
        }, ANIMATION_INTERVAL);

        return () => clearInterval(timer);
    }, [isPlaying]);

    const handleTogglePlay = useCallback(() => {
        setIsPlaying((prev) => !prev);
    }, []);

    const handleReset = useCallback(() => {
        setStep(0);
    }, []);

    const progressWidth = useMemo(() => {
        return `${Math.min((step / 4) * 100, 100)}%`;
    }, [step]);

    return (
        <div
            className={cn(
                "w-full bg-card rounded-2xl md:rounded-3xl shadow-xl border border-border p-4 md:p-8 relative",
                className
            )}
        >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 relative">

                {/* Left: Inputs (Stacked Bill + Denial) */}
                <div className="relative z-10 shrink-0 flex flex-row gap-3">
                    {/* Bill Input */}
                    <motion.div
                        className={cn(
                            "w-24 h-24 md:w-28 md:h-28 rounded-xl shadow-lg border flex flex-col items-center justify-center transition-all duration-300",
                            step === 0
                                ? "border-primary bg-primary/5 shadow-primary/20"
                                : "border-border bg-card"
                        )}
                        animate={step === 0 ? { scale: 1.05 } : { scale: 1 }}
                    >
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                            <FileText className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <span className="text-[10px] md:text-xs font-semibold text-foreground">Medical Bill</span>
                    </motion.div>

                    {/* Denial Input */}
                    <motion.div
                        className={cn(
                            "w-24 h-24 md:w-28 md:h-28 rounded-xl shadow-lg border flex flex-col items-center justify-center transition-all duration-300",
                            step === 0
                                ? "border-destructive bg-destructive/5 shadow-destructive/20"
                                : "border-border bg-card"
                        )}
                        animate={step === 0 ? { scale: 1.05 } : { scale: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center mb-2">
                            <AlertCircle className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <span className="text-[10px] md:text-xs font-semibold text-foreground">Denial Letter</span>
                    </motion.div>
                </div>

                {/* Center: Pipeline */}
                <div className="flex-1 relative h-20 md:h-24 flex items-center justify-between px-2 md:px-4 w-full max-w-xs md:max-w-none mb-16 md:mb-0">
                    {/* Background track */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0 rounded-full" />
                    {/* Progress indicator */}
                    <motion.div
                        className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: progressWidth }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    {ANALYSIS_STAGES.map((stage, index) => (
                        <StageNode
                            key={stage.id}
                            stage={stage}
                            index={index}
                            currentStep={step}
                        />
                    ))}
                    <div className="absolute -bottom-14 md:-bottom-10 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-bold tracking-widest text-muted-foreground uppercase whitespace-nowrap">
                        Dual-Core Analysis Engine
                    </div>
                </div>

                {/* Right: Insights (Split Columns) */}
                <div className="relative z-10 w-full lg:w-72 xl:w-80 shrink-0 grid grid-cols-2 gap-3">
                    {/* Billing Insights */}
                    <div className="space-y-2">
                        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Billing Errors</h4>
                        {BILLING_INSIGHTS.map((insight, index) => (
                            <InsightCard
                                key={`bill-${insight.id}`}
                                insight={insight}
                                isVisible={step >= insight.revealAtStep}
                                delay={index}
                            />
                        ))}
                    </div>

                    {/* Denial Insights */}
                    <div className="space-y-2">
                        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Appeal Strategy</h4>
                        {DENIAL_INSIGHTS.map((insight, index) => (
                            <InsightCard
                                key={`denial-${insight.id}`}
                                insight={insight}
                                isVisible={step >= insight.revealAtStep}
                                delay={index + 3}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer description & Controls */}
            <div className="mt-8 md:mt-12 flex flex-col items-center gap-4">
                <p className="text-muted-foreground text-xs md:text-sm max-w-2xl text-center">
                    Simultaneously auditing your bills for overcharges AND checking your denials for appeal opportunities.
                </p>

                {/* Controls */}
                <div className="flex gap-2">
                    <button
                        onClick={handleTogglePlay}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-xs font-medium border border-transparent hover:border-border"
                        aria-label={isPlaying ? "Pause animation" : "Play animation"}
                    >
                        {isPlaying ? (
                            <>
                                <Pause className="w-3.5 h-3.5" />
                                <span>Pause</span>
                            </>
                        ) : (
                            <>
                                <RefreshCw className="w-3.5 h-3.5" />
                                <span>Play</span>
                            </>
                        )}
                    </button>
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors text-xs font-medium border border-transparent hover:border-border"
                        aria-label="Reset animation"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AnalysisEngineViz;
