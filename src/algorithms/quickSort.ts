import { AnimationStep } from '../types/sorting'

type Options = {
    pivot?: 'first' | 'last' | 'random' | 'median'
    scheme?: 'lomuto' | 'hoare'
}

function medianOfThree(arr: number[], a: number, b: number, c: number) {
    const trio = [a, b, c].sort((x, y) => arr[x] - arr[y])
    return trio[1]
}

export default function quickSort(input: number[], options: Options = { pivot: 'last', scheme: 'lomuto' }) {
    const arr = input.slice()
    const steps: AnimationStep[] = []

    function choosePivot(l: number, r: number) {
        const { pivot } = options
        if (pivot === 'first') return l
        if (pivot === 'last') return r
        if (pivot === 'random') return Math.floor(Math.random() * (r - l + 1)) + l
        const m = Math.floor((l + r) / 2)
        return medianOfThree(arr, l, m, r)
    }

    function lomuto(l: number, r: number) {
        const pIdx = choosePivot(l, r)
        steps.push({ type: 'pivot', indices: [pIdx] })
        const pivotVal = arr[pIdx]
        if (pIdx !== r) {
            steps.push({ type: 'swap', indices: [pIdx, r] })
            const tmp = arr[pIdx]; arr[pIdx] = arr[r]; arr[r] = tmp
        }
        let i = l
        for (let j = l; j < r; j++) {
            steps.push({ type: 'compare', indices: [j, r] })
            if (arr[j] < pivotVal) {
                steps.push({ type: 'swap', indices: [i, j] })
                const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp
                i++
            }
        }
        steps.push({ type: 'swap', indices: [i, r] })
        const tmp = arr[i]; arr[i] = arr[r]; arr[r] = tmp
        return i
    }

    function hoare(l: number, r: number) {
        const pIdx = choosePivot(l, r)
        steps.push({ type: 'pivot', indices: [pIdx] })
        const pivotVal = arr[pIdx]
        let i = l - 1
        let j = r + 1
        while (true) {
            do { i++; steps.push({ type: 'compare', indices: [i, pIdx] }) } while (arr[i] < pivotVal)
            do { j--; steps.push({ type: 'compare', indices: [j, pIdx] }) } while (arr[j] > pivotVal)
            if (i >= j) return j
            steps.push({ type: 'swap', indices: [i, j] })
            const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp
        }
    }

    function sort(l: number, r: number) {
        if (l >= r) return
        const scheme = options.scheme || 'lomuto'
        if (scheme === 'lomuto') {
            const p = lomuto(l, r)
            sort(l, p - 1)
            sort(p + 1, r)
        } else {
            const p = hoare(l, r)
            sort(l, p)
            sort(p + 1, r)
        }
    }

    sort(0, arr.length - 1)
    for (let i = 0; i < arr.length; i++) steps.push({ type: 'markSorted', indices: [i] })
    return steps
}
