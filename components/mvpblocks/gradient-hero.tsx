'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import TextType from '@/components/ui/text-type';
import { Highlight } from '@/components/ui/hero-highlight';
import { AnalysisEngineViz } from '@/components/analysis_viz';
import { DemoDropdown } from '@/components/DemoDropdown';

interface GradientHeroProps {
  className?: string;
}

export default function GradientHero({ className }: GradientHeroProps) {
  return (
    <section
      className={cn('relative w-full overflow-hidden bg-background', className)}
      aria-labelledby="hero-heading"
    >
      {/* Background gradient effects */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {/* Radial gradient from center - enhanced for visibility */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/25 via-primary/8 to-background" />
        {/* Large blurred circle - more prominent */}
        <div className="absolute left-1/2 top-0 -z-10 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        {/* Secondary accent glow - enhanced */}
        <div className="absolute -right-20 top-40 h-[400px] w-[400px] rounded-full bg-chart-2/15 blur-3xl" />
        <div className="absolute -left-20 bottom-40 h-[300px] w-[300px] rounded-full bg-chart-3/15 blur-3xl" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.03]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8 lg:py-32">
        {/* Decorative side lines */}
        <div className="pointer-events-none absolute inset-y-0 left-4 hidden h-full w-px bg-border md:block lg:left-8">
          <div className="absolute top-20 h-40 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-4 hidden h-full w-px bg-border md:block lg:right-8">
          <div className="absolute top-20 h-40 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-8 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm shadow-sm backdrop-blur-sm">
              <span className="flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Verity Beta
              </span>
              <span className="text-muted-foreground">
                Free tool for anyone
              </span>
            </div>
          </motion.div>

          {/* Animated Headline with TextType */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex min-h-[4.5rem] w-full items-center justify-center md:min-h-[7rem] lg:min-h-[10rem]"
          >
            <h1
              id="hero-heading"
              className="w-full max-w-4xl text-balance text-center text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-7xl"
            >
              <TextType
                text={[
                  'Stop Losing Money on Medical Bills',
                  'Fight Insurance Denials & Underpayments',
                  'Find Billing Errors Instantly',
                ]}
                typingSpeed={60}
                deletingSpeed={40}
                pauseDuration={2500}
                initialDelay={300}
                loop={true}
                showCursor={true}
                cursorCharacter="_"
                cursorClassName="text-primary font-light"
                className="inline"
              />
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-center text-lg text-muted-foreground md:text-xl"
          >
            Medical bills are expensive. Sometimes you're overcharged.
            Sometimes insurance denies you unfairly. <span className="text-foreground font-medium">Verity fixes both.</span>
          </motion.p>


          {/* Analysis Engine Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              type: 'spring',
              stiffness: 50,
            }}
            className="relative mx-auto mt-16 max-w-5xl md:mt-20"
          >
            {/* Decorative glow effect */}
            <div
              className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-primary/20 via-chart-2/20 to-chart-3/20 opacity-50 blur-3xl"
              aria-hidden="true"
            />

            {/* Container with glassmorphism effect */}
            <div className="overflow-hidden rounded-3xl border border-border/50 bg-muted/30 p-3 shadow-2xl backdrop-blur-sm md:p-4">
              <AnalysisEngineViz />
            </div>

            {/* Floating decorative elements */}
            <div
              className="absolute -right-4 -top-4 h-10 w-10 rounded-xl border border-border/40 bg-background/80 p-2 shadow-lg backdrop-blur-md md:-right-6 md:-top-6 md:h-12 md:w-12 md:p-3"
              aria-hidden="true"
            >
              <div className="h-full w-full rounded-md bg-primary/20" />
            </div>
            <div
              className="absolute -bottom-3 -left-3 h-8 w-8 rounded-full border border-border/40 bg-background/80 shadow-lg backdrop-blur-md"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-4 right-10 h-9 w-9 rounded-xl border border-border/40 bg-background/80 p-2 shadow-lg backdrop-blur-md md:-bottom-6 md:right-12 md:h-10 md:w-10"
              aria-hidden="true"
            >
              <div className="h-full w-full rounded-md bg-chart-2/20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
