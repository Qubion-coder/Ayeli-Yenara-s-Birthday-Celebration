import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface FairytaleEnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
  onReset: () => void;
}

export const FairytaleEnvelope: React.FC<FairytaleEnvelopeProps> = ({
  onOpen,
  isOpen,
  onReset,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);

    // Fire fairytale sparkle confetti (pink, purple, gold, cyan)
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#a855f7', '#38bdf8', '#fef08a', '#f472b6'],
      shapes: ['star', 'circle'],
    });

    setTimeout(() => {
      onOpen();
      setIsOpening(false);
    }, 1200);
  };

  return (
    <>
      {/* Top Banner / Re-seal Control if already opened */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full flex justify-center pt-6 z-50 pointer-events-none">
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-purple-900/80 text-pink-200 hover:bg-purple-800 border border-pink-400/50 backdrop-blur-md transition shadow-lg pointer-events-auto"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Close Invitation</span>
          </motion.button>
        </div>
      )}

      {/* Main Cover Image Container */}
      {!isOpen && (
        <div 
          className={`fixed inset-0 z-50 w-full h-[100dvh] bg-slate-950 flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ${isOpening ? 'scale-95 opacity-0 pointer-events-none' : 'opacity-100'}`} 
          onClick={handleOpenEnvelope}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900" />

          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
            <div className="rounded-full border border-[#7a4f2d]/30 bg-[#f9f2e7]/80 px-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:px-6">
              <p className="font-cinzel text-[9px] uppercase tracking-[0.25em] text-[#3d261d] sm:text-[10px]">
                Birthday
              </p>
              <p className="mt-1 font-cinzel text-[9px] uppercase tracking-[0.25em] text-[#3d261d] sm:text-[10px]">
                Invitation
              </p>
            </div>
          </div>
          
          {!isOpening && (
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 w-full px-4 z-10"
            >
              <div className="px-10 py-4 rounded-full bg-pink-500/20 backdrop-blur-md border-2 border-pink-400 text-lg sm:text-xl font-bold font-serif-royal shadow-[0_0_40px_rgba(236,72,153,0.5)] text-pink-100 flex items-center gap-3 whitespace-nowrap transition-transform hover:scale-105 hover:bg-pink-500/30">
                <Sparkles className="w-6 h-6 text-pink-300 animate-pulse" />
                View Invitation
                <Sparkles className="w-6 h-6 text-pink-300 animate-pulse" />
              </div>
            </motion.div>
          )}
        </div>
      )}
    </>
  );
};
