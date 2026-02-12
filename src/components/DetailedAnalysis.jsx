"use client"

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DetailedAnalysis = ({ shapValues, patientData, populationAverages }) => {
    if (!shapValues || !patientData || !populationAverages) return null;

    // Combine data sources
    // shapValues is array of {feature, value, shap}

    const rows = shapValues.map((item) => {
        const feature = item.feature;
        const patientVal = item.value;
        const avgVal = populationAverages[feature];
        const impact = item.shap;

        // Determine deviation
        const deviation = avgVal ? ((patientVal - avgVal) / avgVal) * 100 : 0;

        return {
            feature,
            value: patientVal.toFixed(2),
            average: avgVal ? avgVal.toFixed(2) : "N/A",
            deviation: deviation.toFixed(1) + "%",
            impact: impact.toFixed(4),
            impactColor: impact > 0 ? "text-red-600" : "text-blue-600",
            impactLabel: impact > 0 ? "RISK" : "PROTECTIVE"
        };
    });

    // Sort by absolute impact
    rows.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Detailed Feature Analysis</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Feature</TableHead>
                            <TableHead>Patient Value</TableHead>
                            <TableHead>Population Avg</TableHead>
                            <TableHead>Deviation</TableHead>
                            <TableHead>Risk Impact (SHAP)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.feature}>
                                <TableCell className="font-medium capitalize">{row.feature}</TableCell>
                                <TableCell>{row.value}</TableCell>
                                <TableCell className="text-gray-500">{row.average}</TableCell>
                                <TableCell className={row.deviation.startsWith("-") ? "text-green-600" : "text-yellow-600"}>
                                    {row.deviation}
                                </TableCell>
                                <TableCell>
                                    <span className={`font-bold ${row.impactColor}`}>
                                        {row.impact > 0 ? "+" : ""}{row.impact}
                                    </span>
                                    <span className="text-xs text-gray-400 ml-2">({row.impactLabel})</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default DetailedAnalysis;
