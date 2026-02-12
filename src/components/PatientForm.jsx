"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PatientForm = ({ onPredict, isLoading }) => {
    const [formData, setFormData] = useState({
        age: 50,
        bmi: 33.6,
        blood_pressure: 72,
        glucose: 148,
        insulin: 0,
        skin_thickness: 35,
        pregnancies: 6,
        dpf: 0.627
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onPredict(formData);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Patient Vitals</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bmi">BMI</Label>
                        <Input id="bmi" name="bmi" type="number" step="0.1" value={formData.bmi} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="blood_pressure">Blood Pressure</Label>
                        <Input id="blood_pressure" name="blood_pressure" type="number" value={formData.blood_pressure} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="glucose">Glucose Level</Label>
                        <Input id="glucose" name="glucose" type="number" value={formData.glucose} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="insulin">Insulin</Label>
                        <Input id="insulin" name="insulin" type="number" value={formData.insulin} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="skin_thickness">Skin Thickness</Label>
                        <Input id="skin_thickness" name="skin_thickness" type="number" value={formData.skin_thickness} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="pregnancies">Pregnancies</Label>
                        <Input id="pregnancies" name="pregnancies" type="number" value={formData.pregnancies} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="dpf">Diabetes Pedigree Function</Label>
                        <Input id="dpf" name="dpf" type="number" step="0.001" value={formData.dpf} onChange={handleChange} required />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Analyzing..." : "Run Prediction"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default PatientForm;
