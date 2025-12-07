"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Copy,
    Building2,
    AlertTriangle,
    Layers,
    Package,
    TrendingUp,
    Shield,
    XCircle,
    Lock,
    MapPin,
    ArrowRight,
} from "lucide-react";

// ============================================================================
// Types & Configuration
// ============================================================================

type Severity = "HIGH" | "MEDIUM" | "INFO";

interface RedFlag {
    id: string;
    title: string;
    description: string;
    detectionMethod: string;
    severity: Severity;
    confidence: number;
    icon: React.ReactNode;
    cta?: string;
    ctaLink?: string;
}

const BILLING_FLAGS: RedFlag[] = [
    {
        id: "RF001",
        title: "Duplicate Charge",
        description: "Same service billed twice on the same date",
        detectionMethod: "Cross-references CPT codes and amounts to identify duplicates",
        severity: "HIGH",
        confidence: 99,
        icon: <Copy className="w-5 h-5" />,
    },
    {
        id: "AL001",
        title: "Not Medically Necessary",
        description: "Insurance claims treatment wasn't needed",
        detectionMethod: "Cites limits of clinical guidelines matching your specific diagnosis",
        severity: "HIGH",
        confidence: 96,
        icon: <Shield className="w-5 h-5" />,
    },
    {
        id: "RF002",
        title: "Upcoding",
        description: "Billed for a higher level of care than received",
        detectionMethod: "Compares treatment complexity against billed service level",
        severity: "HIGH",
        confidence: 92,
        icon: <TrendingUp className="w-5 h-5" />,
    },
    {
        id: "AL002",
        title: "Prior Auth Missing",
        description: "Denied because you didn't ask permission first",
        detectionMethod: "Checks for emergency exceptions and retroactive rights",
        severity: "HIGH",
        confidence: 94,
        icon: <AlertTriangle className="w-5 h-5" />,
    },
    {
        id: "RF003",
        title: "Unbundled Service",
        description: "Routine supplies billed separately instead of bundled",
        detectionMethod: "Identifies supplies that should be included in procedure costs",
        severity: "MEDIUM",
        confidence: 90,
        icon: <Package className="w-5 h-5" />,
    },
    {
        id: "AL003",
        title: "Network Status Conflict",
        description: "Surprise out-of-network bills for emergency care",
        detectionMethod: "Verifies compliance with the No Surprises Act",
        severity: "MEDIUM",
        confidence: 88,
        icon: <Layers className="w-5 h-5" />,
    },
    {
        id: "RF004",
        title: "Inflated Facility Fees",
        description: "Excessive fees for simple outpatient visits",
        detectionMethod: "Benchmarks against Medicare allowable rates",
        severity: "INFO",
        confidence: 85,
        icon: <Building2 className="w-5 h-5" />,
    },
];

const DENIAL_FLAGS: RedFlag[] = [
    {
        id: "appeal-1",
        title: "Not Medically Necessary",
        description: "Insurance claims the procedure wasn't medically required. Verity helps you cite evidence from your doctor's notes to prove it was.",
        detectionMethod: "Policy Analysis",
        severity: "HIGH",
        confidence: 95,
        icon: <XCircle className="w-5 h-5" />,
        cta: "Build Appeal",
        ctaLink: "/appeal",
    },
    {
        id: "appeal-2",
        title: "Prior Authorization Missing",
        description: "Insurance says you didn't get pre-approval. Verity helps you build a case showing you did, or that it should have been approved.",
        detectionMethod: "Retroactive Auth Check",
        severity: "HIGH",
        confidence: 90,
        icon: <Lock className="w-5 h-5" />,
        cta: "Build Appeal",
        ctaLink: "/appeal",
    },
    {
        id: "appeal-3",
        title: "Out-of-Network Charge",
        description: "You got care at an out-of-network facility. Verity helps you appeal for in-network rates or cite surprise billing protections.",
        detectionMethod: "NSA Violation Scan",
        severity: "HIGH",
        confidence: 85,
        icon: <MapPin className="w-5 h-5" />,
        cta: "Build Appeal",
        ctaLink: "/appeal",
    },
];

const SEVERITY_CONFIG: Record<Severity, { color: string; bgColor: string; borderColor: string; label: string }> = {
    HIGH: {
        color: "text-destructive",
        bgColor: "bg-destructive/10",
        borderColor: "border-destructive/30 hover:border-destructive/50",
        label: "High Confidence",
    },
    MEDIUM: {
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/30 hover:border-orange-500/50",
        label: "Medium Confidence",
    },
    INFO: {
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30 hover:border-blue-500/50",
        label: "Informational",
    },
};

// ============================================================================
// Sub-Components
// ============================================================================

interface ConfidenceRingProps {
    percentage: number;
    severity: Severity;
    size?: number;
}

