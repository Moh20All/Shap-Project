"use client"

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ContributionChart = ({ shapValues }) => {
    if (!shapValues) return null;

    // Calculate sum of positive (Risk) and negative (Protective) SHAP values
    let riskSum = 0;
    let protectiveSum = 0;

    shapValues.forEach(item => {
        if (item.shap > 0) riskSum += item.shap;
        else protectiveSum += Math.abs(item.shap);
    });

    const data = [
        { name: 'Risk Factors', value: riskSum },
        { name: 'Protective Factors', value: protectiveSum }
    ];

    const COLORS = ['#ef4444', '#3b82f6']; // Red, Blue

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Risk vs. Protection</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
                <div className="text-center text-xs text-gray-500 mt-2">
                    Balance of features pushing towards vs. away from diabetes risk.
                </div>
            </CardContent>
        </Card>
    );
};

export default ContributionChart;
