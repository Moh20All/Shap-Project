"use client"

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const generateGaussianData = (mean, std, min, max) => {
    const data = [];
    const step = (max - min) / 50;
    for (let x = min; x <= max; x += step) {
        // Gaussian function
        const exponent = -0.5 * Math.pow((x - mean) / std, 2);
        const y = (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
        data.push({ x: parseFloat(x.toFixed(1)), y: y });
    }
    return data;
};

const DistributionChart = ({ featureName, patientValue, mean, std }) => {
    if (mean === undefined || std === undefined || std === 0) return null;

    // Determine range for the chart (mean +/- 3 std devs covers 99.7%)
    const min = Math.min(mean - 3 * std, patientValue - std);
    const max = Math.max(mean + 3 * std, patientValue + std);

    const data = generateGaussianData(mean, std, min, max);

    // Color code based on if patient is far from mean (2 std devs)
    const isOutlier = Math.abs(patientValue - mean) > 2 * std;
    const color = isOutlier ? "#ef4444" : "#10b981"; // Red if outlier, Green if normal

    return (
        <Card className="h-full border shadow-sm">
            <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium capitalize flex justify-between">
                    <span>{featureName}</span>
                    <span className={isOutlier ? "text-red-500" : "text-green-600"}>
                        {patientValue.toFixed(1)}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id={`color-${featureName}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Tooltip />
                        <Area type="monotone" dataKey="y" stroke="#8884d8" fillOpacity={1} fill={`url(#color-${featureName})`} />
                        {/* Mean Line */}
                        <ReferenceLine x={mean} stroke="#6b7280" strokeDasharray="3 3" label={{ value: 'Avg', fontSize: 10, fill: '#6b7280' }} />
                        {/* Patient Line */}
                        <ReferenceLine x={patientValue} stroke={color} label={{ value: 'You', fontSize: 10, fill: color, position: 'insideTopRight' }} />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default DistributionChart;
