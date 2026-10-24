let ctx: AudioContext | null = null

// Short synthesized key click (noise tick + low thump), so no audio asset is needed.
export function playClick() {
  try {
    let AC: typeof AudioContext | undefined =
      window.AudioContext || (window as any).webkitAudioContext
    if (!AC) return
    ctx = ctx ?? new AC()
    if (ctx.state === 'suspended') void ctx.resume()
    let t = ctx.currentTime

    let len = Math.floor(ctx.sampleRate * 0.03)
    let buffer = ctx.createBuffer(1, len, ctx.sampleRate)
    let data = buffer.getChannelData(0)
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3)
    }
    let noise = ctx.createBufferSource()
    noise.buffer = buffer
    let filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 2600
    filter.Q.value = 0.9
    let noiseGain = ctx.createGain()
    noiseGain.gain.value = 0.5
    noise.connect(filter).connect(noiseGain).connect(ctx.destination)
    noise.start(t)

    let osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(190, t)
    osc.frequency.exponentialRampToValueAtTime(70, t + 0.05)
    let oscGain = ctx.createGain()
    oscGain.gain.setValueAtTime(0.35, t)
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06)
    osc.connect(oscGain).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.07)
  } catch {
    // audio is a nicety; ignore failures
  }
}
