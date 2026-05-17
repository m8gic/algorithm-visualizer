import React, { useEffect, useMemo, useRef, useState } from 'react'
import { generateArray } from './utils/generateArray'
import BarChart from './components/BarChart'
import Controls from './components/Controls'
import StatsPanel from './components/StatsPanel'
import AlgorithmInfo from './components/AlgorithmInfo'
import PseudocodePanel from './components/PseudocodePanel'
import bubbleSort from './algorithms/bubbleSort'
import selectionSort from './algorithms/selectionSort'
import insertionSort from './algorithms/insertionSort'
import mergeSort from './algorithms/mergeSort'
import quickSort from './algorithms/quickSort'
import heapSort from './algorithms/heapSort'
import shellSort from './algorithms/shellSort'
import { AnimationStep } from './types/sorting'
import { playComparison, playSwap, playComplete, stopAllSounds } from './utils/sound'

const algorithmMap: Record<string, (arr: number[], opts?: any) => AnimationStep[]> = {
    bubble: bubbleSort,
    selection: selectionSort,
    insertion: insertionSort,
    merge: mergeSort,
    quick: quickSort,
    heap: heapSort,
    shell: shellSort,
}

export default function App() {
    const [size, setSize] = useState(40)
    // Higher default speed (larger value => faster playback)
    const [speed, setSpeed] = useState(900)
    const [array, setArray] = useState<number[]>(() => generateArray(40))
    const [algorithm, setAlgorithm] = useState('merge')
    const [running, setRunning] = useState(false)
    const [paused, setPaused] = useState(false)
    const [sound, setSound] = useState(true)
    const [quickPivot, setQuickPivot] = useState<'first' | 'last' | 'random' | 'median'>('last')
    const [quickScheme, setQuickScheme] = useState<'lomuto' | 'hoare'>('lomuto')

    const [comparisons, setComparisons] = useState(0)
    const [swaps, setSwaps] = useState(0)
    const [accesses, setAccesses] = useState(0)

    const stepsRef = useRef<AnimationStep[]>([])
    const stepIndexRef = useRef(0)
    const timerRef = useRef<number | null>(null)
    const highlightedRef = useRef<{ [k: string]: number[] }>({})
    const soundRef = useRef(sound)
    const arrayRef = useRef(array)
    const [, tick] = useState(0) // force re-render for highlights

    useEffect(() => {
        setArray(generateArray(size))
    }, [size])

    useEffect(() => {
        soundRef.current = sound
    }, [sound])

    useEffect(() => {
        arrayRef.current = array
    }, [array])

    useEffect(() => {
        return () => { if (timerRef.current) window.clearInterval(timerRef.current) }
    }, [])

    function resetStats() { setComparisons(0); setSwaps(0); setAccesses(0) }

    function randomize() {
        if (running) return
        setArray(generateArray(size))
        resetStats()
    }

    function prepare() {
        resetStats()
        const fn = algorithmMap[algorithm]
        const opts = algorithm === 'quick' ? { pivot: quickPivot, scheme: quickScheme } : undefined
        const steps = fn(array.slice(), opts)
        stepsRef.current = steps
        stepIndexRef.current = 0
    }

    function processStep(step: AnimationStep, a: number[]) {
        highlightedRef.current = { [step.type]: step.indices }
        if (step.type === 'compare') {
            setComparisons(c => c + 1)
            if (soundRef.current) playComparison()
        } else if (step.type === 'swap') {
            const [i, j] = step.indices
            const tmp = a[i]
            a[i] = a[j]
            a[j] = tmp
            setSwaps(s => s + 1)
            if (soundRef.current) playSwap()
        } else if (step.type === 'overwrite') {
            const idx = step.indices[0]
            if (step.values) a[idx] = step.values[0]
            setAccesses(s => s + 1)
        } else if (step.type === 'markSorted') {
            // mark visually
        }
        return a
    }

    function start() {
        if (running) return
        const hasPendingSteps = stepsRef.current.length > 0 && stepIndexRef.current < stepsRef.current.length
        if (!hasPendingSteps) {
            prepare()
        }
        setPaused(false)
        setRunning(true)
        const steps = stepsRef.current
        const interval = Math.max(5, 1000 - speed)
        const batch = speed > 1000 ? Math.min(20, Math.ceil((speed - 1000) / 200) + 1) : 1
        timerRef.current = window.setInterval(() => {
            let idx = stepIndexRef.current
            let a = arrayRef.current.slice()
            const startIdx = idx
            while (idx < steps.length && idx < startIdx + batch) {
                a = processStep(steps[idx], a)
                idx += 1
            }
            stepIndexRef.current = idx
            if (idx >= steps.length) {
                if (timerRef.current) window.clearInterval(timerRef.current)
                setRunning(false)
                setPaused(false)
                if (soundRef.current) playComplete()
                setArray(a)
                tick(t => t + 1)
                return
            }
            setArray(a)
            tick(t => t + 1)
        }, interval)
    }

    function pause() {
        if (timerRef.current) window.clearInterval(timerRef.current)
        setRunning(false)
        setPaused(true)
        stopAllSounds()
    }

    function reset() {
        if (timerRef.current) window.clearInterval(timerRef.current)
        setRunning(false)
        setPaused(false)
        stopAllSounds()
        setArray(generateArray(size))
        resetStats()
        stepsRef.current = []
        stepIndexRef.current = 0
        highlightedRef.current = {}
        tick(t => t + 1)
    }

    const maxValue = useMemo(() => Math.max(...array, 10), [array])

    const highlighted = highlightedRef.current

    return (
        <div className="min-h-screen py-8">
            <div className="container grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <div className="card mb-4">
                        <BarChart array={array} maxValue={maxValue} highlighted={highlighted} />
                    </div>

                    <div className="flex flex-col gap-4">
                        <Controls
                            size={size}
                            onSize={setSize}
                            speed={speed}
                            onSpeed={setSpeed}
                            onRandomize={randomize}
                            onStart={start}
                            onPause={pause}
                            running={running}
                            paused={paused}
                            onReset={reset}
                            algorithm={algorithm}
                            onAlgorithm={(a) => { setAlgorithm(a); reset(); }}
                            sound={sound}
                            onSound={(b: boolean) => { setSound(b); if (!b) stopAllSounds() }}
                        />
                        <AlgorithmInfo id={algorithm} />
                    </div>
                </div>

                <div>
                    <StatsPanel comparisons={comparisons} swaps={swaps} accesses={accesses} />
                    <PseudocodePanel id={algorithm} />
                    <div className="mt-3 card">
                        <h4 className="text-sm text-slate-300">Quick Sort Options</h4>
                        <div className="text-xs text-slate-400 mt-2">Select pivot strategy and partition scheme when Quick Sort is chosen.</div>
                        {algorithm === 'quick' && (
                            <div className="mt-3 flex flex-col gap-2">
                                <label className="text-xs">Pivot</label>
                                <select value={quickPivot} onChange={e => setQuickPivot(e.target.value as any)} className="bg-transparent border rounded px-2 py-1 text-sm">
                                    <option value="first">First</option>
                                    <option value="last">Last</option>
                                    <option value="random">Random</option>
                                    <option value="median">Median of three</option>
                                </select>

                                <label className="text-xs">Partition</label>
                                <select value={quickScheme} onChange={e => setQuickScheme(e.target.value as any)} className="bg-transparent border rounded px-2 py-1 text-sm">
                                    <option value="lomuto">Lomuto</option>
                                    <option value="hoare">Hoare</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
