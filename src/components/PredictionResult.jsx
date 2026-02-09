"use client"

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from 'lucide-react';

const PredictionResult = ({ result }) => {
    if (!result) return null;

    const isHighRisk = result.risk_class === "High Risk";
    const scorePercent = (result.risk_score * 100).toFixed(1);

    return (
        <Card className={`border-l-4 ${isHighRisk ? 'border-l-red-500' : 'border-l-green-500'}`}>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                    {isHighRisk ? (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                    ) : (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    Prediction Result
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-end mb-2">
                    <span className={`text-2xl font-bold ${isHighRisk ? 'text-red-600' : 'text-green-600'}`}>
                        {result.risk_class}
                    </span>
                    <span className="text-sm text-gray-500">
                        Confidence Score: {scorePercent}%
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className={`h-2.5 rounded-full ${isHighRisk ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${scorePercent}%` }}
                    ></div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-700">
                    {isHighRisk
                        ? "The patient shows indicators consistent with high risk. Review feature contributions below."
                        : "The patient currently falls within the low risk category."}
                </div>
            </CardContent>
        </Card>
    );
};

export default PredictionResult;
