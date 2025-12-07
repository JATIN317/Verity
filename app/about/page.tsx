'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { SiteNavbar } from '@/components/SiteNavbar';
import { SiteFooter } from '@/components/SiteFooter';
import { Spotlight } from '@/components/ui/spotlight';
import { BorderBeam } from '@/components/ui/border-beam';
import { NumberTicker } from '@/components/ui/number-ticker';
import { cn } from '@/lib/utils';
import {
    AlertTriangle,
    DollarSign,
    FileX,
    Check,
    X,
    Search,
    Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// =============================================================================
// SECTION 1: Hero - "Why We Built This"
// =============================================================================
function HeroSection() {
    return (
        <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
            {/* Spotlight gradient background - using primary (emerald) colors with enhanced visibility */}
            <Spotlight
                gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(160, 100%, 40%, 0.22) 0, hsla(160, 100%, 45%, 0.08) 50%, hsla(160, 100%, 40%, 0) 80%)"
                gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(160, 100%, 75%, 0.15) 0, hsla(160, 100%, 50%, 0.06) 80%, transparent 100%)"
                gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(160, 100%, 75%, 0.12) 0, hsla(160, 100%, 75%, 0.06) 80%, transparent 100%)"
            />

            <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="relative"
                >
                    {/* Decorative Quote Card */}
                    <div className="relative mx-auto max-w-3xl rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm md:p-12">
                        {/* Large decorative opening quote */}
                        <div className="absolute -top-6 left-8 md:-top-8 md:left-12">
                            <span className="font-serif text-8xl leading-none text-primary/30 md:text-9xl">
                                &ldquo;
                            </span>
                        </div>

                        {/* Main Quote Content */}
                        <blockquote className="relative pt-8 md:pt-10">
                            <p className="font-serif text-2xl font-medium leading-relaxed text-foreground md:text-3xl lg:text-4xl">
                                We built Verity because we were tired of hearing patients say,
                            </p>
                            <p className="mt-4 font-serif text-2xl italic leading-relaxed text-primary md:text-3xl lg:text-4xl">
                                &apos;I don&apos;t understand my bill, so I just pay it.&apos;
                            </p>
                        </blockquote>

                        {/* Large decorative closing quote */}
                        <div className="absolute -bottom-6 right-8 md:-bottom-8 md:right-12">
                            <span className="font-serif text-8xl leading-none text-primary/30 md:text-9xl">
                                &rdquo;
                            </span>
                        </div>

                        {/* Attribution/Signature Line */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-8 flex items-center justify-center gap-3 border-t border-border/50 pt-6"
                        >
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
                            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                                The Verity Team
                            </span>
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
                        </motion.div>
                    </div>

                    {/* Problem Statement - Below the card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-12 flex flex-col items-center gap-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent via-muted-foreground/50 to-transparent" />
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                            <div className="h-px w-16 bg-gradient-to-r from-transparent via-muted-foreground/50 to-transparent" />
                        </div>
                        <p className="text-lg text-muted-foreground md:text-xl">
                            That silence is the problem.
                        </p>
                        <p className="text-xl font-semibold text-foreground md:text-2xl">
                            It costs families{' '}
                            <span className="bg-gradient-to-r from-destructive to-destructive/80 bg-clip-text font-bold text-transparent">
                                billions
                            </span>{' '}
                            every year.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

// =============================================================================
// SECTION 2: Statistics + X-Ray Animation
// =============================================================================
interface StatCardProps {
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    delay?: number;
    color: string;
    iconBgColor: string;
}

function StatCard({
    value,
    suffix = '',
    prefix = '',
    label,
    description,
    icon,
    delay = 0,
    color,
    iconBgColor,
}: StatCardProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
        >
            {/* Glow effect */}
            <div
                className={cn(
                    'absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40',
                    color
                )}
            />

            <div className="relative z-10 flex items-start gap-4">
                {/* Icon */}
                <div
                    className={cn(
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white',
                        iconBgColor
                    )}
                >
                    {icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold tracking-tight text-foreground">
                            {prefix}
                            <NumberTicker value={value} delay={delay * 1000} />
                            {suffix}
                        </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">
                        {label}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground/80">{description}</p>
                </div>
            </div>

            <BorderBeam
                size={120}
                duration={8}
                colorFrom="hsl(var(--primary))"
                colorTo="hsl(var(--chart-2))"
                className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
        </motion.div>
    );
}

