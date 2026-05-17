import { AnimationStep } from '../types/sorting'

export default function heapSort(input: number[]) {
    const arr = input.slice()
    const steps: AnimationStep[] = []
    const n = arr.length

    function heapify(size: number, root: number) {
        let largest = root
        const l = 2 * root + 1
        const r = 2 * root + 2
        if (l < size) {
            steps.push({ type: 'compare', indices: [l, largest] })
            if (arr[l] > arr[largest]) largest = l
        }
        if (r < size) {
            steps.push({ type: 'compare', indices: [r, largest] })
            if (arr[r] > arr[largest]) largest = r
        }
        if (largest !== root) {
            steps.push({ type: 'swap', indices: [root, largest] })
            const tmp = arr[root]; arr[root] = arr[largest]; arr[largest] = tmp
            heapify(size, largest)
        }
    }

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i)
    for (let i = n - 1; i > 0; i--) {
        steps.push({ type: 'swap', indices: [0, i] })
        const tmp = arr[0]; arr[0] = arr[i]; arr[i] = tmp
        steps.push({ type: 'markSorted', indices: [i] })
        heapify(i, 0)
    }
    steps.push({ type: 'markSorted', indices: [0] })
    return steps
}
