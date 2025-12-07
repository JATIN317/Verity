"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { AlertTriangle, TrendingUp, ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";

export function SuccessStories() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                    >
                        This Could Be Your Story
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-muted-foreground"
                    >
                        See how Verity helps patients take action
                    </motion.p>
                </div>

                {/* Grid */}
                <div ref={ref} className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">

                    {/* CARD 1: BILL ANALYZER EXAMPLE */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
                    >
                        <div className="p-8 flex-1 flex flex-col">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4" />
                                        Bill Analyzer Example
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground">The $6,000 Band-Aid</h3>
                                </div>
                            </div>

                            {/* Story */}
                            <p className="text-muted-foreground mb-6 flex-grow">
                                A patient went to the ER with a cut. Got it cleaned, bandaged, and sent home.
                            </p>

                            {/* Numbers */}
                            <div className="bg-muted/30 rounded-xl p-5 mb-6 space-y-3">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm text-muted-foreground">Original Bill:</span>
                                    <span className="text-lg font-mono font-bold text-destructive decoration-line-through">$4,800</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm text-muted-foreground">What It Should Be:</span>
                                    <span className="text-lg font-mono font-bold text-primary">$800</span>
                                </div>
                            </div>

                            {/* Action & Result */}
                            <div className="space-y-4 mb-8">
                                <div className="flex gap-3">
                                    <div className="w-1 h-full min-h-[40px] bg-primary/20 rounded-full" />
                                    <p className="text-sm text-muted-foreground">
                                        <span className="text-primary font-semibold">Verity flagged the upcoding.</span> Patient had the evidence to fight.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 bg-primary/10 p-4 rounded-xl text-primary">
                                    <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                                    <div>
                                        <span className="block text-xs font-bold uppercase tracking-wider opacity-80">Saved</span>
                                        <span className="text-2xl font-bold font-mono">$4,000</span>
                                    </div>
                                </div>
                            </div>

                            {/* Button */}
                            <Link
                                href="/analyze"
                                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-card border-2 border-primary/20 text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 mt-auto group-hover:border-primary/50"
                            >
                                <TrendingUp className="w-5 h-5" />
                                Analyze Your Bill
                            </Link>
                        </div>
                        <BorderBeam size={200} duration={12} delay={9} colorFrom="#4ade80" colorTo="hsl(var(--primary))" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>

                    {/* CARD 2: APPEAL HELPER EXAMPLE */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
                    >
                        <div className="p-8 flex-1 flex flex-col">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-2 flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        Appeal Helper Example
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground">Denied Isn&apos;t Final</h3>
                                </div>
                            </div>

                            {/* Story */}
                            <p className="text-muted-foreground mb-6 flex-grow">
                                Physical therapy was denied after surgery. Insurance said &quot;not medically necessary.&quot; But the surgeon recommended it.
                            </p>

                            {/* Numbers */}
                            <div className="bg-muted/30 rounded-xl p-5 mb-6 space-y-3">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm text-muted-foreground">Insurance Decision:</span>
                                    <span className="text-sm font-bold text-destructive">DENIED</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm text-muted-foreground">Claim Value:</span>
                                    <span className="text-lg font-mono font-bold text-foreground">$4,200</span>
                                </div>
                            </div>

                            {/* Action & Result */}
                            <div className="space-y-4 mb-8">
                                <div className="flex gap-3">
                                    <div className="w-1 h-full min-h-[40px] bg-blue-500/20 rounded-full" />
                                    <p className="text-sm text-muted-foreground">
                                        <span className="text-blue-500 font-semibold">Verity built the appeal letter.</span> Patient sent it via certified mail.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 bg-blue-500/10 p-4 rounded-xl text-blue-600 dark:text-blue-400">
                                    <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                                    <div>
                                        <span className="block text-xs font-bold uppercase tracking-wider opacity-80">Recovered</span>
                                        <span className="text-2xl font-bold font-mono">$4,200</span>
                                    </div>
                                </div>
                            </div>

                            {/* Button */}
                            <Link
                                href="/appeal"
                                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-card border-2 border-blue-500/20 text-blue-500 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 mt-auto group-hover:border-blue-500/50"
                            >
                                <FileText className="w-5 h-5" />
                                Build Your Appeal
                            </Link>
                        </div>
                        <BorderBeam size={200} duration={12} delay={9} colorFrom="hsl(217, 91%, 60%)" colorTo="hsl(var(--primary))" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>

                </div>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center"
                >
                    <h3 className="text-2xl font-bold text-foreground mb-8">Ready to fight back? Start now.</h3>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/analyze"
                            className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                        >
                            Analyze Bill <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/appeal"
                            className="w-full sm:w-auto px-8 py-4 bg-card border border-input text-foreground rounded-xl font-semibold text-lg hover:bg-muted transition-all flex items-center justify-center gap-2"
                        >
                            Appeal Denial
                        </Link>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
