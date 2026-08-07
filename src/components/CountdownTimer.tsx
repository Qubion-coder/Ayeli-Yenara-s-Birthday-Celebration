import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string; // "2026-09-13T11:30:00"
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // 13th September 2026 11:30 AM WA Time (UTC+8)
      const targetTime = new Date("2026-09-13T11:30:00+08:00").getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="w-full my-6 p-6 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900/90 to-pink-950/80 border border-pink-500/30 backdrop-blur-md text-white shadow-xl">
      <div className="flex items-center justify-center gap-2 text-amber-300 mb-4 text-xs font-bold font-cinzel tracking-widest uppercase">
        <Sparkles className="w-4 h-4" />
        <span>Countdown to the Fairytale Royal Feast</span>
        <Sparkles className="w-4 h-4" />
      </div>

      {timeLeft.isPast ? (
        <div className="text-center py-2 text-pink-300 font-cinzel text-xl font-bold">
          ✨ The Magical Royal Party Is Happening Today! ✨
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto text-center">
          <div className="p-2 sm:p-3 rounded-xl bg-purple-900/50 border border-pink-400/20 backdrop-blur-sm">
            <span className="block font-cinzel text-2xl sm:text-3xl font-black text-amber-200">
              {timeLeft.days}
            </span>
            <span className="text-[10px] sm:text-xs text-pink-200 uppercase font-semibold">Days</span>
          </div>
          <div className="p-2 sm:p-3 rounded-xl bg-purple-900/50 border border-pink-400/20 backdrop-blur-sm">
            <span className="block font-cinzel text-2xl sm:text-3xl font-black text-amber-200">
              {timeLeft.hours}
            </span>
            <span className="text-[10px] sm:text-xs text-pink-200 uppercase font-semibold">Hours</span>
          </div>
          <div className="p-2 sm:p-3 rounded-xl bg-purple-900/50 border border-pink-400/20 backdrop-blur-sm">
            <span className="block font-cinzel text-2xl sm:text-3xl font-black text-amber-200">
              {timeLeft.minutes}
            </span>
            <span className="text-[10px] sm:text-xs text-pink-200 uppercase font-semibold">Mins</span>
          </div>
          <div className="p-2 sm:p-3 rounded-xl bg-purple-900/50 border border-pink-400/20 backdrop-blur-sm">
            <span className="block font-cinzel text-2xl sm:text-3xl font-black text-amber-200">
              {timeLeft.seconds}
            </span>
            <span className="text-[10px] sm:text-xs text-pink-200 uppercase font-semibold">Secs</span>
          </div>
        </div>
      )}
    </div>
  );
};
