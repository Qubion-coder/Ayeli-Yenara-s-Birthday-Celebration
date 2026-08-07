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
          <img 
            src="/invitation-cover.png" 
            alt="Invitation Cover" 
            className="w-full h-full object-cover sm:object-contain sm:h-full" 
          />
          
          {!isOpening && (
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 w-full px-4 z-10"
            >
              <div className="px-8 py-3 rounded-full bg-black/50 backdrop-blur-md border border-pink-300/40 text-base font-bold font-sans shadow-2xl text-pink-100 flex items-center gap-3 whitespace-nowrap">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                Tap anywhere to open
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
            </motion.div>
          )}
        </div>
      )}
    </>
  );
};
