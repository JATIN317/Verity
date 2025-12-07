"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSearchParams } from "next/navigation";
import { SiteNavbar } from "@/components/SiteNavbar";
import { SiteFooter } from "@/components/SiteFooter";
import {
    Loader2,
    Copy,
    CheckCircle2,
    FileText,
    ArrowRight,
    ArrowLeft,
    ShieldCheck,
    AlertCircle,
    Calendar,
    Stethoscope,
    Phone,
    Gavel,
    Check
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

interface AppealData {
    date: string;
    service: string;
    hasEvidence: string; // "Yes", "No", "Unsure"
    denialReason: string;
    customDenialReason?: string;
    outcome: string;
    additionalDetails: string;
}

interface AppealResult {
    letter: string;
    script: string;
}

// ============================================================================
// Constants
// ============================================================================

const STEPS = [
    { number: 1, title: "The Denial" },
    { number: 2, title: "Evidence" },
    { number: 3, title: "Reason" },
    { number: 4, title: "Outcome" },
    { number: 5, title: "Details" },
];

const DENIAL_REASONS = [
    { id: "not_medically_necessary", label: "Not medically necessary" },
    { id: "experimental", label: "Experimental treatment" },
    { id: "not_covered", label: "Not covered under plan" },
    { id: "prior_auth", label: "Prior authorization required" },
    { id: "other", label: "Something else" },
];

const OUTCOMES = [
    "Full coverage of the claim",
    "Partial coverage",
    "Review the denial decision",
    "Not sure / Just fix it"
];

// ============================================================================
// Main Component Content
// ============================================================================

function AppealContent() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<AppealResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copiedItem, setCopiedItem] = useState<string | null>(null);

    // Form Data State
    const [formData, setFormData] = useState<AppealData>({
        date: "",
        service: "",
        hasEvidence: "",
        denialReason: "",
        customDenialReason: "",
        outcome: "",
        additionalDetails: ""
    });

    // Helpers
    const updateField = (field: keyof AppealData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (currentStep < 5) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedItem(label);
        setTimeout(() => setCopiedItem(null), 2000);
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setError(null);

        try {
            // Construct a comprehensive reason string for the API
            const fullReason = `
                Denial Reason: ${formData.denialReason === 'other' ? formData.customDenialReason : formData.denialReason}.
                Evidence Available: ${formData.hasEvidence}.
                Additional Details: ${formData.additionalDetails}.
                Date of Denial: ${formData.date}.
            `.trim();

            const response = await fetch("/api/appeal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    service: formData.service,
                    denialReason: fullReason,
                    urgency: "Standard", // Defaulting for wizard
                    desiredOutcome: [formData.outcome],
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.notes || "Failed to generate appeal.");
            }

            setResult(data);
        } catch (err) {
            console.error(err);
            setError("Something went wrong generating your appeal. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    // Demo Mode Handler
    const searchParams = useSearchParams();
    const isDemo = searchParams.get("demo") === "true";

    useEffect(() => {
        if (isDemo) {
            // Pre-fill with "Success Story" data
            setFormData({
                date: new Date().toISOString().split('T')[0], // Today
                service: "Post-Surgery Physical Therapy",
                hasEvidence: "Yes, I have documentation",
                denialReason: "not_medically_necessary",
                customDenialReason: "",
                outcome: "Full coverage of the claim",
                additionalDetails: "Surgeon prescribed PT 3x/week for rehab. Insurance claims only 1x/week is necessary, contradicting the standard of care for this procedure."
            });
        }
    }, [isDemo]);

    // ============================================================================
    // Render Functions
    // ============================================================================

    const renderStepIndicator = () => (
        <div className="flex items-center justify-between mb-8 px-2">
            {STEPS.map((step) => {
                const isActive = step.number === currentStep;
                const isCompleted = step.number < currentStep;

                return (
                    <div key={step.number} className="flex flex-col items-center relative z-10">
                        <div
                            className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2",
                                isActive && "bg-primary border-primary text-primary-foreground scale-110",
                                isCompleted && "bg-primary/20 border-primary text-primary",
                                !isActive && !isCompleted && "bg-card border-border text-muted-foreground"
                            )}
                        >
                            {isCompleted ? <Check className="w-4 h-4" /> : step.number}
                        </div>
                        <span className={cn(
                            "absolute -bottom-6 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap transition-colors",
                            isActive ? "text-primary" : "text-muted-foreground"
                        )}>
                            {step.title}
                        </span>
                    </div>
                );
            })}
            {/* Progress Bar Background */}
            <div className="absolute top-4 left-0 w-full h-0.5 bg-border -z-0 hidden md:block" />
            {/* Active Progress */}
            <div
                className="absolute top-4 left-0 h-0.5 bg-primary/30 -z-0 transition-all duration-300 hidden md:block"
                style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            />
        </div>
    );

    const renderWizard = () => (
        <div className="bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden backdrop-blur-sm">
            {/* Wizard Header */}
            <div className="bg-muted/30 px-6 py-4 border-b border-border/50 flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    Build Your Case
                    {isDemo && (
                        <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full border border-primary/20">
                            DEMO MODE
                        </span>
                    )}
                </span>
                <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                    Step {currentStep} of 5
                </span>
            </div>

            <div className="p-6 md:p-10">
                {renderStepIndicator()}

                <div className="mt-12 min-h-[300px]">
                    <AnimatePresence mode="wait">
                        {/* Step 1: The Denial */}
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h3 className="text-2xl font-bold text-foreground">Tell us about the denial</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                                            When did insurance deny your claim?
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                            <input
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => updateField("date", e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                                            What service were you denied for?
                                        </label>
                                        <div className="relative">
                                            <Stethoscope className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                            <input
                                                type="text"
                                                value={formData.service}
                                                onChange={(e) => updateField("service", e.target.value)}
                                                placeholder="e.g., MRI scan, Physical therapy, Surgery"
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl flex gap-3">
                                        <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-semibold text-foreground">Tip:</span> The more specific details you provide, the stronger your appeal letter will be.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Evidence */}
                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h3 className="text-2xl font-bold text-foreground">What's your evidence?</h3>
                                <p className="text-muted-foreground">Do you have medical documentation supporting this service? (e.g. doctor's notes)</p>

                                <div className="space-y-3">
                                    {["Yes, I have documentation", "No, but doctor recommended it", "I'm not sure"].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => updateField("hasEvidence", opt)}
                                            className={cn(
                                                "w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group",
                                                formData.hasEvidence === opt
                                                    ? "border-primary bg-primary/5 shadow-[0_0_10px_rgba(var(--primary),0.1)]"
                                                    : "border-border bg-background hover:border-primary/50"
                                            )}
                                        >
                                            <span className="font-medium">{opt}</span>
                                            {formData.hasEvidence === opt && <CheckCircle2 className="w-5 h-5 text-primary" />}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Reason */}
                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h3 className="text-2xl font-bold text-foreground">What did insurance say?</h3>

                                <div className="space-y-3">
                                    {DENIAL_REASONS.map((reason) => (
                                        <button
                                            key={reason.id}
                                            onClick={() => updateField("denialReason", reason.id)}
                                            className={cn(
                                                "w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between",
                                                formData.denialReason === reason.id
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border bg-background hover:border-primary/50"
                                            )}
                                        >
                                            <span className="font-medium">{reason.label}</span>
                                            {formData.denialReason === reason.id && <CheckCircle2 className="w-5 h-5 text-primary" />}
                                        </button>
                                    ))}
                                </div>

                                {formData.denialReason === "other" && (
                                    <input
                                        type="text"
                                        value={formData.customDenialReason}
                                        onChange={(e) => updateField("customDenialReason", e.target.value)}
                                        placeholder="Type the specific reason they gave..."
                                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all mt-4"
                                    />
                                )}
                            </motion.div>
                        )}

                        {/* Step 4: Outcome */}
                        {currentStep === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h3 className="text-2xl font-bold text-foreground">What do you want?</h3>

                                <div className="space-y-3">
                                    {OUTCOMES.map((out) => (
                                        <button
                                            key={out}
                                            onClick={() => updateField("outcome", out)}
                                            className={cn(
                                                "w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between",
                                                formData.outcome === out
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border bg-background hover:border-primary/50"
                                            )}
                                        >
                                            <span className="font-medium">{out}</span>
                                            {formData.outcome === out && <CheckCircle2 className="w-5 h-5 text-primary" />}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 5: Details */}
                        {currentStep === 5 && (
                            <motion.div
                                key="step5"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h3 className="text-2xl font-bold text-foreground">Anything else?</h3>
                                <p className="text-muted-foreground">Add any extra details that might help your case (optional).</p>

                                <textarea
                                    value={formData.additionalDetails}
                                    onChange={(e) => updateField("additionalDetails", e.target.value)}
                                    placeholder="e.g. 'I've been a loyal customer for 10 years' or 'The doctor said this was urgent'"
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-8 border-t border-border/50">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>

                    {currentStep < 5 ? (
                        <button
                            onClick={nextStep}
                            disabled={
                                (currentStep === 1 && !formData.service) ||
                                (currentStep === 2 && !formData.hasEvidence) ||
                                (currentStep === 3 && !formData.denialReason) ||
                                (currentStep === 4 && !formData.outcome)
                            }
                            className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20"
                        >
                            Next Step
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Building Case...
                                </>
                            ) : (
                                <>
                                    <Gavel className="w-4 h-4" />
                                    Build My Appeal
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    const renderResults = () => (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Success Banner */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 mb-4">
                    <ShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Appeal Letter Ready</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    We've built a custom legal argument based on your inputs. Review, edit if needed, and send it to your insurer.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Letter */}
                <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
                    <div className="bg-muted/30 px-6 py-4 border-b border-border flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold text-foreground">Formal Appeal Letter</h3>
                        </div>
                        <button
                            onClick={() => handleCopy(result!.letter, "letter")}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                        >
                            {copiedItem === "letter" ? (
                                <>
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5" /> Copy Text
                                </>
                            )}
                        </button>
                    </div>
                    <div className="p-6 max-h-[500px] overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm text-foreground/80 font-sans leading-relaxed">
                            {result?.letter}
                        </pre>
                    </div>
                </div>

                {/* Script */}
                <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
                    <div className="bg-muted/30 px-6 py-4 border-b border-border flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Phone className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold text-foreground">Phone Script</h3>
                        </div>
                        <button
                            onClick={() => handleCopy(result!.script, "script")}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                        >
                            {copiedItem === "script" ? (
                                <>
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5" /> Copy Text
                                </>
                            )}
                        </button>
                    </div>
                    <div className="p-6 max-h-[500px] overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm text-foreground/80 font-sans leading-relaxed">
                            {result?.script}
                        </pre>
                    </div>
                </div>
            </div>

            {/* Next Steps */}
            <div className="bg-card rounded-2xl border border-border p-8">
                <h3 className="text-xl font-bold mb-6">Next Steps</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { step: 1, text: "Review and customize the letter" },
                        { step: 2, text: "Print and send via certified mail" },
                        { step: 3, text: "Save the receipt & track response" },
                        { step: 4, text: "If denied, escalate to state" }
                    ].map((item) => (
                        <div key={item.step} className="p-4 rounded-xl bg-muted/30 border border-border/50">
                            <span className="block text-2xl font-bold text-primary/50 mb-2">0{item.step}</span>
                            <p className="text-sm font-medium">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={() => { setResult(null); setCurrentStep(1); }}
                    className="text-muted-foreground hover:text-foreground font-medium flex items-center gap-2 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Start New Appeal
                </button>
            </div>
        </div>
    );

    return (
        <div className="relative min-h-screen bg-background font-sans">
            <SiteNavbar />

            <main className="container mx-auto px-4 pt-24 pb-16">

                {/* Hero Section */}
                {!result && (
                    <header className="max-w-4xl mx-auto text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                                Denied Doesn't Mean <span className="text-primary">Dead.</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Insurance companies deny claims all the time—for vague reasons or plain mistakes.
                                But denial isn't final. You have the right to appeal. Verity shows you how.
                            </p>
                        </motion.div>
                    </header>
                )}

                {!result && (
                    <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto">

                        {/* Left Column: Success Story & Info */}
                        <div className="lg:col-span-5 space-y-8">
                            {/* Success Story Card */}
                            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                                <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" />
                                    Success Story
                                </h3>
                                <div className="space-y-4">
                                    <h4 className="text-xl font-bold">"Not Medically Necessary" reversed.</h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        A patient was denied coverage for physical therapy after surgery.
                                        Insurance said it wasn't necessary. The patient used Verity to cite the surgeon’s
                                        discharge notes.
                                    </p>
                                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                        <p className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                                            Result: $4,200 covered. Denial overturned.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-card rounded-2xl border border-border text-center">
                                    <span className="block text-3xl font-bold text-foreground">30-60</span>
                                    <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1 block">Days to Resolve</span>
                                </div>
                                <div className="p-6 bg-card rounded-2xl border border-border text-center">
                                    <span className="block text-3xl font-bold text-foreground">~70%</span>
                                    <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1 block">Success Rate</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Wizard Form */}
                        <div className="lg:col-span-7">
                            {renderWizard()}
                        </div>
                    </div>
                )}

                {/* Results View */}
                {result && (
                    <div className="max-w-5xl mx-auto">
                        {renderResults()}
                    </div>
                )}

            </main>

            <SiteFooter />
        </div>
    );
}

// Wrapper to provide Suspense boundary
export default function AppealPage() {
    return (
        <React.Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        }>
            <AppealContent />
        </React.Suspense>
    );
}
