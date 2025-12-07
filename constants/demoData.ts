// Demo mode constants for Verity Bill Analyzer
// Comprehensive demo data matching final specifications

export const DEMO_RESULTS_FLAGGED = {
    // API-compatible structure (for consistency with real results)
    audit_summary: {
        status: "Potentially Disputable Items Found",
        total_bill_amount: 2847.50,
        estimated_savings: 627.50,
        confidence_level: 95
    },
    red_flags: [
        {
            flag_id: "RF004",
            error_type: "Duplicate Facility Charge",
            charge_item: "Emergency Room Facility Fee",
            raw_snippet: "Line Item 12: FACILITY FEE - ER....................$350.00 (11/15/2024)\nLine Item 15: FACILITY FEE - ER....................$350.00 (11/15/2024)",
            suspicious_code: "99213",
            severity: "HIGH",
            estimated_overcharge_usd: 350.00,
            confidence_score: 98,
            layman_summary: "You're being charged twice for the same thing.",
            justification: "Two identical facility fee line items appear on the same statement for the same date of service, indicating a duplicate charge."
        },
        {
            flag_id: "RF003",
            error_type: "Out-of-Network Surprise",
            charge_item: "Radiologist Services - Dr. Sarah Chen",
            raw_snippet: "RADIOLOGY - DR. SARAH CHEN - OUT-OF-NETWORK.........$187.50",
            suspicious_code: "70450",
            severity: "HIGH",
            estimated_overcharge_usd: 187.50,
            confidence_score: 92,
            layman_summary: "A doctor you didn't choose was out-of-network, and you shouldn't have to pay extra.",
            justification: "Radiologist billed as out-of-network despite appearing in your network directory. Out-of-network charges are typically 2-3x higher."
        },
        {
            flag_id: "RF005",
            error_type: "Unbundling Error",
            charge_item: "Office Visit Codes",
            raw_snippet: "CPT 99213 - Office Visit (Established).............$45.00\nCPT 99214 - Office Visit (Established).............$45.00",
            suspicious_code: "99213,99214",
            severity: "MEDIUM",
            estimated_overcharge_usd: 90.00,
            confidence_score: 88,
            layman_summary: "Regular services are being billed separately when they should be bundled together.",
            justification: "Two CPT codes appear to be billed separately that should be bundled together per insurance guidelines. Unbundling inflates bills."
        }
    ],
    action_plan: {
        priority_steps: [
            "Contact billing department within 30 days and reference the three identified errors",
            "Request itemized bill adjustment for duplicate facility fee ($350.00)",
            "File No Surprises Act claim for out-of-network charge ($187.50)",
            "Dispute unbundled service charges as included in primary visit code"
        ],
        next_step_focus: "Call billing department immediately to address duplicate facility fee"
    },
    phone_script: "Hi, I have a question about my recent bill from 11/15/24, account #ACC-12345678. I see two facility charges of $350 each on lines 12 and 15 for the same procedure on the same date. This appears to be a duplicate charge. Can you help me understand why I'm being charged twice and resolve this?",
    dispute_letter_text: "[Full dispute letter template - see action plan section]",
    notes: "This is a demo analysis showing common billing errors. In a real scenario, verify all amounts and dates on your actual bill before disputing.",

    // Demo-specific enhanced fields for rich UI display
    demo_metadata: {
        type: "flagged",
        fileUploaded: "demo_flagged.pdf",
        totalSavings: "$627.50",
        flagCount: 3,
        confidence: "High",
        analysisTime: "2s (demo)"
    },

    provider_info: {
        name: "St. Mary's Medical Center",
        address: "123 Healthcare Blvd, Boston, MA 02108",
        phone: "(555) 123-4567",
        phoneExtension: "ext. 2",
        accountNumber: "ACC-12345678",
        dateOfService: "November 15, 2024",
        totalBilled: "$2,847.50",
        insuranceBilled: "$2,220.00",
        patientResponsibility: "$627.50"
    },

    detailed_action_plan: [
        {
            step: 1,
            icon: "📞",
            title: "Call Billing Department",
            timeframe: "Today or tomorrow",
            phone: "(555) 123-4567 ext. 2",
            accountRef: "ACC-12345678",
            script: "Hi, I have a question about my recent bill from 11/15/24. I see two facility charges of $350 each (lines 12 and 15) for the same procedure on the same date. Can you help me understand why I'm being charged twice? This seems like a duplicate charge. What can we do to resolve this?",
            tips: [
                "Have your bill handy with account number ready",
                "Be polite but firm - billing errors are common",
                "Ask for a supervisor if the first person can't help",
                "Get the name of the person you spoke with and note the time",
                "Ask for a reference number for your call"
            ],
            expectedOutcome: "Billing department confirms it's a duplicate and removes one $350 charge immediately"
        },
        {
            step: 2,
            icon: "📋",
            title: "Request Itemized Bill",
            timeframe: "Within 3-5 days",
            script: "When you call back or follow up, ask: 'Could you send me an itemized statement that breaks down exactly what each charge represents? I want to verify that the CPT codes match the services I received.'",
            details: "Federal law (Affordable Care Act) requires hospitals to provide itemized bills within 30 days of request. This detailed breakdown often reveals additional errors.",
            expectedOutcome: "You receive detailed breakdown showing what you actually received vs. what was charged, helping identify any other discrepancies"
        },
        {
            step: 3,
            icon: "✉️",
            title: "Send Dispute Letter (If Needed)",
            timeframe: "If not resolved within 15 days",
            details: "Use our template below. Send via certified mail with return receipt to create a paper trail.",
            letterTemplate: `[Your Name]
[Your Address]
[City, State ZIP]
[Date]

St. Mary's Medical Center
Billing Department
123 Healthcare Blvd
Boston, MA 02108

Re: Formal Dispute of Charges - Account #ACC-12345678, Date of Service: November 15, 2024

Dear Billing Department,

I am writing to formally dispute charges on my account referenced above. After reviewing my bill, I have identified the following errors:

1. DUPLICATE FACILITY FEE ($350.00)
   - Line Item 12: $350 facility charge (dated 11/15/2024)
   - Line Item 15: $350 facility charge (dated 11/15/2024)
   - Issue: Both charges appear to be for the same procedure. Facility fees should only be charged once per procedure per date.
   - Request: Remove one duplicate charge ($350.00)

2. OUT-OF-NETWORK CHARGE - Radiologist Dr. Sarah Chen ($187.50)
   - Billed as: Out-of-network provider
   - Issue: Dr. Chen appears in my insurance network directory for UnitedHealth in the Boston area
   - Request: Rebill as in-network rate or provide documentation explaining why marked out-of-network
   - Note: If this was truly out-of-network emergency care, I should be protected under the No Surprises Act

3. UNBUNDLING ERROR - Office Visit Codes ($90.00)
   - CPT codes 99213 and 99214 both billed
   - Issue: Insurance guidelines indicate these should be a single code, not double-billed
   - Request: Clarify which code applies or combine into single appropriate charge

TOTAL DISPUTED AMOUNT: $627.50

I respectfully request:
1. A detailed written explanation of each disputed charge
2. Documentation that separate services were rendered to justify all charges
3. Refund or adjustment of duplicate and erroneous charges totaling $627.50

Please respond within 30 days with your resolution.

Sincerely,
[Your Signature]
[Your Name]
[Your Contact Phone]
[Your Email]`,
            nextStep: "Wait 30 days for response. If no resolution, escalate to insurance company and patient advocate."
        }
    ],

    action_bar: {
        copyLetter: {
            icon: "📋",
            text: "Copy Dispute Letter",
            action: "copy_letter_to_clipboard",
            tooltip: "Copy the full dispute letter to your clipboard"
        },
        emailBilling: {
            icon: "✉️",
            text: "Email Billing",
            action: "open_mailto_with_letter",
            tooltip: "Open email client with pre-filled letter"
        },
        downloadPDF: {
            icon: "📥",
            text: "Download Package",
            action: "download_all_as_pdf",
            tooltip: "Download analysis report, letter, and scripts as PDF"
        }
    }
};

