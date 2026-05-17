export type AnimationStep = {
    type: 'compare' | 'swap' | 'overwrite' | 'pivot' | 'markSorted' | 'range'
    indices: number[]
    values?: number[]
}

export type AlgorithmFn = (arr: number[], options?: any) => AnimationStep[]
