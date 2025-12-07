"use client";

import { SiteNavbar } from "@/components/SiteNavbar";
import { SiteFooter } from "@/components/SiteFooter";
import GradientHero from "@/components/mvpblocks/gradient-hero";
import { SituationGrid } from "@/components/SituationGrid";
import { ProcessTimeline } from "@/components/process_timeline";
import { RedFlagsShowcase } from "@/components/RedFlagsShowcase";
import { SuccessStories } from "@/components/SuccessStories";


export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background font-sans">
      {/* Navigation */}
      <SiteNavbar />

      {/* Hero Section */}
      <GradientHero className="pt-16 md:pt-20" />

      {/* Situation Grid - Dual Path Choice */}
      <SituationGrid />

      {/* Process Timeline Section */}
      <ProcessTimeline />

      {/* Red Flags Showcase Section */}
      <RedFlagsShowcase />

      {/* Success Stories Section */}
      <SuccessStories />

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
