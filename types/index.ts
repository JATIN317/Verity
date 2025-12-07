/**
 * Type definitions for Verity application
 */

/**
 * Represents a billing error or issue flagged by Verity's analysis
 */
export interface RedFlag {
    /** Unique identifier for the flag (e.g., "RF001") */
    flag_id: string;

    /** Severity level of the issue */
    severity: 'HIGH' | 'MEDIUM' | 'LOW';

    /** Estimated overcharge amount in USD, null if not calculable */
    estimated_overcharge_usd: number | null;

    /** Category/type of billing error */
    error_type: string;

    /** The specific charge item that was flagged */
    charge_item: string;

    /** Plain English explanation of the issue */
    layman_summary: string;

    /** The suspicious billing code, if applicable */
    suspicious_code?: string | null;

    /** Raw text snippet from the bill as evidence */
    raw_snippet: string;

    /** Technical justification for why this was flagged */
    justification: string;

    /** Confidence score as a percentage (0-100) */
    confidence_score: number;
}

/**
 * Summary of the bill audit
 */
export interface AuditSummary {
    /** Status of the audit */
    status: string;

    /** Total bill amount in USD */
    total_bill_amount: number;

    /** Estimated savings in USD */
    estimated_savings: number;

    /** Confidence level of the analysis (1-100) */
    confidence_level: number;
}

/**
 * Action plan for disputing the bill
 */
export interface ActionPlan {
    /** Priority steps to take */
    priority_steps: string[];

    /** Next step to focus on */
    next_step_focus: string;
}

/**
 * Analysis result from Verity's bill analysis
 */
export interface AnalysisResult {
    /** Summary of the audit */
    audit_summary: AuditSummary;

    /** List of red flags found in the bill */
    red_flags: RedFlag[];

    /** Action plan for dispute */
    action_plan: ActionPlan;

    /** Phone script for calling billing department */
    phone_script: string;

    /** Dispute letter text */
    dispute_letter_text: string;

    /** Additional notes or observations */
    notes: string | null;

    /** Provider information (optional, for display) */
    provider_info?: {
        name: string;
        address?: string;
        phone?: string;
        accountNumber?: string;
        dateOfService?: string;
        totalBilled?: string;
        insuranceBilled?: string;
        patientResponsibility?: string;
    };

    /** Detailed action plan (optional, for rich display) */
    detailed_action_plan?: Array<{
        step: number;
        icon: string;
        title: string;
        timeframe: string;
        script?: string;
        details?: string;
        letterTemplate?: string;
        tips?: string[];
        expectedOutcome?: string;
    }>;

    /** Clean bill message (optional, for clean bills) */
    clean_bill_message?: {
        verdict: string;
        message: string;
        details: string;
        tips?: Array<{
            title: string;
            description: string;
        }>;
    };
}

/**
 * Error response from analysis
 */
export interface AnalysisError {
    /** Error type identifier */
    error: string;

    /** Human-readable error notes */
    notes: string;

    /** Additional error details (optional) */
    error_details?: {
        errorMessage: string;
        errorExplanation: string;
        ocrConfidence?: string;
        minimumRequired?: string;
    };

    /** Suggestions for resolving the error (optional) */
    suggestions?: Array<{
        title: string;
        details: string;
        icon?: string;
        tips?: string[];
        recommendedApps?: string[];
        script?: string;
        requirements?: string[];
    }>;
}
