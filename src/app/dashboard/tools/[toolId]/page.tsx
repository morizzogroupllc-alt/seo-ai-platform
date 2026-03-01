import React from 'react'
import { getToolById } from '@/lib/registry/tools'
import ToolInterface from '@/components/tools/ToolInterface'
import { notFound } from 'next/navigation'

interface PageProps {
    params: { toolId: string }
}

export default async function ToolPage({ params }: PageProps) {
    const tool = getToolById(params.toolId)

    if (!tool) {
        notFound()
    }

    return (
        <div className="max-w-5xl mx-auto py-8">
            {/* Dynamic Tool Interface */}
            <ToolInterface tool={tool} />
        </div>
    )
}