export const DEMO_RESULTS_CLEAN = {
    // API-compatible structure
    audit_summary: {
        status: "No Disputable Items Identified",
        total_bill_amount: 1245.00,
        estimated_savings: 0.00,
        confidence_level: 100
    },
    red_flags: [],
    action_plan: {
        priority_steps: [
            "No action required. This bill appears accurate.",
            "Verify charges match your explanation of benefits (EOB) from insurance",
            "Contact insurance if you have questions about coverage or payment amounts"
        ],
        next_step_focus: "Payment is due as listed. Review EOB for insurance coverage details."
    },
    phone_script: "No dispute needed. The bill appears to be accurate based on standard billing practices.",
    dispute_letter_text: "No dispute letter needed. The charges appear legitimate and properly documented.",
    notes: "This is a demo analysis of a clean bill with no detected errors. The bill shows standard charges with appropriate documentation and no red flags.",

    // Demo-specific enhanced fields
    demo_metadata: {
        type: "clean",
        fileUploaded: "demo_clean.pdf",
        totalSavings: "$0",
        flagCount: 0,
        confidence: "High",
        analysisTime: "2s (demo)"
    },

    provider_info: {
        name: "Boston General Hospital",
        address: "456 Medical Plaza, Boston, MA 02109",
        phone: "(555) 555-5555",
        accountNumber: "ACC-87654321",
        dateOfService: "October 20, 2024",
        totalBilled: "$1,245.00",
        insuranceBilled: "$996.00",
        patientResponsibility: "$249.00"
    },

    clean_bill_message: {
        verdict: "✅ This bill looks clean",
        message: "No significant billing errors detected",
        details: "The charges on this bill align with the services provided and appear to match standard pricing for the procedure and facility. Your insurance has processed the claim, and the patient responsibility amount reflects your plan's cost-sharing requirements.",
        tips: [
            {
                title: "You're in good shape",
                description: "This bill appears to be processed correctly. No action needed unless you disagree with the medical necessity of the charges or believe insurance should have covered more."
            },
            {
                title: "Still review the details",
                description: "Even clean bills can have subtle issues. Review line items to ensure you received all billed services and that they match your explanation of benefits (EOB) from insurance."
            },
            {
                title: "Keep for records",
                description: "File this bill with your EOB in case you need it for taxes (medical expenses deduction), HSA/FSA reimbursement, or future insurance claims. Keep for at least 3 years."
            }
        ]
    }
};

