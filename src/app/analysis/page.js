"use client"

import React, { useState } from 'react';
import PatientForm from '@/components/PatientForm';
import PredictionResult from '@/components/PredictionResult';
import ShapWaterfall from '@/components/ShapWaterfall';
import { predictRisk } from '@/lib/api';

export default function AnalysisPage() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePredict = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await predictRisk(data);
            setResult(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Run Analysis</h1>
                <p className="text-gray-500 mt-1">Enter patient data to generate AI-powered risk assessment.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Input */}
                <div className="lg:col-span-4 space-y-6">
                    <PatientForm onPredict={handlePredict} isLoading={loading} />

                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-md border border-red-200">
                            Error: {error}
                        </div>
                    )}
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-8 space-y-6">
                    {!result ? (
                        <div className="h-full min-h-[400px] flex items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-xl bg-white/50 text-gray-400">
                            <div className="text-center">
                                <p className="text-lg">No prediction generated</p>
                                <p className="text-sm">Enter patient data to see analysis</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <PredictionResult result={result} />
                            <ShapWaterfall shapValues={result.shap_values} baseValue={result.base_value} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
