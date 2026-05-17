import { AnimationStep } from '../types/sorting'

export default function bubbleSort(input: number[]) {
    const arr = input.slice()
    const steps: AnimationStep[] = []
    const n = arr.length
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            steps.push({ type: 'compare', indices: [j, j + 1] })
            if (arr[j] > arr[j + 1]) {
                steps.push({ type: 'swap', indices: [j, j + 1] })
                const tmp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = tmp
            }
        }
        steps.push({ type: 'markSorted', indices: [n - i - 1] })
    }
    return steps
}
