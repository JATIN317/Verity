"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, AlertCircle, CheckCircle2, Check, Circle, Loader } from "lucide-react";
import { SiteNavbar } from "@/components/SiteNavbar";
import { SiteFooter } from "@/components/SiteFooter";
import { useResults } from "@/context/ResultsContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

// Loading Steps
const LOADING_STEPS = [
    { label: "Reading your document", threshold: 25 },
    { label: "Identifying line items", threshold: 50 },
    { label: "Checking against billing rules", threshold: 75 },
    { label: "Generating your report", threshold: 95 },
];

// Educational Tips
const ANALYSIS_TIPS = [
    "💡 Upcoding is when hospitals bill for a higher complexity level than the service provided.",
    "💡 Unbundling is when separate fees are charged for parts of a procedure that should be billed together.",
    "💡 Duplicate charges are the most common billing error, affecting up to 25% of bill statements.",
    "💡 You have the right to request an itemized bill for every medical visit, free of charge."
];

export default function AnalyzePage() {
    const router = useRouter();
    const { setResults } = useResults();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Analysis State
    const [progress, setProgress] = useState(0);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const progressInterval = useRef<NodeJS.Timeout | null>(null);
    const tipInterval = useRef<NodeJS.Timeout | null>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setError(null);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            // Validate file type
            const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
            if (validTypes.includes(file.type)) {
                setSelectedFile(file);
                setError(null);
            } else {
                setError("Please upload a PDF, JPG, or PNG file.");
            }
        }
    };

    const startAnalysisSimulation = () => {
        setProgress(0);
        setCurrentStepIndex(0);
        setCurrentTipIndex(0);

        // Progress Timer
        progressInterval.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 90) return prev; // Hold at 90% until complete

                // Update step index based on new progress
                const nextProgress = prev + 1;
                const nextStep = LOADING_STEPS.findIndex(s => s.threshold > nextProgress);
                if (nextStep !== -1 && nextStep !== currentStepIndex) {
                    setCurrentStepIndex(nextStep);
                }

                return nextProgress;
            });
        }, 150); // ~15 seconds to 90%

        // Tip Timer
        tipInterval.current = setInterval(() => {
            setCurrentTipIndex((prev) => (prev + 1) % ANALYSIS_TIPS.length);
        }, 3000);
    };

    const stopAnalysisSimulation = () => {
        if (progressInterval.current) clearInterval(progressInterval.current);
        if (tipInterval.current) clearInterval(tipInterval.current);
    };

    const analyzeBill = async () => {
        if (!selectedFile) return;

        setIsAnalyzing(true);
        setError(null);
        startAnalysisSimulation();

        // Timeout safety
        const timeoutId = setTimeout(() => {
            if (isAnalyzing) {
                setError("Analysis timed out. Please try again with a smaller file or clearer image.");
                setIsAnalyzing(false);
                stopAnalysisSimulation();
            }
        }, 45000); // 45s hard cap

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);

            const response = await fetch("/api/analyze", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            clearTimeout(timeoutId);
            stopAnalysisSimulation();

            if (!response.ok) {
                setError(data.notes || "Analysis failed due to a server error.");
                setIsAnalyzing(false);
                return;
            }

            // Success!!
            setProgress(100);
            setCurrentStepIndex(LOADING_STEPS.length - 1);

            // Brief delay to show 100%
            setTimeout(() => {
                setResults(data);
                router.push("/results");
            }, 800);

        } catch (err) {
            console.error("Analysis failed:", err);
            clearTimeout(timeoutId);
            stopAnalysisSimulation();
            setError("Analysis failed. Please check your connection and try again.");
            setIsAnalyzing(false);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => stopAnalysisSimulation();
    }, []);

    return (
        <div className="relative min-h-screen bg-background font-sans">
            <SiteNavbar />

            <main className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
                {!isAnalyzing ? (
                    /* ORIGINAL UPLOAD VIEW */
                    <>
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                Upload Your Medical Bill
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                We&apos;ll analyze it for errors, upcoding, and duplicate charges in seconds.
                            </p>
                        </div>

                        <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`
              relative flex flex-col items-center justify-center p-6 md:p-12 
              border-2 border-dashed rounded-xl 
              transition-all duration-300 cursor-pointer
              ${isDragging
                                        ? "border-primary bg-primary/10"
                                        : selectedFile
                                            ? "border-primary/50 bg-primary/5"
                                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                                    }
            `}
                            >
                                <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={handleFileSelect}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    id="file-upload"
                                />

                                {selectedFile ? (
                                    <>
                                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                                            <CheckCircle2 className="w-8 h-8 text-primary" />
                                        </div>
                                        <span className="text-lg font-semibold text-foreground mb-2">
                                            {selectedFile.name}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedFile(null);
                                            }}
                                            className="mt-4 text-sm text-primary hover:underline"
                                        >
                                            Choose a different file
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                            <Upload className="w-8 h-8 text-muted-foreground" />
                                        </div>
                                        <span className="text-lg font-semibold text-foreground mb-2">
                                            Click to upload or drag and drop
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            PDF, JPG, PNG up to 20MB
                                        </span>
                                    </>
                                )}
                            </div>

                            <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg border border-border/50">
                                <span className="mt-0.5">💡</span>
                                <p>
                                    <span className="font-semibold text-foreground">Tip:</span> Your bill can be a hospital invoice, EOB statement, or any medical billing document.
                                </p>
                            </div>

                            {error && (
                                <div className="mt-6 flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                                    <p className="text-sm text-destructive">{error}</p>
                                </div>
                            )}

                            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={analyzeBill}
                                    disabled={!selectedFile}
                                    className={`
                px-8 py-4 rounded-xl font-semibold text-lg
                transition-all duration-300 
                flex items-center justify-center gap-2
                ${selectedFile
                                            ? "bg-primary text-primary-foreground hover:opacity-90 shadow-lg"
                                            : "bg-muted text-muted-foreground cursor-not-allowed"
                                        }
              `}
                                >
                                    <FileText className="w-5 h-5" />
                                    Analyze Bill
                                </button>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                                    <span className="text-[10px]">🔒</span>
                                    Your bill is analyzed instantly and then deleted. We don&apos;t store or sell your data.
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    /* ANALYZING VIEW */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card rounded-2xl shadow-xl border border-border p-8 md:p-12 text-center max-w-2xl mx-auto"
                    >
                        <div className="mb-8">
                            <span className="text-4xl animate-pulse">✨</span>
                            <h2 className="text-2xl font-bold mt-4 tracking-tight">ANALYZING YOUR BILL</h2>
                        </div>

                        {/* Steps */}
                        <div className="space-y-4 mb-10 text-left max-w-sm mx-auto">
                            {LOADING_STEPS.map((step, index) => {
                                const isComplete = progress > step.threshold;
                                const isActive = !isComplete && (index === 0 || progress > LOADING_STEPS[index - 1].threshold);
                                const isPending = !isComplete && !isActive;

                                return (
                                    <div
                                        key={index}
                                        className={cn(
                                            "flex items-center gap-3 transition-colors duration-300",
                                            isActive && "text-foreground font-medium",
                                            isComplete && "text-muted-foreground/50",
                                            isPending && "text-muted-foreground/30"
                                        )}
                                    >
                                        {isComplete ? (
                                            <Check className="w-5 h-5 text-primary shrink-0" />
                                        ) : isActive ? (
                                            <Loader className="w-4 h-4 text-primary animate-spin shrink-0" />
                                        ) : (
                                            <Circle className="w-4 h-4 shrink-0" />
                                        )}
                                        <span>{step.label}</span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Progress Bar */}
                        <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden mb-8">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-primary"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ type: "spring", stiffness: 50 }}
                            />
                        </div>

                        {/* Rotating Tips */}
                        <div className="bg-muted/30 p-4 rounded-xl border border-border/50 min-h-[100px] flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={currentTipIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-sm font-medium text-muted-foreground"
                                >
                                    {ANALYSIS_TIPS[currentTipIndex]}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}

                {/* Info Section (Only show when not analyzing) */}
                {!isAnalyzing && (
                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🔍</span>
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">AI-Powered Analysis</h3>
                            <p className="text-sm text-muted-foreground">
                                Our AI scans for duplicate charges, upcoding, and billing errors
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">💰</span>
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">Find Savings</h3>
                            <p className="text-sm text-muted-foreground">
                                Identify overcharges and get exact amounts to dispute
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📋</span>
                            </div>
                            <h3 className="font-semibold text-foreground mb-2">Ready-to-Use Tools</h3>
                            <p className="text-sm text-muted-foreground">
                                Get dispute letters and templates to push back immediately
                            </p>
                        </div>
                    </div>
                )}
            </main>

            <SiteFooter />
        </div>
    );
}
