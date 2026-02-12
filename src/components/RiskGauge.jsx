"use client"

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const RiskGauge = ({ riskScore }) => {
    // Risk score is 0.0 to 1.0
    const percentage = riskScore * 100;

    // Data for the gauge (half-donut)
    // We create a needle value and the rest
    // Actually for a simple gauge, let's just do a color bar type
    // [Value, Remaining]
    const data = [
        { name: 'Risk', value: percentage },
        { name: 'Safe', value: 100 - percentage }
    ];

    // Determine color based on risk
    let color = "#22c55e"; // Green
    if (riskScore > 0.3) color = "#eab308"; // Yellow
    if (riskScore > 0.6) color = "#ef4444"; // Red

    const cx = "50%";
    const cy = "100%";
    const iR = 60;
    const oR = 80;

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle className="text-center">Diabetes Risk Score</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center relative pb-0">
                <div className="h-[150px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                dataKey="value"
                                startAngle={180}
                                endAngle={0}
                                data={data}
                                cx={cx}
                                cy={cy}
                                innerRadius={iR}
                                outerRadius={oR}
                                fill="#8884d8"
                                stroke="none"
                            >
                                <Cell key="cell-0" fill={color} />
                                <Cell key="cell-1" fill="#e5e7eb" />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute bottom-0 left-0 right-0 text-center mb-2">
                        <div className="text-4xl font-bold" style={{ color: color }}>
                            {percentage.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-500 font-medium">
                            {riskScore > 0.5 ? "HIGH RISK" : "LOW RISK"}
                        </div>
                    </div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-4 mb-4 px-4">
                    Probability calculated by Random Forest model using patient vitals.
                </p>
            </CardContent>
        </Card>
    );
};

export default RiskGauge;
