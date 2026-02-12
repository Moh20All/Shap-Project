"use client"

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PatientRadar = ({ patientData, populationAverages }) => {
    if (!patientData || !populationAverages) return null;

    // Normalize data for radar chart (conceptually challenging because scales differ wildy)
    // E.g. Glucose ~120, Age ~40.
    // Solution: Normalize to % of population average (where avg = 100%)

    const features = Object.keys(populationAverages);
    const data = features.map(feature => {
        const avg = populationAverages[feature];
        const val = patientData[feature];

        // Avoid division by zero
        const safeAvg = avg === 0 ? 1 : avg;

        // Calculate percentage relative to average
        // Cap at 200% to keep chart readable if outlier
        let percent = (val / safeAvg) * 100;

        return {
            subject: feature,
            A: 100, // Population Average (Basline)
            B: percent, // Patient
            fullMark: 150
        };
    });

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Patient vs. Population Average</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 200]} tick={false} />
                        <Radar
                            name="Population Avg"
                            dataKey="A"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.1}
                        />
                        <Radar
                            name="Patient"
                            dataKey="B"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                            fillOpacity={0.4}
                        />
                        <Legend />
                        <Tooltip />
                    </RadarChart>
                </ResponsiveContainer>
                <p className="text-xs text-center text-gray-400 mt-2">
                    *Values normalized relative to population average (100)
                </p>
            </CardContent>
        </Card>
    );
};

export default PatientRadar;
