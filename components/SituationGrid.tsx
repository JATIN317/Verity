"use client";

import React from "react";
import { motion } from "motion/react";
import { FileText, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SituationGrid() {
    return (
        <section className="relative z-20 mt-8 md:-mt-10 mb-16 px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Left Card: Analyze Bill */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 p-8 shadow-2xl backdrop-blur-xl transition-all hover:border-primary/50 hover:shadow-primary/10"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <FileText className="h-32 w-32" />
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <FileText className="h-6 w-6" />
                            </div>

                            <h3 className="mb-2 text-2xl font-bold text-foreground">
                                Analyze Your Bill
                            </h3>
                            <p className="mb-6 text-muted-foreground">
                                Hospital overcharged you? Checking for errors, duplicate charges, and upcoding.
                            </p>

                            <ul className="mb-8 space-y-3 text-sm text-muted-foreground/80 flex-grow">
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    Duplicate charges
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    Unbundled supplies
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    Inflated facility fees
                                </li>
                            </ul>

                            <Link
                                href="/analyze"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
                            >
                                Start Analysis
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Card: Appeal Denial */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 p-8 shadow-2xl backdrop-blur-xl transition-all hover:border-amber-500/50 hover:shadow-amber-500/10"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ShieldAlert className="h-32 w-32 text-amber-500" />
                        </div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-500">
                                <ShieldAlert className="h-6 w-6" />
                            </div>

                            <h3 className="mb-2 text-2xl font-bold text-foreground">
                                Appeal a Denial
                            </h3>
                            <p className="mb-6 text-muted-foreground">
                                Insurance denied your claim? We build your case to prove you deserve coverage.
                            </p>

                            <ul className="mb-8 space-y-3 text-sm text-muted-foreground/80 flex-grow">
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                    "Not medically necessary"
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                    Policy exclusions
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                    Prior authorization missing
                                </li>
                            </ul>

                            <Link
                                href="/appeal"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-card border-2 border-border px-6 py-4 font-semibold text-foreground transition-all hover:bg-muted active:scale-[0.98]"
                            >
                                Build Appeal
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default SituationGrid;
