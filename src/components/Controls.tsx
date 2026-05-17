import React from 'react'

type Props = {
    size: number
    onSize: (n: number) => void
    speed: number
    onSpeed: (s: number) => void
    onRandomize: () => void
    onStart: () => void
    onPause: () => void
    running: boolean
    paused: boolean
    onReset: () => void
    algorithm: string
    onAlgorithm: (a: string) => void
    sound: boolean
    onSound: (b: boolean) => void
}

export default function Controls({ size, onSize, speed, onSpeed, onRandomize, onStart, onPause, running, paused, onReset, algorithm, onAlgorithm, sound, onSound }: Props) {
    const buttonLabel = running ? 'Pause' : paused ? 'Continue' : 'Start'
    const buttonAction = running ? onPause : onStart
    const buttonClass = running ? 'bg-rose-600' : 'bg-indigo-600'

    return (
        <div className="card flex flex-col gap-3">
            <div className="flex gap-3 items-center justify-between">
                <div className="flex-1">
                    <label className="text-sm text-slate-300">Array Size</label>
                    <input className="w-full" type="range" min={10} max={120} value={size} onChange={e => onSize(Number(e.target.value))} />
                </div>
                <div className="w-48">
                    <label className="text-sm text-slate-300">Speed</label>
                    {/* Increased max to allow faster playback (higher value = faster) */}
                    <input type="range" min={1} max={3000} value={speed} onChange={e => onSpeed(Number(e.target.value))} />
                </div>
            </div>

            <div className="flex gap-2">
                <select
                    value={algorithm}
                    onChange={e => onAlgorithm(e.target.value)}
                    className="bg-slate-900 text-white border border-slate-600 rounded px-3 py-2 outline-none focus:border-purple-400"
                >
                    <option className="bg-slate-900 text-white" value="bubble">Bubble Sort</option>
                    <option className="bg-slate-900 text-white" value="selection">Selection Sort</option>
                    <option className="bg-slate-900 text-white" value="insertion">Insertion Sort</option>
                    <option className="bg-slate-900 text-white" value="merge">Merge Sort</option>
                    <option className="bg-slate-900 text-white" value="quick">Quick Sort</option>
                    <option className="bg-slate-900 text-white" value="heap">Heap Sort</option>
                    <option className="bg-slate-900 text-white" value="shell">Shell Sort</option>
                </select>

                <button onClick={buttonAction} className={`px-4 py-2 rounded ${buttonClass}`}>
                    {buttonLabel}
                </button>
                <button onClick={onReset} className="px-4 py-2 bg-slate-700 rounded">Reset</button>
                <button onClick={onRandomize} className="px-4 py-2 bg-slate-700 rounded">Randomize</button>

                <label className="ml-auto flex items-center gap-2">
                    <input type="checkbox" checked={sound} onChange={e => onSound(e.target.checked)} />
                    <span className="text-sm">Sound</span>
                </label>
            </div>
        </div>
    )
}
