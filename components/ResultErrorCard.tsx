import { RedFlag } from "@/types";
// Local helper for currency formatting 
// Actually I'll just keep the helper local here or use the one from utils if general enough.
// The types.ts didn't seem to export a currency formatter, but I'll write a simple one.

const formatMoney = (amount: number | null) => {
    if (amount === null) return "$0.00";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

interface ResultErrorCardProps {
    flag: RedFlag;
}

export const ResultErrorCard = ({ flag }: ResultErrorCardProps) => {
    return (
        <div className={`bg-card rounded-xl border p-6 ${flag.severity === "HIGH"
            ? "border-destructive/30"
            : flag.severity === "MEDIUM"
                ? "border-amber-500/30"
                : "border-primary/30"
            }`}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${flag.severity === "HIGH"
                        ? "bg-destructive/10"
                        : flag.severity === "MEDIUM"
                            ? "bg-amber-500/10"
                            : "bg-primary/10"
                        }`}>
                        🚨
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-foreground">{flag.error_type}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${flag.severity === "HIGH"
                                ? "bg-destructive/10 text-destructive"
                                : flag.severity === "MEDIUM"
                                    ? "bg-amber-500/10 text-amber-600"
                                    : "bg-primary/10 text-primary"
                                }`}>
                                {flag.severity}
                            </span>
                        </div>
                    </div>
                </div>
                {flag.estimated_overcharge_usd && (
                    <div className="text-right">
                        <div className="text-2xl font-bold text-destructive">
                            {formatMoney(flag.estimated_overcharge_usd)}
                        </div>
                        <div className="text-xs text-muted-foreground">Overcharge</div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Evidence Section */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">What You Were Charged</h4>
                    <div className="space-y-1 font-mono text-sm text-foreground/80">
                        <div className="flex justify-between items-center pb-2 border-b border-dashed border-border/50">
                            <span className="truncate pr-4">{flag.charge_item || "Original Charge"}</span>
                            <span>{flag.estimated_overcharge_usd ? formatMoney(flag.estimated_overcharge_usd + 0) : "$--.--"}</span>
                            {/* Note: Logic for 'Original Charge' vs 'Overcharge' might need clarification, 
                                but typically the overcharge is the delta or whole amount. 
                                Using overcharge amount here as a proxy for the line item for now. */}
                        </div>
                        {/* We might not have the breakdown of charge vs surcharge in the simple RedFlag model without 'related_charges'
                            so we'll improvise with available data. The user prompt example had multiple line items. 
                            Since our data model is dynamic, we'll try to parse the 'raw_snippet' or just show the single line item. 
                        */}
                    </div>
                    <div className="mt-2 flex justify-between items-center font-bold text-destructive">
                        <span>Total Overcharge</span>
                        <span>{formatMoney(flag.estimated_overcharge_usd)}</span>
                    </div>
                </div>

                {/* Explanation Section */}
                <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Why This Is Wrong</h4>
                    <p className="text-sm text-foreground leading-relaxed">
                        {flag.layman_summary}
                    </p>
                </div>
            </div>
        </div>
    );
};
