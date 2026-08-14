import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Music } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Fairytale harp notes frequency array (Pentatonic C major fairy scale)
  const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];

  const playChimeNote = (freq: number) => {
    if (!audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Gentle attack and slow decay like a magic music box harp
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.6);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      setIsPlaying(true);

      // Play introductory arpeggio
      playChimeNote(523.25);
      setTimeout(() => playChimeNote(659.25), 200);
      setTimeout(() => playChimeNote(783.99), 400);

      // Loop serene fairytale melody notes
      let step = 0;
      intervalRef.current = window.setInterval(() => {
        const noteIndex = (step * 3 + Math.floor(Math.random() * 2)) % notes.length;
        playChimeNote(notes[noteIndex]);
        step++;
      }, 1400);
    }
  };

  useEffect(() => {
    const handleInteraction = () => {
      if (!audioCtxRef.current) {
        toggleAudio();
      }
      ['click', 'touchstart', 'scroll'].forEach(e => window.removeEventListener(e, handleInteraction));
    };

    ['click', 'touchstart', 'scroll'].forEach(e => window.addEventListener(e, handleInteraction, { once: true }));

    return () => {
      ['click', 'touchstart', 'scroll'].forEach(e => window.removeEventListener(e, handleInteraction));
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-md border shadow-lg transition-all transform active:scale-95 ${
        isPlaying
          ? 'bg-gradient-to-r from-pink-500/90 via-purple-500/90 to-indigo-500/90 text-white border-pink-300 shadow-pink-500/30 ring-2 ring-pink-400/50 animate-pulse'
          : 'bg-slate-900/80 text-pink-200 border-pink-500/30 hover:bg-slate-800 shadow-purple-900/40'
      }`}
      title={isPlaying ? "Mute Fairytale Music" : "Play Fairytale Ambient Music"}
    >
      {isPlaying ? (
        <>
          <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
          <Volume2 className="w-4 h-4" />
          <span className="text-xs font-semibold tracking-wider">Magical Music On</span>
        </>
      ) : (
        <>
          <Music className="w-4 h-4 text-pink-300" />
          <VolumeX className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold tracking-wider">Play Music</span>
        </>
      )}
    </button>
  );
};
