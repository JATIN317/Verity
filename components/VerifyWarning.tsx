import { useState } from "react";
import { AlertTriangle, CheckSquare, Square } from "lucide-react";

export const VerifyWarning = () => {
    const [acknowledged, setAcknowledged] = useState(false);

    return (
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl p-6 my-8">
            <div className="flex items-start gap-4 mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                    <h3 className="font-bold text-amber-900 dark:text-amber-400 mb-1">IMPORTANT: Verify Before You Act</h3>
                    <p className="text-amber-800 dark:text-amber-300/80 mb-4 text-sm">
                        These findings are from AI analysis of your bill text. Before disputing any charges:
                    </p>

                    <ul className="space-y-2 mb-6">
                        <li className="flex items-center gap-2 text-sm text-amber-900 dark:text-amber-200">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                            Compare these with what your doctor recommended
                        </li>
                        <li className="flex items-center gap-2 text-sm text-amber-900 dark:text-amber-200">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                            Check your insurance policy for coverage details
                        </li>
                        <li className="flex items-center gap-2 text-sm text-amber-900 dark:text-amber-200">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                            Call your insurance company to ask about the charges
                        </li>
                    </ul>

                    <p className="text-xs text-amber-800 dark:text-amber-400 mb-4">
                        If you&apos;re unsure about any finding, talk to a billing advocate or patient advocate at the hospital. They&apos;re usually free.
                    </p>

                    <button
                        onClick={() => setAcknowledged(!acknowledged)}
                        className="flex items-center gap-2 text-sm font-semibold text-amber-900 dark:text-amber-200 hover:text-amber-700 dark:hover:text-amber-100 transition-colors"
                    >
                        {acknowledged ? (
                            <CheckSquare className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                        ) : (
                            <Square className="w-5 h-5 text-amber-400 dark:text-amber-600" />
                        )}
                        I understand these are AI findings and will verify before taking action
                    </button>
                </div>
            </div>
        </div>
    );
};
