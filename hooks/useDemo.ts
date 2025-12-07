// Demo mode detection hook for Verity Bill Analyzer
// Provides filename-based demo detection with instant precomputed results

import { DEMO_RESULTS_FLAGGED, DEMO_RESULTS_CLEAN, DEMO_RESULTS_ERROR } from '../constants/demoData';

/**
 * Detect demo file type based on filename
 * @param {string} filename - The name of the uploaded file
 * @returns {string|null} - Returns 'flagged', 'clean', 'blurry', or null if not a demo file
 */
export function getDemoType(filename: string): string | null {
    if (!filename) return null;

    const lowerFilename = filename.toLowerCase();

    if (lowerFilename.includes('demo_flagged')) {
        return 'flagged';
    }

    if (lowerFilename.includes('demo_clean')) {
        return 'clean';
    }

    if (lowerFilename.includes('demo_blurry') || lowerFilename.includes('demo_error')) {
        return 'blurry';
    }

    return null;
}

/**
 * Analyze a bill file - checks for demo mode first, then falls back to real API
 * @param {File} fileInput - The uploaded file object
 * @param {Function} callGeminiAPI - The real API function to call if not demo mode
 * @returns {Promise<Object>} - Analysis result object
 */
export async function analyzeBill(
    fileInput: File,
    callGeminiAPI: (file: File) => Promise<{ success: boolean; data?: unknown; error?: string }>
) {
    try {
        // Check if this is a demo file
        const demoType = getDemoType(fileInput.name);

        // Demo mode: Return precomputed results
        if (demoType === 'flagged') {
            console.log('🎭 Demo mode: Returning flagged bill results');
            return {
                success: true,
                data: DEMO_RESULTS_FLAGGED,
                source: 'demo'
            };
        }

        if (demoType === 'clean') {
            console.log('🎭 Demo mode: Returning clean bill results');
            return {
                success: true,
                data: DEMO_RESULTS_CLEAN,
                source: 'demo'
            };
        }

        if (demoType === 'blurry') {
            console.log('🎭 Demo mode: Returning error handling results');
            return {
                success: true,
                data: DEMO_RESULTS_ERROR,
                source: 'demo'
            };
        }

        // Real mode: Call the actual Gemini API
        console.log('📄 Real mode: Calling Gemini API');
        return await callGeminiAPI(fileInput);

    } catch (error) {
        console.error('❌ Error in analyzeBill:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            source: 'error'
        };
    }
}
