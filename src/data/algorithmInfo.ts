export const algorithms = [
    {
        id: 'bubble',
        name: 'Bubble Sort',
        info: 'Repeatedly swaps adjacent elements that are out of order.',
        time: 'O(n^2)',
        space: 'O(1)',
        stable: true,
        pseudocode: [`for i 0..n-1`, ` for j 0..n-i-2`, `  if a[j] > a[j+1] swap`]
    },
    {
        id: 'selection',
        name: 'Selection Sort',
        info: 'Selects the minimum element and places it at the front each pass.',
        time: 'O(n^2)',
        space: 'O(1)',
        stable: false,
        pseudocode: [`for i 0..n-1`, ` min = i`, ` for j i+1..n-1`, `  if a[j] < a[min] min=j`, ` swap a[i], a[min]`]
    },
    {
        id: 'insertion',
        name: 'Insertion Sort',
        info: 'Builds a sorted prefix by inserting elements into the correct position.',
        time: 'O(n^2)',
        space: 'O(1)',
        stable: true,
        pseudocode: [`for i=1..n-1`, ` j=i`, ` while j>0 and a[j-1]>a[j] swap; j--`]
    },
    {
        id: 'merge',
        name: 'Merge Sort',
        info: 'Divide-and-conquer stable sort using merging.',
        time: 'O(n log n)',
        space: 'O(n)',
        stable: true,
        pseudocode: [`if l>=r return`, ` m=(l+r)/2`, ` sort(l,m)`, ` sort(m+1,r)`, ` merge`]
    },
    {
        id: 'quick',
        name: 'Quick Sort',
        info: 'Divide-and-conquer pivot-based sort; average O(n log n).',
        time: 'O(n log n) average',
        space: 'O(log n) average',
        stable: false,
        pseudocode: [`choose pivot`, `partition`, `sort left`, `sort right`]
    },
    {
        id: 'heap',
        name: 'Heap Sort',
        info: 'Turns array into a heap, then repeatedly extracts max.',
        time: 'O(n log n)',
        space: 'O(1)',
        stable: false,
        pseudocode: [`build max-heap`, `for i=n-1..1 swap 0,i; heapify(0,i)`]
    },
    {
        id: 'shell',
        name: 'Shell Sort',
        info: 'Generalized insertion sort with diminishing gaps.',
        time: 'depends (often ~O(n^{1.25}))',
        space: 'O(1)',
        stable: false,
        pseudocode: [`gap=n/2`, `while gap>0 do insertion pass`, `gap=gap/2`]
    }
]
