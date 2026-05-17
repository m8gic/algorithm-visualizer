import React from 'react'

type Props = {
    array: number[]
    maxValue: number
    highlighted: { [k: string]: number[] }
}

export default function BarChart({ array, maxValue, highlighted }: Props) {
    return (
        <div className="w-full h-72 flex items-end gap-1">
            {array.map((v, i) => {
                const pct = (v / maxValue) * 100

                // Use explicit inline gradient backgrounds to avoid any browser-specific
                // Tailwind utility hiccups so bars are always visible in Chrome.
                let bgStyle = 'linear-gradient(180deg,#60a5fa,#2563eb)'
                if (highlighted.compare && highlighted.compare.includes(i)) bgStyle = 'linear-gradient(180deg,#c084fc,#7e22ce)'
                if (highlighted.swap && highlighted.swap.includes(i)) bgStyle = 'linear-gradient(180deg,#d8b4fe,#6b21a8)'
                if (highlighted.pivot && highlighted.pivot.includes(i)) bgStyle = 'linear-gradient(180deg,#e9d5ff,#9333ea)'
                if (highlighted.sorted && highlighted.sorted.includes(i)) bgStyle = 'linear-gradient(180deg,#a78bfa,#7c3aed)'

                const style: React.CSSProperties = {
                    height: `${Math.max(6, pct)}%`,
                    width: `${100 / array.length}%`,
                    background: bgStyle,
                }

                return (
                    <div
                        key={i}
                        className="bar rounded-sm"
                        style={style}
                        title={`${v}`}
                    />
                )
            })}
        </div>
    )
}
