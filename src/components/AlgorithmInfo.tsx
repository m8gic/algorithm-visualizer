import React from 'react'
import { algorithms } from '../data/algorithmInfo'

export default function AlgorithmInfo({ id }: { id: string }) {
    const a = algorithms.find(x => x.id === id)!
    return (
        <div className="card">
            <h4 className="text-lg">{a.name}</h4>
            <p className="text-sm text-slate-300 mt-1">{a.info}</p>
            <div className="mt-3 text-sm grid grid-cols-3 gap-2 text-slate-300">
                <div><strong>Time</strong><div>{a.time}</div></div>
                <div><strong>Space</strong><div>{a.space}</div></div>
                <div><strong>Stable</strong><div>{String(a.stable)}</div></div>
            </div>
        </div>
    )
}
