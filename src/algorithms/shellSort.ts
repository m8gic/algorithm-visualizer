import { AnimationStep } from '../types/sorting'

export default function shellSort(input: number[]) {
    const arr = input.slice()
    const steps: AnimationStep[] = []
    const n = arr.length
    let gap = Math.floor(n / 2)
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            let j = i
            while (j >= gap) {
                steps.push({ type: 'compare', indices: [j - gap, j] })
                if (arr[j - gap] > arr[j]) {
                    steps.push({ type: 'swap', indices: [j - gap, j] })
                    const tmp = arr[j - gap]; arr[j - gap] = arr[j]; arr[j] = tmp
                } else break
                j -= gap
            }
        }
        gap = Math.floor(gap / 2)
    }
    for (let i = 0; i < n; i++) steps.push({ type: 'markSorted', indices: [i] })
    return steps
}
