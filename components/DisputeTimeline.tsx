import { Phone, FileText, Mail, CheckCircle2 } from "lucide-react";

export const DisputeTimeline = () => {
    return (
        <div className="bg-card rounded-xl border border-border p-6 mt-8">
            <h3 className="text-lg font-bold text-foreground mb-6 text-center">Your Dispute Timeline</h3>

            <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-muted z-0"></div>

                {/* Connecting Line (Mobile) */}
                <div className="md:hidden absolute top-6 bottom-6 left-[28px] w-0.5 bg-muted z-0"></div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                    {/* Step 1 */}
                    <div className="flex flex-row md:flex-col items-start md:items-center gap-4 md:gap-2">
                        <div className="w-14 h-14 bg-background border-2 border-primary text-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div className="text-left md:text-center pt-1 md:pt-0">
                            <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Today</div>
                            <h4 className="font-bold text-foreground mb-1">Call Billing</h4>
                            <p className="text-xs text-muted-foreground">Start the conversation</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-row md:flex-col items-start md:items-center gap-4 md:gap-2">
                        <div className="w-14 h-14 bg-background border-2 border-muted-foreground/30 text-muted-foreground rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div className="text-left md:text-center pt-1 md:pt-0">
                            <div className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">3-5 Days</div>
                            <h4 className="font-bold text-foreground mb-1">Request Details</h4>
                            <p className="text-xs text-muted-foreground">Get itemized bill</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-row md:flex-col items-start md:items-center gap-4 md:gap-2">
                        <div className="w-14 h-14 bg-background border-2 border-muted-foreground/30 text-muted-foreground rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div className="text-left md:text-center pt-1 md:pt-0">
                            <div className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">15 Days</div>
                            <h4 className="font-bold text-foreground mb-1">Send Letter</h4>
                            <p className="text-xs text-muted-foreground">Formal dispute</p>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex flex-row md:flex-col items-start md:items-center gap-4 md:gap-2">
                        <div className="w-14 h-14 bg-background border-2 border-muted-foreground/30 text-muted-foreground rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div className="text-left md:text-center pt-1 md:pt-0">
                            <div className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">30-60 Days</div>
                            <h4 className="font-bold text-foreground mb-1">Get Response</h4>
                            <p className="text-xs text-muted-foreground">Resolution reached</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                    <span className="font-semibold text-foreground">Why this matters:</span> Showing that you are prepared for a formal process often motivates hospitals to fix errors earlier to avoid the paperwork.
                </p>
            </div>
        </div>
    );
};
