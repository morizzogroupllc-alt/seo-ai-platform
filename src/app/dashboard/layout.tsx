'use client';

import React from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] p-4 lg:p-8">
            {children}
        </div>
    );
}
