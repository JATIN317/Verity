"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { AnalysisResult, AnalysisError } from "@/types";

type ResultsData = AnalysisResult | AnalysisError | null;

interface ResultsContextType {
    results: ResultsData;
    setResults: (results: ResultsData) => void;
}

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

export function ResultsProvider({ children }: { children: ReactNode }) {
    const [results, setResults] = useState<ResultsData>(null);

    return (
        <ResultsContext.Provider value={{ results, setResults }}>
            {children}
        </ResultsContext.Provider>
    );
}

export function useResults() {
    const context = useContext(ResultsContext);
    if (context === undefined) {
        throw new Error("useResults must be used within a ResultsProvider");
    }
    return context;
}
