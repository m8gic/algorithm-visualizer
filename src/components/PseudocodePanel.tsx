import React from 'react'
import { algorithms } from '../data/algorithmInfo'

export default function PseudocodePanel({ id }: { id: string }) {
    const a = algorithms.find(x => x.id === id)!
    return (
        <div className="card">
            <h4 className="text-sm text-slate-300">Pseudocode</h4>
            <pre className="mt-2 text-xs bg-transparent font-mono whitespace-pre-wrap">
                {a.pseudocode.map((l, i) => `${i + 1}. ${l}`).join('\n')}
            </pre>
        </div>
    )
}
