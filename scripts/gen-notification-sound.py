#!/usr/bin/env python3
"""Generate the chat widget's notification sound: a soft, deep two-note chime.

Output: mono / 44100 Hz / 16-bit PCM WAV — a drop-in replacement for
public/audio/notification.wav. The tone is a gentle descending "doo-dum"
(A3 -> E3) built from mostly-sine partials plus a sub-octave for depth, with
a quick attack and exponential decay so it reads as warm and premium, never
harsh or alarming.

Usage:
    python3 scripts/gen-notification-sound.py [output_path]
"""
import sys
import wave
import numpy as np

SR = 44100  # sample rate (Hz) — matches the original asset


def note(freq, dur, t0, total, *, decay=6.0, attack=0.008):
    """Render one soft note into a `total`-sample buffer, starting at `t0` seconds.

    Partials: fundamental sine + a light 2nd harmonic (body/audibility on small
    speakers) + a sub-octave (depth). Quick linear attack, exponential decay.
    """
    n = int(dur * SR)
    t = np.arange(n) / SR
    partials = [(1.0, 1.00), (2.0, 0.26), (0.5, 0.34)]  # (freq multiplier, amplitude)
    w = np.zeros(n)
    for mult, amp in partials:
        w += amp * np.sin(2 * np.pi * freq * mult * t)
    env = np.exp(-decay * t)
    a = int(attack * SR)
    if a > 0:
        env[:a] *= np.linspace(0.0, 1.0, a)
    w *= env
    buf = np.zeros(total)
    s = int(t0 * SR)
    end = min(n, total - s)
    if end > 0:
        buf[s:s + end] += w[:end]
    return buf


def main():
    out = sys.argv[1] if len(sys.argv) > 1 else "public/audio/notification.wav"
    total = int(0.58 * SR)
    sig = np.zeros(total)
    sig += note(220.00, 0.40, 0.00, total)   # A3
    sig += note(164.81, 0.46, 0.17, total)   # E3 — descending fourth, rings slightly longer

    # Gentle global fade-out tail so the buffer ends cleanly at zero (no click).
    fade = int(0.025 * SR)
    sig[-fade:] *= np.linspace(1.0, 0.0, fade)

    # Normalize to ~ -3 dBFS for headroom (no clipping).
    peak = np.max(np.abs(sig)) or 1.0
    sig = sig / peak * 0.70

    pcm = np.int16(np.clip(sig, -1.0, 1.0) * 32767)
    with wave.open(out, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print(f"wrote {out}: {len(pcm)} frames, {len(pcm)/SR:.3f}s, "
          f"int16 peak {int(np.max(np.abs(pcm)))}/32767")


if __name__ == "__main__":
    main()
