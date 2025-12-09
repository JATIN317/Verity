"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useResults } from "@/context/ResultsContext";
import { AnalysisResult, AnalysisError } from "@/types";
import { SiteNavbar } from "@/components/SiteNavbar";
import { SiteFooter } from "@/components/SiteFooter";
import { DisputeTimeline } from "@/components/DisputeTimeline";
import { VerifyWarning } from "@/components/VerifyWarning";
import { ResultErrorCard } from "@/components/ResultErrorCard";
import { generateDisputeLetter, generatePhoneScript } from "@/utils/content-generators";
import {
    AlertTriangle,
    CheckCircle2,
    TrendingUp,
    Copy,
    ArrowLeft,
    Info,
    Printer,
    Download,
    ArrowRight,
    Phone
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ResultsPage() {
    const router = useRouter();
    const { results } = useResults();
    const [copiedItem, setCopiedItem] = useState<string | null>(null);

    useEffect(() => {
        if (!results) {
            router.push("/analyze");
        }
    }, [results, router]);

    if (!results) {
        return null;
    }

    const isError = "error" in results;
    const data = results as AnalysisResult;
    const errorData = results as AnalysisError;

    const isFlagged = !isError && data.red_flags && data.red_flags.length > 0;
    const isClean = !isError && (!data.red_flags || data.red_flags.length === 0);

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedItem(label);
        setTimeout(() => setCopiedItem(null), 2000);
    };

    const handlePrint = () => {
        window.print();
    };

    const totalSavings = isFlagged
        ? data.red_flags.reduce((sum, flag) => sum + (flag.estimated_overcharge_usd || 0), 0)
        : 0;

    // Generate dynamic content
    // Use API-provided tailored content if available (verified tailored), otherwise fallback to local generator
    const disputeLetter = !isError && data.dispute_letter_text
        ? data.dispute_letter_text
        : (!isError ? generateDisputeLetter(data) : "");

    const phoneScript = !isError && data.phone_script
        ? data.phone_script
        : (!isError ? generatePhoneScript(data) : "");

    return (
        <div className="relative min-h-screen bg-background font-sans print:bg-white">
            <div className="print:hidden">
                <SiteNavbar />
            </div>

            <main className="container mx-auto px-4 pt-24 pb-16 max-w-5xl print:pt-4 print:pb-4 print:max-w-none">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/analyze")}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 print:hidden"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Upload Another Bill
                </button>

                {/* Error View */}
                {isError && (
                    <div className="space-y-6">
                        <div className="bg-card rounded-2xl border border-destructive/30 p-10 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
                                <AlertTriangle className="w-10 h-10 text-destructive" />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground mb-2">Analysis Incomplete</h1>
                            <p className="text-muted-foreground">Please upload a clearer image</p>
                        </div>

                        <div className="bg-card rounded-xl border border-border p-6">
                            <div className="flex items-start gap-4">
                                <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h2 className="text-xl font-bold text-foreground mb-2">What Happened?</h2>
                                    <p className="text-muted-foreground mb-4">{errorData.notes}</p>
                                    {errorData.error_details && (
                                        <p className="text-sm text-muted-foreground">{errorData.error_details.errorExplanation}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {errorData.suggestions && (
                            <div className="bg-card rounded-xl border border-border p-6">
                                <h2 className="text-xl font-bold text-foreground mb-4">How to Fix This</h2>
                                <div className="space-y-4">
                                    {errorData.suggestions.map((suggestion, index) => (
                                        <div key={index} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                                            <span className="text-2xl">{suggestion.icon || "💡"}</span>
                                            <div>
                                                <h3 className="font-semibold text-foreground">{suggestion.title}</h3>
                                                <p className="text-sm text-muted-foreground">{suggestion.details}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => router.push("/analyze")}
                            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all"
                        >
                            Try Another File
                        </button>
                    </div>
                )}

                {/* Clean Bill View */}
                {isClean && (
                    <div className="space-y-6">
                        <div className="bg-card rounded-2xl border border-primary/30 p-10 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                                <CheckCircle2 className="w-10 h-10 text-primary" />
                            </div>
                            <div className="text-6xl font-bold text-primary mb-4">0</div>
                            <h1 className="text-2xl font-bold text-foreground mb-2">Billing Errors Found</h1>
                            <p className="text-muted-foreground">This bill appears accurate</p>
                        </div>

                        <div className="bg-card rounded-xl border border-border p-6">
                            <div className="flex items-start gap-4">
                                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h2 className="text-xl font-bold text-foreground mb-2">
                                        {data.clean_bill_message?.verdict || "This bill looks clean"}
                                    </h2>
                                    <p className="text-muted-foreground">
                                        {data.clean_bill_message?.details || "The charges on this bill align with the services provided."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Analyze Another Bill CTA */}
                        <div className="pt-4 border-t border-border">
                            <button
                                onClick={() => router.push("/analyze")}
                                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Analyze Another Bill
                            </button>
                        </div>
                    </div>
                )}

                {/* Flagged Bill View */}
                {isFlagged && (
                    <div className="space-y-6">
                        {/* Savings Hero */}
                        <div className="bg-card rounded-2xl border border-primary/30 p-10 text-center relative overflow-hidden print:border-2 print:border-black">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl print:hidden" />
                            <div className="relative z-10">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center print:border print:border-black">
                                    <TrendingUp className="w-10 h-10 text-primary print:text-black" />
                                </div>
                                <div className="text-5xl md:text-6xl font-bold text-primary mb-4 print:text-black">
                                    ${totalSavings.toFixed(2)}
                                </div>
                                <h1 className="text-2xl font-bold text-foreground mb-2">Potential Savings</h1>
                                <p className="text-muted-foreground">
                                    Found {data.red_flags.length} billing error{data.red_flags.length !== 1 ? "s" : ""}
                                </p>
                            </div>
                        </div>

                        {/* Analyze Another Bill CTA - Prominent placement (Hidden on Print) */}
                        <button
                            onClick={() => router.push("/analyze")}
                            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 print:hidden"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Analyze Another Bill
                        </button>

                        {/* Provider Info */}
                        {data.provider_info && (
                            <div className="bg-card rounded-xl border border-border p-6 print:border-black">
                                <h2 className="text-lg font-bold text-foreground mb-4">Bill Information</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {[
                                        { label: "Provider", value: data.provider_info.name },
                                        { label: "Date of Service", value: data.provider_info.dateOfService },
                                        { label: "Account Number", value: data.provider_info.accountNumber },
                                        { label: "Phone", value: data.provider_info.phone },
                                        { label: "Total Billed", value: data.provider_info.totalBilled },
                                        { label: "Patient Responsibility", value: data.provider_info.patientResponsibility },
                                    ].map((item, i) => item.value && (
                                        <div key={i}>
                                            <div className="text-xs font-medium text-muted-foreground mb-1">{item.label}</div>
                                            <div className="text-sm font-semibold text-foreground">{item.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Red Flags / Errors */}
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-4">Billing Errors Found</h2>
                            <div className="space-y-4">
                                {data.red_flags.map((flag, index) => (
                                    <ResultErrorCard key={index} flag={flag} />
                                ))}
                            </div>
                        </div>

                        {/* Warning Callout (Moved here) */}
                        <div className="print:hidden">
                            <VerifyWarning />
                        </div>

                        {/* Action Plan */}
                        <div className="bg-card rounded-xl border border-border p-6 print:border-black">
                            <h2 className="text-2xl font-bold text-foreground mb-6">What To Do Next</h2>

                            {/* Steps */}
                            <div className="space-y-6">
                                {/* Step 1 */}
                                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl print:bg-transparent print:border print:border-gray-200">
                                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-xl flex-shrink-0 print:border print:border-black print:text-black print:bg-white">
                                        📞
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-bold text-foreground">Step 1: Call Billing Department</h3>
                                            <span className="text-xs text-muted-foreground">Timeline: Today or Tomorrow</span>
                                        </div>
                                        <div className="p-3 bg-background rounded-lg border border-border print:border-gray-300">
                                            <div className="text-xs font-medium text-muted-foreground mb-1">What to say:</div>
                                            <p className="text-sm text-foreground italic">
                                                &quot;Hi, I&apos;m calling about my bill, account {data.provider_info?.accountNumber || "[Number]"}.
                                                I have {data.red_flags.length} charges I need to dispute...&quot;
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl print:bg-transparent print:border print:border-gray-200">
                                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-xl flex-shrink-0 print:border print:border-black print:text-black print:bg-white">
                                        📋
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-bold text-foreground">Step 2: Request Itemized Bill</h3>
                                            <span className="text-xs text-muted-foreground">Timeline: Within 3-5 Days</span>
                                        </div>
                                        <div className="p-3 bg-background rounded-lg border border-border print:border-gray-300">
                                            <div className="text-xs font-medium text-muted-foreground mb-1">What to say:</div>
                                            <p className="text-sm text-foreground italic">
                                                &quot;Send me an itemized bill showing each service and charge.
                                                I need this to review the disputed items.&quot;
                                            </p>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            Why: Itemized bills show line-by-line details. Hospitals often remove charges when they have to explain them.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl print:bg-transparent print:border print:border-gray-200">
                                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-xl flex-shrink-0 print:border print:border-black print:text-black print:bg-white">
                                        ✉️
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-bold text-foreground">Step 3: Send Dispute Letter</h3>
                                            <span className="text-xs text-muted-foreground">Timeline: If not resolved within 15 Days</span>
                                        </div>
                                        <div className="p-3 bg-background rounded-lg border border-border print:border-gray-300">
                                            <div className="text-xs font-medium text-muted-foreground mb-1">Instruction:</div>
                                            <p className="text-sm text-foreground">
                                                Use the dispute letter below. Send via certified mail (keep the receipt—it proves you sent it).
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline Visual */}
                            <DisputeTimeline />
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4 print:hidden">
                            <TooltipProvider>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                onClick={() => handleCopy(disputeLetter, "Letter")}
                                                className="flex-1 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                                            >
                                                {copiedItem === "Letter" ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                                {copiedItem === "Letter" ? "Copied!" : "Copy Dispute Letter"}
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="max-w-xs bg-white text-zinc-950 border-zinc-200 shadow-xl">
                                            <p className="font-semibold">📝 Formal Dispute Letter</p>
                                            <p className="text-xs text-zinc-600 mt-1">
                                                A patient-first, conversational letter ready to send.
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                onClick={() => handleCopy(phoneScript, "Script")}
                                                className="flex-1 py-4 bg-card border border-border text-foreground rounded-xl font-semibold hover:bg-muted transition-all flex items-center justify-center gap-2"
                                            >
                                                {copiedItem === "Script" ? <CheckCircle2 className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
                                                {copiedItem === "Script" ? "Copied!" : "Copy Phone Script"}
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="max-w-xs bg-white text-zinc-950 border-zinc-200 shadow-xl">
                                            <p className="font-semibold">📞 Natural Phone Script</p>
                                            <p className="text-xs text-zinc-600 mt-1">
                                                Exactly what to say to the billing agent.
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </TooltipProvider>

                            {/* Download/Print Options */}
                            <div className="flex gap-4">
                                <button
                                    onClick={handlePrint}
                                    className="flex-1 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm"
                                >
                                    <Printer className="w-4 h-4" />
                                    Print Results
                                </button>
                                <button
                                    onClick={handlePrint} // Using print for now as "Download PDF" often just means Print to PDF
                                    className="flex-1 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm"
                                >
                                    <Download className="w-4 h-4" />
                                    Download PDF Report
                                </button>
                            </div>
                        </div>

                        {/* Appeal Cross-Sell CTA */}
                        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-6 relative overflow-hidden print:hidden">
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-lg font-bold text-foreground mb-1">Also Dealing With a Denial?</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Insurance rejected a claim? Verity can help you build an appeal letter with the same evidence-based approach.
                                    </p>
                                </div>
                                <button className="whitespace-nowrap px-6 py-3 bg-white dark:bg-zinc-900 border border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors flex items-center gap-2 shadow-sm">
                                    Build an Appeal Letter
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                    </div>
                )}
            </main>

            <div className="print:hidden">
                <SiteFooter />
            </div>
        </div>
    );
}

// Helper to remove any potential TS errors if I missed imports
// I imported everything I used.
