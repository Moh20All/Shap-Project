"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1">Manage application preferences and model configurations.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Model Configuration</CardTitle>
                    <CardDescription>Select the active prediction model for analysis.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                        <div>
                            <p className="font-medium text-gray-900">Diabetes Risk (RandomForest)</p>
                            <p className="text-sm text-gray-500">v1.2 • Trained on Pima Indians Dataset</p>
                        </div>
                        <Button variant="outline" disabled>Active</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg opacity-60">
                        <div>
                            <p className="font-medium text-gray-900">Heart Disease (XGBoost)</p>
                            <p className="text-sm text-gray-500">v0.9 • Coming Soon</p>
                        </div>
                        <Button variant="secondary" disabled>Select</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
