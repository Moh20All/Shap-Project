"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"; // We need to add table component, or build simplified one
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export default function HistoryPage() {
    const history = [
        { id: 1001, date: "2024-02-09", risk: "High", score: 0.82, feature: "Glucose" },
        { id: 1002, date: "2024-02-09", risk: "Low", score: 0.12, feature: "BMI" },
        { id: 1003, date: "2024-02-08", risk: "Low", score: 0.35, feature: "Age" },
        { id: 1004, date: "2024-02-08", risk: "High", score: 0.76, feature: "Insulin" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Patient History</h1>
                <p className="text-gray-500 mt-1">View past predictions and analysis reports.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Assessments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="px-4 py-3">Patient ID</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Risk Class</th>
                                    <th className="px-4 py-3">Confidence</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {history.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-gray-900">#{item.id}</td>
                                        <td className="px-4 py-3 text-gray-500">{item.date}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.risk === "High" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                                                }`}>
                                                {item.risk} Risk
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500">{(item.score * 100).toFixed(0)}%</td>
                                        <td className="px-4 py-3 text-right">
                                            <Button variant="ghost" size="sm">
                                                <Eye className="h-4 w-4 mr-1" /> View
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
