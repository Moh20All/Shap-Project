"use client"

import React, { useState } from 'react';
import PatientForm from '@/components/PatientForm';
import PredictionResult from '@/components/PredictionResult';
import ShapWaterfall from '@/components/ShapWaterfall';
import RiskGauge from '@/components/RiskGauge';
import PatientRadar from '@/components/PatientRadar';
import DetailedAnalysis from '@/components/DetailedAnalysis';
import ContributionChart from '@/components/ContributionChart';
import DistributionChart from '@/components/DistributionChart';
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
            // Inject patient data into result for visualization
            setResult({ ...response, patient_data: data });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
            <div className="flex flex-col gap-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">Run Analysis</h1>
                    <p className="text-gray-500">Enter patient data to generate AI-powered risk assessment.</p>
                </div>

                {/* Top Section: Input Form (Full Width) */}
                <div className="w-full">
                    <PatientForm onPredict={handlePredict} isLoading={loading} />

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md border border-red-200">
                            Error: {error}
                        </div>
                    )}
                </div>

                {/* Bottom Section: Visualization Dashboard (Full Width) */}
                <div className="w-full">
                    {!result ? (
                        <div className="h-[200px] flex items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-xl bg-white/50 text-gray-400">
                            <div className="text-center">
                                <p className="text-lg">No prediction generated</p>
                                <p className="text-sm">Enter patient data above to see analysis</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            {/* Top Row: Key Metrics & Radar */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px] md:h-[350px]">
                                <RiskGauge riskScore={result.risk_score} />
                                <ContributionChart shapValues={result.shap_values} />
                                <PatientRadar
                                    patientData={result.patient_data}
                                    populationAverages={result.population_stats?.means || result.population_averages}
                                />
                            </div>

                            {/* Middle Row: Explanations */}
                            <div className="grid grid-cols-1 gap-6">
                                <ShapWaterfall shapValues={result.shap_values} baseValue={result.base_value} />
                            </div>

                            {/* New Row: Feature Distributions (if stats available) */}
                            {result.population_stats?.stds && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {Object.keys(result.patient_data).map(feature => (
                                        <DistributionChart
                                            key={feature}
                                            featureName={feature}
                                            patientValue={result.patient_data[feature]}
                                            mean={result.population_stats.means[feature]}
                                            std={result.population_stats.stds[feature]}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Bottom Row: Detailed Table */}
                            <DetailedAnalysis
                                shapValues={result.shap_values}
                                patientData={result.patient_data}
                                populationAverages={result.population_stats?.means || result.population_averages}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
