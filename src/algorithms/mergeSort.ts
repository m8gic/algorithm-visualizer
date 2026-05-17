import { AnimationStep } from '../types/sorting'

export default function mergeSort(input: number[]) {
    const arr = input.slice()
    const steps: AnimationStep[] = []

    function merge(l: number, m: number, r: number) {
        const left = arr.slice(l, m + 1)
        const right = arr.slice(m + 1, r + 1)
        let i = 0, j = 0, k = l
        while (i < left.length && j < right.length) {
            steps.push({ type: 'compare', indices: [l + i, m + 1 + j] })
            if (left[i] <= right[j]) {
                steps.push({ type: 'overwrite', indices: [k], values: [left[i]] })
                arr[k++] = left[i++]
            } else {
                steps.push({ type: 'overwrite', indices: [k], values: [right[j]] })
                arr[k++] = right[j++]
            }
        }
        while (i < left.length) {
            steps.push({ type: 'overwrite', indices: [k], values: [left[i]] })
            arr[k++] = left[i++]
        }
        while (j < right.length) {
            steps.push({ type: 'overwrite', indices: [k], values: [right[j]] })
            arr[k++] = right[j++]
        }
    }

    function sort(l: number, r: number) {
        if (l >= r) return
        const m = Math.floor((l + r) / 2)
        sort(l, m)
        sort(m + 1, r)
        merge(l, m, r)
    }

    sort(0, arr.length - 1)
    for (let i = 0; i < arr.length; i++) steps.push({ type: 'markSorted', indices: [i] })
    return steps
}
