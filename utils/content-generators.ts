import { AnalysisResult } from "@/types";

/**
 * Formats a currency amount to USD string
 */
const formatCurrency = (amount: number | null): string => {
    if (amount === null) return "$0.00";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

/**
 * Generates the dynamic content for the Dispute Letter
 */
export const generateDisputeLetter = (data: AnalysisResult): string => {
    const providerName = data.provider_info?.name || "[Hospital/Provider Name]";
    const dateRange = data.provider_info?.dateOfService || "[DATE RANGE]";
    const accountNumber = data.provider_info?.accountNumber || "[ACCOUNT NUMBER]";
    const patientName = "[Patient Name]"; // In a real app we might have this from user context, but using placeholder as per request

    // Calculate total overcharge
    const totalOvercharge = data.red_flags.reduce((sum, flag) => sum + (flag.estimated_overcharge_usd || 0), 0);

    // Generate the list of charges to correct
    const chargesList = data.red_flags.map((flag, index) => {
        const title = flag.error_type;
        const amount = flag.estimated_overcharge_usd ? formatCurrency(flag.estimated_overcharge_usd) : "Unknown Amount";

        return `${index + 1}. ${title} (${amount})
   ${flag.layman_summary}`;
    }).join("\n\n");

    return `Dear ${providerName} Billing,

I'm writing about my bill from ${dateRange} 
(Account: ${accountNumber}).

I found ${data.red_flags.length} charges that need to be corrected:

${chargesList}

Total to remove: ${formatCurrency(totalOvercharge)}

Please send me a corrected bill. If you believe any of these 
charges are correct, please explain why in writing.

Thank you,
${patientName}
${accountNumber}`;
};

/**
 * Generates the dynamic content for the Phone Script
 */
export const generatePhoneScript = (data: AnalysisResult): string => {
    const accountNumber = data.provider_info?.accountNumber || "[ACCOUNT NUMBER]";

    // Calculate total overcharge
    const totalOvercharge = data.red_flags.reduce((sum, flag) => sum + (flag.estimated_overcharge_usd || 0), 0);

    const chargesBreakdown = data.red_flags.map((flag, index) => {
        const ordinal = index === 0 ? "First" : index === 1 ? "Second" : index === 2 ? "Third" : `Next`;
        const amount = flag.estimated_overcharge_usd ? formatCurrency(flag.estimated_overcharge_usd) : "the";

        return `${ordinal} issue: ${amount} for ${flag.error_type.toLowerCase()}. 
${flag.layman_summary}`;
    }).join("\n\n");

    return `"Hi, I'm calling about my bill, account ${accountNumber}. 
I have ${data.red_flags.length} charges I need to dispute, and I have a summary 
here. Can I walk you through them?

${chargesBreakdown}

Total I'm disputing: ${formatCurrency(totalOvercharge)}. Can you help me get 
these corrected?"`;
};
