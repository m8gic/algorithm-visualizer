import { AnimationStep } from '../types/sorting'

export default function selectionSort(input: number[]) {
    const arr = input.slice()
    const steps: AnimationStep[] = []
    const n = arr.length
    for (let i = 0; i < n; i++) {
        let minIdx = i
        for (let j = i + 1; j < n; j++) {
            steps.push({ type: 'compare', indices: [minIdx, j] })
            if (arr[j] < arr[minIdx]) minIdx = j
        }
        if (minIdx !== i) {
            steps.push({ type: 'swap', indices: [i, minIdx] })
            const tmp = arr[i]
            arr[i] = arr[minIdx]
            arr[minIdx] = tmp
        }
        steps.push({ type: 'markSorted', indices: [i] })
    }
    return steps
}
