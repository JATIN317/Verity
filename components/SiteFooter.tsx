'use client';

import Link from 'next/link';
import { VerityLogo } from '@/components/ui/verity-logo';

/**
 * Site Footer Component
 * 
 * Glassmorphism design with Verity branding.
 * Left: Brand description + logo
 * Right: Navigation links (Appeal, About, FAQ, Contact)
 */

// Footer navigation links
const footerLinks = [
    { name: 'Analyze', href: '/analyze' },
    { name: 'Appeal', href: '/appeal' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
];

export function SiteFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 mt-16 w-full overflow-hidden pb-8 pt-16">
            {/* Background glow effects - using primary (emerald) colors */}
            <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-full w-full -translate-x-1/2 select-none">
                <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            </div>

            {/* Glass container */}
            <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 rounded-2xl border border-border/50 bg-card/60 px-8 py-12 backdrop-blur-sm md:flex-row md:items-start md:justify-between lg:px-12">

                {/* Left side: Brand + Description */}
                <div className="flex max-w-md flex-col items-center md:items-start">
                    {/* Logo and Brand Name */}
                    <Link
                        href="/"
                        className="mb-5 flex items-center gap-3 transition-opacity hover:opacity-80"
                    >
                        <VerityLogo className="h-10 w-10 text-primary" withText={false} />
                        <span className="text-xl font-bold tracking-tight text-foreground">
                            Verity
                        </span>
                    </Link>

                    {/* Description */}
                    <p className="mb-6 text-center text-sm leading-relaxed text-muted-foreground md:text-left">
                        AI-powered medical bill analysis that helps you identify errors,
                        fight back against overcharges, and save money on healthcare costs.
                        Your advocate in navigating complex medical billing.
                    </p>

                    {/* Trust indicator */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-4 w-4 text-primary"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                            />
                        </svg>
                        <span>We do not store your uploaded files</span>
                    </div>
                </div>

                {/* Right side: Navigation Links */}
                <nav className="flex flex-col items-center md:items-end">
                    <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
                        Navigation
                    </div>
                    <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 md:flex-col md:items-end md:gap-y-4">
                        {footerLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Educational Disclaimer - Prominent placement for compliance */}
            <div className="relative z-10 mx-auto mt-8 max-w-4xl px-4">
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5 flex-shrink-0 text-amber-500 mt-0.5"
                        >
                            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                        </svg>
                        <div className="text-xs leading-relaxed text-amber-700 dark:text-amber-400">
                            <p className="font-semibold mb-1">Educational Tool Only</p>
                            <p className="text-amber-600 dark:text-amber-500">
                                Verity is an AI-powered educational tool designed to help you understand medical billing.
                                <strong> This is not legal, medical, or financial advice.</strong> Results are AI-generated and may contain errors.
                                Always verify findings with your healthcare provider, insurance company, or a qualified professional
                                before taking any action on your bills.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="relative z-10 mt-6 text-center text-xs text-muted-foreground">
                <span>&copy; {currentYear} Verity. All rights reserved.</span>
                <span className="mx-2 hidden sm:inline">·</span>
                <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                >
                    Privacy Policy
                </Link>
            </div>
        </footer>
    );
}

export default SiteFooter;
