"use client"

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ShapWaterfall = ({ shapValues, baseValue }) => {
    if (!shapValues || shapValues.length === 0) return null;

    // Process data for waterfall chart
    let currentValue = baseValue;
    const data = shapValues.map((item) => {
        const start = currentValue;
        const end = currentValue + item.shap;
        currentValue = end;

        return {
            name: item.feature,
            value: item.value,
            shap: item.shap,
            start: start,
            end: end,
            isPositive: item.shap > 0
        };
    });

    // Sort by absolute SHAP value impact for better visualization
    data.sort((a, b) => Math.abs(b.shap) - Math.abs(a.shap));

    // Take top 10 features
    const displayData = data.slice(0, 10);

    // Custom tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 border rounded shadow-md text-sm">
                    <p className="font-bold">{data.name}</p>
                    <p>Feature Value: {data.value.toFixed(2)}</p>
                    <p className={data.isPositive ? "text-red-500" : "text-blue-500"}>
                        Impact: {data.shap > 0 ? "+" : ""}{data.shap.toFixed(4)}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Feature Impact Analysis (SHAP)</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={displayData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                        <XAxis type="number" domain={['auto', 'auto']} />
                        <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <ReferenceLine x={0} stroke="#666" />
                        <Bar dataKey="shap" stackId="a" fill="#8884d8">
                            {displayData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.isPositive ? "#ef4444" : "#3b82f6"}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 text-sm text-gray-500 text-center">
                    Base Value: {baseValue.toFixed(4)}
                </div>
            </CardContent>
        </Card>
    );
};

export default ShapWaterfall;
