import React from 'react'

type Props = {
    comparisons: number
    swaps: number
    accesses: number
}

export default function StatsPanel({ comparisons, swaps, accesses }: Props) {
    return (
        <div className="card">
            <h4 className="text-sm text-slate-300">Stats</h4>
            <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="p-2 bg-[color:var(--glass)] rounded">
                    <div className="text-xs text-slate-400">Comparisons</div>
                    <div className="text-lg font-mono">{comparisons}</div>
                </div>
                <div className="p-2 bg-[color:var(--glass)] rounded">
                    <div className="text-xs text-slate-400">Swaps</div>
                    <div className="text-lg font-mono">{swaps}</div>
                </div>
                <div className="p-2 bg-[color:var(--glass)] rounded">
                    <div className="text-xs text-slate-400">Accesses</div>
                    <div className="text-lg font-mono">{accesses}</div>
                </div>
            </div>
        </div>
    )
}