/**
 * Bill Anatomy Card Flip Component
 * Shows "What You See" on front, "What Verity Sees" on back (hover to flip)
 */
function BillAnatomyCardFlip() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [isFlipped, setIsFlipped] = useState(false);

    // Bill items shown on the front (what patients see)
    const patientBillItems = [
        { label: 'ER Visit', amount: '$4,800' },
        { label: 'Supplies', amount: '$320' },
        { label: 'Misc Charges', amount: '$180' },
    ];

    // What Verity uncovers on the back
    const verityFindings = [
        {
            label: 'Level 5 → Level 2',
            amount: '-$3,200',
            type: 'error' as const,
        },
        {
            label: 'Duplicate Code',
            amount: '-$180',
            type: 'warning' as const,
        },
        {
            label: 'Your Savings',
            amount: '$3,380',
            type: 'success' as const,
        },
    ];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex w-full flex-col items-center"
        >
            {/* Title */}
            <h3 className="mb-6 text-center text-lg font-semibold text-foreground">
                Anatomy of a Bill
            </h3>

            {/* Flip instruction */}
            <p className="mb-4 text-center text-xs text-muted-foreground">
                Hover to reveal what Verity sees
            </p>

            {/* Card Flip Container */}
            <div
                className="group relative h-[360px] w-full max-w-[340px] cursor-pointer [perspective:2000px]"
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
                onFocus={() => setIsFlipped(true)}
                onBlur={() => setIsFlipped(false)}
                tabIndex={0}
                role="button"
                aria-label="Flip card to see what Verity finds in your bill"
            >
                <div
                    className={cn(
                        'relative h-full w-full',
                        '[transform-style:preserve-3d]',
                        'transition-all duration-700 ease-out',
                        isFlipped
                            ? '[transform:rotateY(180deg)]'
                            : '[transform:rotateY(0deg)]'
                    )}
                >
                    {/* FRONT: What You See */}
                    <div
                        className={cn(
                            'absolute inset-0 h-full w-full',
                            '[transform:rotateY(0deg)] [backface-visibility:hidden]',
                            'overflow-hidden rounded-2xl p-5',
                            'bg-gradient-to-br from-background via-muted/50 to-muted/30',
                            'border border-border/50',
                            'shadow-lg',
                            'transition-all duration-500',
                            'group-hover:shadow-xl group-hover:border-muted-foreground/30',
                            isFlipped ? 'opacity-0' : 'opacity-100'
                        )}
                    >
                        {/* Front Header */}
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                                <FileX className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <span className="text-sm font-semibold text-foreground">
                                What You See
                            </span>
                        </div>

                        {/* Bill Items */}
                        <div className="space-y-3">
                            {patientBillItems.map((item, index) => (
                                <div
                                    key={item.label}
                                    className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3 transition-all duration-300"
                                    style={{
                                        transitionDelay: `${index * 50}ms`,
                                    }}
                                >
                                    <span className="text-sm text-muted-foreground">
                                        {item.label}
                                    </span>
                                    <span className="font-mono text-sm font-medium text-foreground">
                                        {item.amount}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                            <span className="text-sm font-medium text-muted-foreground">
                                Total Due
                            </span>
                            <span className="font-mono text-lg font-bold text-foreground">
                                $5,300
                            </span>
                        </div>
                    </div>

                    {/* BACK: What Verity Sees */}
                    <div
                        className={cn(
                            'absolute inset-0 h-full w-full',
                            '[transform:rotateY(180deg)] [backface-visibility:hidden]',
                            'overflow-hidden rounded-2xl p-5',
                            'bg-gradient-to-br from-primary/5 via-background to-primary/10',
                            'border border-primary/30',
                            'shadow-lg',
                            'transition-all duration-500',
                            'group-hover:shadow-xl group-hover:shadow-primary/10',
                            !isFlipped ? 'opacity-0' : 'opacity-100'
                        )}
                    >
                        {/* Back Header */}
                        <div className="mb-4 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                                <Search className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm font-semibold text-primary">
                                What Verity Sees
                            </span>
                        </div>

                        {/* Findings */}
                        <div className="flex flex-col gap-3 py-1">
                            {verityFindings.map((finding, index) => {
                                const bgColor =
                                    finding.type === 'error'
                                        ? 'bg-destructive/10 ring-1 ring-destructive/20'
                                        : finding.type === 'warning'
                                            ? 'bg-amber-100 dark:bg-amber-500/10 ring-1 ring-amber-500/20'
                                            : 'bg-emerald-500/10 ring-1 ring-emerald-500/20';
                                const textColor =
                                    finding.type === 'error'
                                        ? 'text-destructive'
                                        : finding.type === 'warning'
                                            ? 'text-amber-700 dark:text-amber-400'
                                            : 'text-emerald-700 dark:text-emerald-400';

                                return (
                                    <div
                                        key={finding.label}
                                        className={cn(
                                            'flex items-center justify-between rounded-xl px-4 py-3 shadow-sm transition-all duration-500',
                                            bgColor
                                        )}
                                        style={{
                                            transform: isFlipped
                                                ? 'translateX(0)'
                                                : 'translateX(-10px)',
                                            opacity: isFlipped ? 1 : 0,
                                            transitionDelay: `${index * 100 + 200}ms`,
                                        }}
                                    >
                                        <span className={cn('text-sm font-medium', textColor)}>
                                            {finding.label}
                                        </span>
                                        <span
                                            className={cn(
                                                'font-mono text-sm font-bold',
                                                textColor,
                                            )}
                                        >
                                            {finding.amount}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Corrected Total */}
                        <div className="mt-5 flex items-center justify-between border-t border-emerald-500/20 pt-4">
                            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                                Corrected Total
                            </span>
                            <span className="font-mono text-xl font-bold text-emerald-700 dark:text-emerald-400">
                                $1,920
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}


function StatsSection() {
    const stats: StatCardProps[] = [
        {
            value: 49,
            suffix: '%',
            prefix: 'Up to ',
            label: 'of medical bills contain errors',
            description: 'Industry studies find significant billing errors in 30-49% of bills',
            icon: <AlertTriangle className="h-5 w-5" />,
            delay: 0,
            color: 'bg-destructive',
            iconBgColor: 'bg-gradient-to-br from-destructive to-destructive/80',
        },
        {
            value: 10,
            prefix: '$',
            suffix: 'B+',
            label: 'in billing errors annually',
            description: 'Families paying for billing mistakes they never catch',
            icon: <DollarSign className="h-5 w-5" />,
            delay: 0.15,
            color: 'bg-chart-4',
            iconBgColor: 'bg-gradient-to-br from-chart-4 to-chart-4/80',
        },
        {
            value: 0,
            label: 'bills most patients dispute',
            description: "Because fighting back feels impossible—until now",
            icon: <FileX className="h-5 w-5" />,
            delay: 0.3,
            color: 'bg-muted-foreground',
            iconBgColor: 'bg-gradient-to-br from-muted-foreground to-muted-foreground/80',
        },
    ];

    return (
        <section className="relative py-16 md:py-24">
            <div className="container mx-auto max-w-6xl px-4 md:px-6">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Left: Stats */}
                    <div className="space-y-4">
                        <p className="font-semibold text-lg">Here&apos;s why this matters:</p>
                        {stats.map((stat, index) => (
                            <StatCard key={index} {...stat} />
                        ))}
                    </div>

                    {/* Right: Bill Anatomy Card Flip */}
                    <div className="flex items-center justify-center">
                        <BillAnatomyCardFlip />
                    </div>
                </div>
            </div>
        </section>
    );
}

// =============================================================================
// SECTION 3: What Makes Verity Different
// =============================================================================


function DifferenceSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    // Combined data for table layout - each row has IS and IS NOT item
    const comparisonRows = [
        {
            is: {
                text: 'Your research assistant',
                description: "We see the codes you don't—CPT, ICD-10, DRG, and more",
            },
            isNot: {
                text: 'A lawyer',
                description: 'You stay in control of all decisions',
            },
        },
        {
            is: {
                text: 'Your evidence',
                description: 'Proven by billing rules and regulations, not guesses',
            },
            isNot: {
                text: 'A guarantee',
                description: 'Some errors require time and effort to dispute',
            },
        },
        {
            is: {
                text: 'Your advocate in spirit',
                description: "We believe in you fighting back for what's right",
            },
            isNot: {
                text: 'A miracle',
                description: 'Hospitals can be slow to respond',
            },
        },
    ];

    return (
        <section className="relative overflow-hidden py-16 md:py-24">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />

            <div className="container relative z-10 mx-auto max-w-5xl px-4 md:px-6">
                {/* Opening Quote */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <p className="text-xl font-medium text-foreground md:text-2xl">
                        &ldquo;Most AI tools try to be helpful.{' '}
                        <span className="text-primary">We try to be suspicious.</span>
                        &rdquo;
                    </p>
                    <p className="mt-4 text-muted-foreground">
                        We assume your bill is wrong until proven right. We don&apos;t
                        celebrate &ldquo;potential issues&rdquo;—we celebrate you getting
                        money back.
                    </p>
                </motion.div>

                {/* Table-style Comparison Grid */}
                <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm">
                    {/* Table Headers */}
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center justify-center gap-2 border-b border-r border-border/50 bg-primary/5 px-6 py-4"
                        >
                            <Sparkles className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-semibold text-primary">
                                What Verity IS
                            </h3>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center justify-center gap-2 border-b border-border/50 bg-muted/30 px-6 py-4"
                        >
                            <X className="h-5 w-5 text-muted-foreground" />
                            <h3 className="text-lg font-semibold text-muted-foreground">
                                What Verity IS NOT
                            </h3>
                        </motion.div>
                    </div>

                    {/* Table Rows - Each row has IS and IS NOT aligned */}
                    {comparisonRows.map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className={cn(
                                'grid grid-cols-1 md:grid-cols-2',
                                rowIndex < comparisonRows.length - 1 && 'border-b border-border/30'
                            )}
                        >
                            {/* IS Column Cell */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                transition={{ duration: 0.5, delay: 0.1 * rowIndex + 0.3 }}
                                className="flex items-start gap-3 border-r border-border/30 p-5 transition-colors duration-200 hover:bg-primary/5"
                            >
                                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                                    <Check className="h-4 w-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-medium text-foreground">
                                        {row.is.text}
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground/80">
                                        {row.is.description}
                                    </p>
                                </div>
                            </motion.div>

                            {/* IS NOT Column Cell */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                                transition={{ duration: 0.5, delay: 0.1 * rowIndex + 0.3 }}
                                className="flex items-start gap-3 p-5 transition-colors duration-200 hover:bg-muted/50"
                            >
                                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted-foreground/20 text-muted-foreground">
                                    <X className="h-4 w-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-medium text-muted-foreground">
                                        {row.isNot.text}
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground/80">
                                        {row.isNot.description}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


// =============================================================================
// SECTION 3.5: Mission Statement
// =============================================================================
function MissionSection() {
    return (
        <section className="py-16 bg-muted/10 border-y border-border/30">
            <div className="container mx-auto max-w-3xl px-4 text-center">
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Our Mission</h2>
                <p className="text-2xl md:text-3xl font-serif leading-relaxed text-foreground">
                    Verity exists to give patients the tools and confidence to question medical bills. Not because we&apos;re lawyers—because the system is confusing by design, and that design costs you money.
                </p>
                <p className="mt-6 text-lg text-muted-foreground">
                    We&apos;re not here to replace experts. We&apos;re here to help you become an expert about your own bills.
                </p>
            </div>
        </section>
    );
}

// =============================================================================
// CTA Section
// =============================================================================
function CTASection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto max-w-3xl px-4 text-center md:px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                        Ready to fight back?
                    </h2>
                    <p className="text-muted-foreground">
                        Upload your bill and let Verity find what&apos;s hiding in plain
                        sight.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
                        <Button
                            asChild
                            size="lg"
                            className="w-full rounded-lg bg-primary px-8 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/20 sm:w-auto"
                        >
                            <Link href="/analyze">Analyze Your Bill</Link>
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="w-full rounded-lg border-border sm:w-auto"
                        >
                            <Link href="/appeal">Start an Appeal</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// =============================================================================
// Main About Page
// =============================================================================
export default function AboutPage() {
    return (
        <div className="relative min-h-screen overflow-x-hidden bg-background font-sans">
            {/* Navigation */}
            <SiteNavbar />

            {/* Page Content */}
            <main className="pt-16 md:pt-20">
                <HeroSection />
                <StatsSection />
                <MissionSection />
                <DifferenceSection />
                <CTASection />
            </main>

            {/* Footer */}
            <SiteFooter />
        </div>
    );
}
