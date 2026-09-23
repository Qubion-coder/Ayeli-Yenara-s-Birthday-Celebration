import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Music } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.error("Audio playback failed:", e);
      });
    }
  };

  useEffect(() => {
    const events = ['click', 'touchstart', 'keydown', 'pointerdown'];
    
    const handleInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          // Only remove listeners if play is successfully allowed by the browser
          events.forEach(e => document.removeEventListener(e, handleInteraction, { capture: true }));
        }).catch(e => {
          console.log("Autoplay prevented by browser, waiting for next interaction...");
        });
      }
    };

    // Use capture: true to catch events before React can stop propagation
    events.forEach(e => document.addEventListener(e, handleInteraction, { capture: true }));

    return () => {
      events.forEach(e => document.removeEventListener(e, handleInteraction, { capture: true }));
    };
  }, []);

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/christina perri - a thousand years (lullaby).mp3" 
        loop 
        preload="auto"
      />
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
    </>
  );
};
