import React from 'react';
import { Crown, Sparkles, Heart } from 'lucide-react';

export const RoyalPortrait: React.FC = () => {
  return (
    <div className="relative mx-auto max-w-sm rounded-3xl p-1 bg-gradient-to-tr from-pink-pale via-ivory to-pink-pale shadow-2xl shadow-olive-light/50 group">
      {/* Decorative Sparkle Highlights */}
      <div className="absolute -top-3 -right-3 z-20 bg-pink-dusty text-white rounded-full p-2 shadow-lg animate-bounce">
        <Crown className="w-5 h-5 fill-pink-pale" />
      </div>
      <div className="absolute -bottom-3 -left-3 z-20 bg-olive-light text-white rounded-full p-2 shadow-lg animate-pulse">
        <Sparkles className="w-5 h-5" />
      </div>

      <div className="relative overflow-hidden rounded-[22px] bg-ivory aspect-[3/4] flex flex-col justify-end p-6 text-center text-olive-dark">
        {/* Render Actual Photo of Baby Ayeli Yenara */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-pale via-ivory to-pink-pale">
          {/* Celestial background stars overlaying the photo */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#E8C0C5_1px,transparent_1px)] [background-size:16px_16px] z-10 pointer-events-none" />

          <img src="/1.jpeg" alt="Baby Ayeli Yenara" className="w-full h-full object-cover opacity-90" />
        </div>

        {/* Overlay Banner text inside image */}
        <div className="relative z-10 pt-36 bg-gradient-to-t from-ivory via-ivory/90 to-transparent rounded-b-[20px] p-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-pink-dusty/20 text-olive-dark border border-pink-dusty/40 mb-2">
            <Crown className="w-3.5 h-3.5" /> Fairytale Royal Celebration
          </span>
          <h3 className="font-cinzel text-xl font-bold text-pink-deep drop-shadow-sm">
            Baby Ayeli Yenara
          </h3>
          <p className="text-xs text-olive-dark/80 mt-1 font-serif-royal italic">
            "A Magical Fairytale Celebration in the Enchanted Kingdom"
          </p>
        </div>
      </div>

      <div className="mt-3 text-center px-2 pb-1">
        <p className="text-xs text-olive-dark/90 font-medium flex items-center justify-center gap-1">
          <Heart className="w-3.5 h-3.5 text-pink-dusty fill-pink-dusty" />
          Baby Ayeli Yenara's Birthday Celebration
          <Heart className="w-3.5 h-3.5 text-pink-dusty fill-pink-dusty" />
        </p>
      </div>
    </div>
  );
};
