"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Play, AlertTriangle, CheckCircle, FileWarning, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useResults } from "@/context/ResultsContext";
import { cn } from "@/lib/utils";

/**
 * Demo Dropdown Component
 * 
 * Allows users to test the analysis with pre-built demo scenarios
 * directly from the hero section.
 */

const demoOptions = [
    {
        type: 'flagged' as const,
        icon: AlertTriangle,
        iconColor: 'text-destructive',
        bgColor: 'bg-destructive/10',
        title: 'See Flagged Bill',
        description: 'Errors found - $847 in overcharges',
        filename: 'demo_flagged.pdf'
    },
    {
        type: 'clean' as const,
        icon: CheckCircle,
        iconColor: 'text-primary',
        bgColor: 'bg-primary/10',
        title: 'See Clean Bill',
        description: 'No issues detected',
        filename: 'demo_clean.pdf'
    },
    {
        type: 'blurry' as const,
        icon: FileWarning,
        iconColor: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
        title: 'See Error Handling',
        description: 'How we handle poor quality uploads',
        filename: 'demo_blurry.pdf'
    },
    {
        type: 'appeal' as const,
        icon: ShieldCheck, // Need to import this
        iconColor: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        title: 'Appeal a Denial',
        description: 'See how we reverse unfair claims',
        filename: 'demo_appeal' // Special case handling
    }
];

export function DemoDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { setResults } = useResults();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = async (option: typeof demoOptions[0]) => {
        setIsLoading(option.type);

        // Special handling for Appeal Demo
        if (option.type === 'appeal') {
            await new Promise(resolve => setTimeout(resolve, 800)); // Fake loader
            router.push('/appeal?demo=true');
            setIsOpen(false);
            setIsLoading(null);
            return;
        }

        // Create a dummy file with the demo filename
        const blob = new Blob(['demo'], { type: 'application/pdf' });
        const file = new File([blob], option.filename, { type: 'application/pdf' });

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/analyze', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            setResults(data);
            setIsOpen(false);
            router.push('/results');
        } catch (error) {
            console.error('Demo failed:', error);
            setIsLoading(null);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex w-48 items-center justify-center gap-2 rounded-lg border border-border",
                    "bg-background/50 px-6 py-3 font-medium backdrop-blur-sm",
                    "transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent",
                    isOpen && "bg-accent"
                )}
            >
                <Play className="h-4 w-4" aria-hidden="true" />
                <span>Test It</span>
                <ChevronDown
                    className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}
                />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop for mobile */}
                    <div
                        className="fixed inset-0 z-40 bg-background/20 backdrop-blur-sm sm:hidden"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown menu */}
                    <div
                        className={cn(
                            "absolute top-full left-1/2 z-50 mt-2 w-72 -translate-x-1/2",
                            "overflow-hidden rounded-xl border border-border bg-card shadow-xl",
                            "animate-in fade-in slide-in-from-top-2 duration-200"
                        )}
                    >
                        <div className="p-2">
                            <p className="mb-2 px-3 pt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Try a Demo
                            </p>
                            {demoOptions.map((option) => {
                                const Icon = option.icon;
                                const loading = isLoading === option.type;

                                return (
                                    <button
                                        key={option.type}
                                        onClick={() => handleSelect(option)}
                                        disabled={loading}
                                        className={cn(
                                            "w-full rounded-lg px-3 py-3 text-left",
                                            "transition-colors hover:bg-muted",
                                            loading && "opacity-70 cursor-wait"
                                        )}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={cn(
                                                "flex h-9 w-9 items-center justify-center rounded-lg",
                                                option.bgColor
                                            )}>
                                                <Icon className={cn("h-4 w-4", option.iconColor)} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-sm text-foreground">
                                                    {loading ? "Loading..." : option.title}
                                                </div>
                                                <div className="text-xs text-muted-foreground truncate">
                                                    {option.description}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default DemoDropdown;
