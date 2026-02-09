"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart2, Activity, Clock, Settings, HeartPulse } from 'lucide-react';
import { cn } from "@/lib/utils";

const navigation = [
    { name: 'Dashboard', href: '/', icon: BarChart2 },
    { name: 'Run Analysis', href: '/analysis', icon: Activity },
    { name: 'Patient History', href: '/history', icon: Clock },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-screen w-64 bg-white border-r border-gray-200">
            <div className="flex items-center gap-2 px-6 py-6 border-b">
                <HeartPulse className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">SHAP-AID</span>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5", isActive ? "text-blue-600" : "text-gray-400")} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t">
                <div className="bg-gray-50 rounded p-3 text-xs text-gray-500">
                    <p className="font-semibold text-gray-700 mb-1">Status: Online</p>
                    <p>Model: XGBoost (Diabetes)</p>
                    <p className="mt-1">v0.1.0-prototype</p>
                </div>
            </div>
        </div>
    );
}
