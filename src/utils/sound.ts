let audioCtx: AudioContext | null = null

function getCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
    return audioCtx
}

type ActiveNode = { osc: OscillatorNode; gain: GainNode; stopped: boolean }
const active: ActiveNode[] = []

function playTone(freq = 440, duration = 0.12, type: OscillatorType = 'sine') {
    const ctx = getCtx()
    const now = ctx.currentTime
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    const lpf = ctx.createBiquadFilter()

    // gentle lowpass for a smoother "liquid" timbre
    lpf.type = 'lowpass'
    lpf.frequency.value = Math.max(800, freq * 2)

    o.type = type
    o.frequency.setValueAtTime(freq * 0.9, now)
    // small pitch glide up for a pleasing effect
    o.frequency.linearRampToValueAtTime(freq, now + Math.min(0.02, duration / 4))

    // smooth envelope
    g.gain.setValueAtTime(0.0001, now)
    g.gain.exponentialRampToValueAtTime(0.06, now + 0.01) // attack
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration) // release

    o.connect(lpf)
    lpf.connect(g)
    g.connect(ctx.destination)

    o.start(now)
    o.stop(now + duration + 0.02)

    const node: ActiveNode = { osc: o, gain: g, stopped: false }
    active.push(node)

    // cleanup when ended
    const remove = () => {
        node.stopped = true
        const idx = active.indexOf(node)
        if (idx >= 0) active.splice(idx, 1)
    }

    // best-effort: stop after duration + small buffer
    setTimeout(remove, (duration + 0.05) * 1000)
}

export function stopAllSounds() {
    const ctx = audioCtx
    if (!ctx) return
    // stop and disconnect all active nodes immediately
    active.slice().forEach(n => {
        try {
            n.gain.gain.cancelScheduledValues(ctx.currentTime)
            n.gain.gain.setValueAtTime(0.0001, ctx.currentTime)
            n.osc.stop(ctx.currentTime + 0.001)
        } catch (e) {
            // ignore
        }
        n.stopped = true
    })
    active.length = 0
}

export function playComparison() { playTone(700, 0.06, 'triangle') }
export function playSwap() { playTone(330, 0.12, 'sine') }
export function playComplete() { playTone(880, 0.22, 'triangle') }
