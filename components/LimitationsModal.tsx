'use client';

import { useState, useEffect } from 'react';
import { X, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LimitationsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Modal explaining the limitations of Verity's analysis
 * Helps users understand why flags might be incorrect
 */
export default function LimitationsModal({ isOpen, onClose }: LimitationsModalProps) {
    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const limitations = [
        {
            title: 'AI-Based Analysis',
            description: 'Our analysis uses AI to identify potential billing errors. While highly accurate, AI can make mistakes and may flag items that are actually correct.',
        },
        {
            title: 'Missing Context',
            description: 'We only see what\'s on your bill. We don\'t have access to your full medical records, insurance policy details, or the specific circumstances of your care.',
        },
        {
            title: 'Regional Variations',
            description: 'Billing practices and pricing can vary significantly by region, hospital system, and insurance provider. Our benchmarks may not reflect your specific situation.',
        },
        {
            title: 'Complex Cases',
            description: 'Some medical situations are genuinely complex and may warrant higher-level billing codes. What looks like upcoding might be appropriate for your case.',
        },
        {
            title: 'Not Legal Advice',
            description: 'This analysis is for educational purposes only. It is not medical, legal, or financial advice. Always consult with qualified professionals before disputing charges.',
        },
    ];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="limitations-modal-title"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-4/20">
                            <AlertTriangle className="h-5 w-5 text-chart-4" />
                        </div>
                        <div>
                            <h2
                                id="limitations-modal-title"
                                className="text-lg font-semibold text-foreground"
                            >
                                Why This Might Be Wrong
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Important limitations to consider
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {limitations.map((item, index) => (
                        <div
                            key={index}
                            className="rounded-xl bg-muted/50 p-4 transition-colors hover:bg-muted/80"
                        >
                            <div className="mb-2 flex items-center gap-2">
                                <Info className="h-4 w-4 text-primary" />
                                <h3 className="font-medium text-foreground">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className={cn(
                            'rounded-lg px-4 py-2 text-sm font-medium',
                            'bg-primary text-primary-foreground',
                            'transition-all hover:bg-primary/90',
                            'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2'
                        )}
                    >
                        I Understand
                    </button>
                </div>
            </div>
        </div>
    );
}
