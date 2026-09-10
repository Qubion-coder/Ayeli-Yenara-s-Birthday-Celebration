import React, { useState, useEffect } from 'react';
import { Sparkles, Crown } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string; // e.g. "2025-10-17T18:00:00+05:30" or "2026-10-17T18:00:00+05:30"
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      let target = new Date(targetDate).getTime();
      const now = Date.now();

      // If the target date is in the past, roll forward to the next upcoming 17th of October
      // so the countdown timer always shows an active, ticking countdown!
      if (isNaN(target) || target <= now) {
        const d = new Date(targetDate);
        if (isNaN(d.getTime())) {
          const nextYear = new Date().getFullYear();
          const candidate = new Date(`${nextYear}-10-17T18:00:00+05:30`).getTime();
          target = candidate > now ? candidate : new Date(`${nextYear + 1}-10-17T18:00:00+05:30`).getTime();
        } else {
          const currentYear = new Date().getFullYear();
          d.setFullYear(currentYear);
          if (d.getTime() <= now) {
            d.setFullYear(currentYear + 1);
          }
          target = d.getTime();
        }
      }

      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MIN', value: timeLeft.minutes },
    { label: 'SEC', value: timeLeft.seconds },
  ];

  return (
    <div className="relative z-10 w-full max-w-[560px] my-6 p-5 sm:p-7 rounded-[32px] border-2 border-pink-400/40 bg-gradient-to-br from-[#2a0e2d]/95 via-[#1a0826]/95 to-[#3b1236]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(40,10,45,0.7)] text-white">
      
      {/* Header with magical royal sparkles */}
      <div className="flex items-center justify-center gap-2 mb-5 text-center">
        <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.25em] text-amber-200 uppercase drop-shadow">
          Countdown to the Royal Celebration
        </span>
        <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
      </div>

      {/* 4 Number Countdown Boxes (Days, Hours, Min, Sec) */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border border-pink-300/30 bg-white/10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),0_8px_20px_rgba(0,0,0,0.3)] backdrop-blur-md group hover:border-pink-300/60 transition-colors"
          >
            {/* Ambient golden glow behind number */}
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-amber-300/10 rounded-2xl pointer-events-none" />

            <span className="font-mono text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-amber-200 drop-shadow-[0_2px_12px_rgba(251,191,36,0.6)] leading-none">
              {String(unit.value).padStart(2, '0')}
            </span>

            <span className="mt-2 text-[10px] sm:text-xs font-serif-royal font-bold tracking-[0.18em] uppercase text-pink-200/90 leading-none">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {/* Subtitle / Event Date Tag */}
      <div className="mt-4 pt-3 border-t border-pink-500/20 text-center">
        <p className="text-[11px] sm:text-xs text-pink-200/80 font-serif-royal italic flex items-center justify-center gap-1.5">
          <Crown className="w-3.5 h-3.5 text-amber-300 inline" />
          <span>Baby Menaya's Fairytale Birthday • 6:00 PM</span>
          <Crown className="w-3.5 h-3.5 text-amber-300 inline" />
        </p>
      </div>

    </div>
  );
};
