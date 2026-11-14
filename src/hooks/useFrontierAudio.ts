import { useEffect, useRef, useState, useCallback } from 'react';

// Procedural Web Audio Ambient Soundscape (Gentle Frontier Wind + Soft Campfire Embers)
// 100% original synthesis, zero copyright risk, zero external asset dependencies
export function useFrontierAudio() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const windGainRef = useRef<GainNode | null>(null);
  const fireIntervalRef = useRef<number | null>(null);

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 1. Wind Sound Generator (Filtered Pink Noise with LFO)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const whiteNoiseNode = ctx.createBufferSource();
      whiteNoiseNode.buffer = noiseBuffer;
      whiteNoiseNode.loop = true;

      const windFilter = ctx.createBiquadFilter();
      windFilter.type = 'lowpass';
      windFilter.frequency.setValueAtTime(320, ctx.currentTime);

      // Subtle LFO for wind gusting
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // slow breathing
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(140, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(windFilter.frequency);
      lfo.start();

      const windGain = ctx.createGain();
      windGain.gain.setValueAtTime(0.35, ctx.currentTime);
      windGainRef.current = windGain;

      whiteNoiseNode.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(masterGain);
      whiteNoiseNode.start();

      // 2. Soft Campfire Crackle (Random micro-bursts)
      const fireBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
      const fireData = fireBuffer.getChannelData(0);
      for (let i = 0; i < fireBuffer.length; i++) {
        fireData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.01));
      }

      const triggerCrackle = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running' || !masterGainRef.current) return;
        const pop = audioCtxRef.current.createBufferSource();
        pop.buffer = fireBuffer;

        const popFilter = audioCtxRef.current.createBiquadFilter();
        popFilter.type = 'bandpass';
        popFilter.frequency.value = 1800 + Math.random() * 1200;
        popFilter.Q.value = 3;

        const popGain = audioCtxRef.current.createGain();
        popGain.gain.value = 0.02 + Math.random() * 0.04;

        pop.connect(popFilter);
        popFilter.connect(popGain);
        popGain.connect(masterGainRef.current);
        pop.start();

        const nextTime = 120 + Math.random() * 500;
        fireIntervalRef.current = window.setTimeout(triggerCrackle, nextTime);
      };

      fireIntervalRef.current = window.setTimeout(triggerCrackle, 200);

    } catch (e) {
      console.warn('Web Audio Ambient soundscape could not initialize:', e);
    }
  }, []);

  const toggleSound = useCallback(() => {
    if (!audioCtxRef.current) {
      initAudio();
    }

    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (isPlaying) {
      // Fade out
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
      setIsPlaying(false);
      try {
        sessionStorage.setItem('frontier_sound_enabled', 'false');
      } catch {
        // ignore
      }
    } else {
      // Fade in
      master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.2);
      setIsPlaying(true);
      try {
        sessionStorage.setItem('frontier_sound_enabled', 'true');
      } catch {
        // ignore
      }
    }
  }, [initAudio, isPlaying]);

  useEffect(() => {
    return () => {
      if (fireIntervalRef.current) {
        clearTimeout(fireIntervalRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return { isPlaying, toggleSound };
}
