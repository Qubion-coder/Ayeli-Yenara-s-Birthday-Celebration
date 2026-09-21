import React from 'react';
import { Crown, Sparkles, Heart } from 'lucide-react';

export const RoyalPortrait: React.FC = () => {
  return (
    <div className="relative mx-auto max-w-sm rounded-3xl p-1 bg-gradient-to-tr from-pink-400 via-purple-500 to-indigo-500 shadow-2xl shadow-purple-900/50 group">
      {/* Decorative Sparkle Highlights */}
      <div className="absolute -top-3 -right-3 z-20 bg-amber-300 text-amber-950 rounded-full p-2 shadow-lg animate-bounce">
        <Crown className="w-5 h-5 fill-amber-400" />
      </div>
      <div className="absolute -bottom-3 -left-3 z-20 bg-pink-500 text-white rounded-full p-2 shadow-lg animate-pulse">
        <Sparkles className="w-5 h-5" />
      </div>

      <div className="relative overflow-hidden rounded-[22px] bg-slate-900 aspect-[3/4] flex flex-col justify-end p-6 text-center text-white">
        {/* Render Actual Photo of Baby Ayeli Yenara */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-pink-950">
          {/* Celestial background stars overlaying the photo */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#f472b6_1px,transparent_1px)] [background-size:16px_16px] z-10 pointer-events-none" />

          <img src="/1.jpeg" alt="Baby Ayeli Yenara" className="w-full h-full object-cover opacity-90" />
        </div>

        {/* Overlay Banner text inside image */}
        <div className="relative z-10 pt-36 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent rounded-b-[20px] p-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-amber-400/20 text-amber-300 border border-amber-400/40 mb-2">
            <Crown className="w-3.5 h-3.5" /> Fairytale Royal Celebration
          </span>
          <h3 className="font-cinzel text-xl font-bold text-amber-200 drop-shadow">
            Baby Ayeli Yenara
          </h3>
          <p className="text-xs text-pink-200 mt-1 font-serif-royal italic">
            "A Magical Fairytale Celebration in the Enchanted Kingdom"
          </p>
        </div>
      </div>

      <div className="mt-3 text-center px-2 pb-1">
        <p className="text-xs text-pink-200/90 font-medium flex items-center justify-center gap-1">
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
          Baby Ayeli Yenara's Birthday Celebration
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
        </p>
      </div>
    </div>
  );
};
