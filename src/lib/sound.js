// UI click sounds, synthesised with the Web Audio API (no audio files to load).
// A visitor can mute them from the top bar; the choice is remembered per browser.

const STORAGE_KEY = 'ui-sound'
let ctx = null
let muted = readMuted()
const listeners = new Set()

function readMuted() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'off'
  } catch {
    return false
  }
}

function audio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// One short voice: a pitched blip with a fast exponential decay.
function blip(ac, { freq, to = freq, start = 0, dur = 0.06, gain = 0.06, type = 'sine' }) {
  const t = ac.currentTime + start
  const osc = ac.createOscillator()
  const amp = ac.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  osc.frequency.exponentialRampToValueAtTime(to, t + dur)
  amp.gain.setValueAtTime(0.0001, t)
  amp.gain.exponentialRampToValueAtTime(gain, t + 0.004)
  amp.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  osc.connect(amp).connect(ac.destination)
  osc.start(t)
  osc.stop(t + dur + 0.02)
}

const SOUNDS = {
  // default button press: a soft, glassy tick
  tap: (ac) => {
    blip(ac, { freq: 1900, to: 1200, dur: 0.045, gain: 0.05, type: 'triangle' })
    blip(ac, { freq: 420, to: 260, dur: 0.06, gain: 0.05 })
  },
  // sidebar / tab change: a little lower and rounder
  nav: (ac) => {
    blip(ac, { freq: 980, to: 720, dur: 0.07, gain: 0.06 })
    blip(ac, { freq: 1960, to: 1500, dur: 0.035, gain: 0.025, type: 'triangle' })
  },
  // opening a drawer or the command palette: two rising notes
  open: (ac) => {
    blip(ac, { freq: 660, dur: 0.07, gain: 0.05 })
    blip(ac, { freq: 990, start: 0.055, dur: 0.09, gain: 0.05 })
  },
  close: (ac) => {
    blip(ac, { freq: 880, dur: 0.06, gain: 0.045 })
    blip(ac, { freq: 600, start: 0.045, dur: 0.08, gain: 0.045 })
  },
  success: (ac) => {
    blip(ac, { freq: 784, dur: 0.08, gain: 0.05 })
    blip(ac, { freq: 1046, start: 0.07, dur: 0.08, gain: 0.05 })
    blip(ac, { freq: 1318, start: 0.14, dur: 0.14, gain: 0.05 })
  },
}

export function play(name = 'tap') {
  if (muted) return
  try {
    const ac = audio()
    if (ac) (SOUNDS[name] ?? SOUNDS.tap)(ac)
  } catch {
    // audio is decoration; never let it break a click
  }
}

export function isMuted() {
  return muted
}

export function setMuted(value) {
  muted = value
  try {
    localStorage.setItem(STORAGE_KEY, value ? 'off' : 'on')
  } catch {
    /* private mode */
  }
  listeners.forEach((fn) => fn(muted))
  if (!value) play('success')
}

export function onMutedChange(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

// Every button, link and tab plays a tick. Elements can pick another sound with
// data-sound="nav|open|close|success" or opt out with data-sound="none".
export function installClickSounds() {
  const handler = (event) => {
    const el = event.target.closest?.('button, a, [role="button"], [role="tab"], summary')
    if (!el || el.disabled || el.getAttribute('aria-disabled') === 'true') return
    const name = el.dataset.sound
    if (name === 'none') return
    play(name || 'tap')
  }
  document.addEventListener('click', handler, true)
  return () => document.removeEventListener('click', handler, true)
}