export const DEMO_RESULTS_ERROR = {
    // Error response structure
    error: "low_ocr_confidence",
    notes: "Unable to parse bill with confidence (current OCR confidence: 42%). For best results, ensure all text is readable and bills are not folded or damaged. Try taking a clearer photo with better lighting, using a scanner app, or requesting a PDF copy from your healthcare provider.",

    // Demo-specific enhanced fields
    demo_metadata: {
        type: "error",
        fileUploaded: "demo_blurry.jpg",
        success: false,
        error: "Unable to read bill clearly",
        analysisTime: "3s"
    },

    error_details: {
        errorMessage: "We couldn't analyze this bill because the image quality is too low.",
        errorExplanation: "Our AI relies on being able to read text clearly to identify potential billing errors. The image you uploaded is either too blurry, too dark, or the text is too small to read accurately.",
        ocrConfidence: "42%",
        minimumRequired: "60%"
    },

    suggestions: [
        {
            title: "Take a clearer photo",
            details: "If you photographed the bill, try again with better lighting and a steady hand. Make sure the text is in focus and the entire bill is visible. Natural daylight works best.",
            icon: "📸",
            tips: [
                "Use natural light or bright indoor lighting",
                "Hold phone steady or use a flat surface",
                "Ensure entire bill fits in frame",
                "Avoid shadows and glare",
                "Take photo straight-on, not at an angle"
            ]
        },
        {
            title: "Scan the bill",
            details: "Use a scanner or scanning app (like Adobe Scan, Microsoft Lens, or CamScanner) to create a clearer digital copy. Scanner apps often have automatic edge detection and image enhancement.",
            icon: "🖨️",
            recommendedApps: [
                "Adobe Scan (Free, iOS/Android)",
                "Microsoft Lens (Free, iOS/Android)",
                "CamScanner (Free tier available)",
                "Apple Notes (iPhone - built-in document scanner)"
            ]
        },
        {
            title: "Request PDF from provider",
            details: "Call the billing department and ask them to email you a digital copy of your bill as a PDF. This is the clearest format and eliminates scanning issues entirely.",
            icon: "📧",
            script: "Hi, I'd like to request a digital copy of my bill for account #[ACCOUNT NUMBER] dated [DATE]. Could you email it to me as a PDF? My email is [YOUR EMAIL]."
        },
        {
            title: "Check file size and format",
            details: "Very compressed images can be blurry. Make sure your file is at least 2MB and in JPG or PNG format. PDFs work best. Avoid heavily compressed or low-resolution images.",
            icon: "📏",
            requirements: [
                "Minimum file size: 2MB",
                "Supported formats: PDF, JPG, PNG",
                "Minimum resolution: 1200x1600 pixels",
                "Maximum file size: 20MB"
            ]
        }
    ],

    try_again: {
        icon: "🔄",
        text: "Try Another File",
        action: "open_file_picker",
        buttonText: "Upload Clearer Image"
    }
};
