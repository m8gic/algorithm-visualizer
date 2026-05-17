export function generateArray(size: number, min = 5, max = 400) {
    const arr = Array.from({ length: size }, () =>
        Math.floor(Math.random() * (max - min + 1)) + min
    )
    return arr
}
