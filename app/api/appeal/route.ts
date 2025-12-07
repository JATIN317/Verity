import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are an expert medical billing advocate helping a patient appeal an insurance denial or underpayment.
Your goal is to generate a professional, persuasive appeal letter and a phone script based on the user's situation.

Input:
- Service/Charge: What was denied/underpaid
- Denial Reason: What the insurance company said
- Urgency: Emergency vs Planned
- Desired Outcome: What the patient wants

Output:
Return a JSON object with two fields:
1. "letter": A formal appeal letter text. Use placeholders like [YOUR NAME], [DATE], etc.
2. "script": A phone script for the patient to use when calling the insurance company.

Tone: Professional, firm, but respectful.
`;

const DEMO_RESPONSE = {
    letter: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]

[DATE]

[INSURANCE COMPANY NAME]
Appeals Department
[ADDRESS]

RE: Appeal for [SERVICE TYPE]
Member ID: [MEMBER ID]
Date of Service: [DATE OF SERVICE]
Claim Number: [CLAIM NUMBER]

To Whom It May Concern:

I am writing to formally appeal the denial of coverage for the [SERVICE TYPE] provided on [DATE OF SERVICE]. Your explanation of benefits indicates this claim was denied due to "[DENIAL REASON]".

I believe this denial is incorrect because [PROVIDE REASONING - e.g., the service was medically necessary as prescribed by my physician / this was an emergency situation / the provider was the only one available].

I am requesting that you reconsider this claim and [DESIRED OUTCOME].

Enclosed are copies of the medical records and the original bill. Please review this information and process the claim according to my plan benefits.

Sincerely,

[YOUR NAME]
[YOUR PHONE NUMBER]`,
    script: `Hello, my name is [YOUR NAME]. I am calling about a claim for date of service [DATE].

Reference Number: [CLAIM NUMBER]

I am calling because this claim was denied for [DENIAL REASON], but I believe this is incorrect.

[EXPLAIN SITUATION - e.g., "This was an emergency visit and I had no choice of provider" or "My doctor deemed this medically necessary"].

I would like to request that you [DESIRED OUTCOME].

Can you please review this with me?`
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { service, denialReason, urgency, desiredOutcome } = body;

        if (!service || !denialReason || !urgency || !desiredOutcome) {
            return NextResponse.json(
                { error: "missing_fields", notes: "All fields are required." },
                { status: 400 }
            );
        }

        const apiKey = process.env.GEMINI_API_KEY;

        // Fallback to demo mode if no API key or if specifically requested (optional)
        if (!apiKey) {
            console.warn("No API key found. Returning demo response.");
            return NextResponse.json(DEMO_RESPONSE);
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash", // Use a fast model
            systemInstruction: SYSTEM_PROMPT,
            generationConfig: {
                responseMimeType: "application/json",
            }
        });

        const prompt = `
    User's situation:
    - Service/Charge: ${service}
    - Denial Reason: ${denialReason}
    - Urgency: ${urgency}
    - Desired Outcome: ${desiredOutcome.join(", ")}
    
    Generate the appeal letter and phone script in JSON format.
    `;

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Parse JSON
            const data = JSON.parse(text);
            return NextResponse.json(data);
        } catch (apiError) {
            console.error("Gemini API error:", apiError);
            // Fallback to demo response on API failure
            return NextResponse.json(DEMO_RESPONSE);
        }

    } catch (error) {
        console.error("Appeal generation error:", error);
        return NextResponse.json(
            { error: "internal_error", notes: "Failed to generate appeal." },
            { status: 500 }
        );
    }
}
