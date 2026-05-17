import { AnimationStep } from '../types/sorting'

export default function insertionSort(input: number[]) {
    const arr = input.slice()
    const steps: AnimationStep[] = []
    const n = arr.length
    for (let i = 1; i < n; i++) {
        let j = i
        while (j > 0) {
            steps.push({ type: 'compare', indices: [j - 1, j] })
            if (arr[j - 1] > arr[j]) {
                steps.push({ type: 'swap', indices: [j - 1, j] })
                const tmp = arr[j - 1]
                arr[j - 1] = arr[j]
                arr[j] = tmp
            } else break
            j--
        }
        steps.push({ type: 'markSorted', indices: [i] })
    }
    return steps
}