const ConfidenceRing = React.memo(function ConfidenceRing({
    percentage,
    severity,
    size = 56,
}: ConfidenceRingProps) {
    const strokeWidth = 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    const colorClass = SEVERITY_CONFIG[severity].color;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-muted/30"
                />
                {/* Progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    className={colorClass}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: offset }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    style={{
                        strokeDasharray: circumference,
                    }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className={cn("text-xs font-bold", colorClass)}>{percentage}%</span>
            </div>
        </div>
    );
});

interface FlagCardProps {
    flag: RedFlag;
    index: number;
}

const FlagCard = React.memo(function FlagCard({ flag, index }: FlagCardProps) {
    const config = SEVERITY_CONFIG[flag.severity];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={cn(
                "group relative rounded-xl border-2 bg-card p-4 md:p-5 transition-all duration-300",
                "hover:shadow-lg flex flex-col h-full",
                config.borderColor
            )}
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div className={cn("p-2.5 rounded-lg shrink-0", config.bgColor, config.color)}>
                        {flag.icon}
                    </div>

                    {/* Title & ID */}
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={cn("text-xs font-mono font-bold px-2 py-0.5 rounded", config.bgColor, config.color)}>
                                {flag.id}
                            </span>
                            <span className={cn("text-[10px] font-semibold uppercase tracking-wider hidden sm:inline-block", config.color)}>
                                {config.label}
                            </span>
                        </div>
                        <h3 className="font-semibold text-foreground text-sm md:text-base leading-tight">
                            {flag.title}
                        </h3>
                    </div>
                </div>

                {/* Confidence Ring */}
                <div className="shrink-0">
                    <ConfidenceRing percentage={flag.confidence} severity={flag.severity} />
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                {flag.description}
            </p>

            {/* Optional CTA */}
            {flag.cta && (
                <div className="pt-4 mt-4 border-t border-border">
                    <Link href={flag.ctaLink || "#"}>
                        <Button size="sm" variant="ghost" className="w-full justify-between hover:bg-primary/5 hover:text-primary group-btn h-8 text-xs font-medium">
                            {flag.cta}
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            )}
        </motion.div>
    );
});

// ============================================================================
// Main Component
// ============================================================================

interface RedFlagsShowcaseProps {
    className?: string;
}

export function RedFlagsShowcase({ className }: RedFlagsShowcaseProps) {
    const [activeTab, setActiveTab] = useState<"billing" | "denial">("billing");

    // Tier Logic Helper
    const getTiers = (flags: RedFlag[]) => {
        return {
            high: flags.filter(f => f.severity === "HIGH"),
            medium: flags.filter(f => f.severity === "MEDIUM"),
            info: flags.filter(f => f.severity === "INFO")
        };
    };

    const currentFlags = activeTab === "billing" ? BILLING_FLAGS : DENIAL_FLAGS;
    const tiers = useMemo(() => getTiers(currentFlags), [currentFlags]);

    // Stats for header
    const stats = useMemo(() => ({
        totalFlags: currentFlags.length,
        maxConfidence: Math.max(...currentFlags.map((f) => f.confidence)),
    }), [currentFlags]);

    return (
        <section
            className={cn("w-full max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24", className)}
            aria-labelledby="redflags-heading"
        >
            {/* Header */}
            <header className="text-center mb-12 md:mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-flex items-center gap-2 text-primary font-mono text-xs tracking-widest uppercase font-semibold mb-4">
                        <Shield className="w-4 h-4" />
                        Error Detection
                    </span>
                    <h2
                        id="redflags-heading"
                        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
                    >
                        What We Fight{" "}
                        <span className="text-primary">For You</span>
                    </h2>

                    {/* Toggle Pills */}
                    <div className="inline-flex items-center p-1 rounded-full bg-muted/50 border border-border mt-4 mb-8">
                        <button
                            onClick={() => setActiveTab("billing")}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                                activeTab === "billing"
                                    ? "bg-primary text-primary-foreground shadow-lg"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                        >
                            Reviewing a Bill
                        </button>
                        <button
                            onClick={() => setActiveTab("denial")}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                                activeTab === "denial"
                                    ? "bg-primary text-primary-foreground shadow-lg"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                        >
                            Fighting a Denial
                        </button>
                    </div>

                    <p className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg">
                        {activeTab === "billing"
                            ? "Verity detects 7 specific billing errors based on established healthcare billing rules. It only flags what it can prove from your bill text—no assumptions, no guesses."
                            : "3 common insurance denial reasons Verity helps you challenge. We build your case using your own medical records and payer policies."
                        }
                    </p>
                </motion.div>
            </header>

            {/* Content Tiers */}
            <div className="min-h-[400px]"> {/* Min-height to prevent layout jump */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Tier 1: High Confidence */}
                        {tiers.high.length > 0 && (
                            <div className="mb-8">
                                {/* Only show Tier header if we are in Billing tab or if we want to emphasize confidence */}
                                {activeTab === "billing" && (
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-xs font-bold text-destructive uppercase tracking-wider">
                                            Tier 1 — High Confidence
                                        </span>
                                        <div className="flex-1 h-px bg-destructive/20" />
                                    </div>
                                )}
                                <div className={cn(
                                    "grid gap-4",
                                    activeTab === "billing"
                                        ? "grid-cols-1 md:grid-cols-2"
                                        : "grid-cols-1 md:grid-cols-3" // Appeals: 3 cols centered
                                )}>
                                    {tiers.high.map((flag, index) => (
                                        <FlagCard key={flag.id} flag={flag} index={index} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tier 2: Medium Confidence */}
                        {tiers.medium.length > 0 && (
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">
                                        Tier 2 — Medium Confidence
                                    </span>
                                    <div className="flex-1 h-px bg-orange-500/20" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {tiers.medium.map((flag, index) => (
                                        <FlagCard key={flag.id} flag={flag} index={index + tiers.high.length} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tier 3: Informational */}
                        {tiers.info.length > 0 && (
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">
                                        Tier 3 — Informational
                                    </span>
                                    <div className="flex-1 h-px bg-blue-500/20" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 max-w-md mx-auto lg:max-w-none">
                                    {tiers.info.map((flag, index) => (
                                        <FlagCard key={flag.id} flag={flag} index={index + tiers.high.length + tiers.medium.length} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

export default RedFlagsShowcase;
