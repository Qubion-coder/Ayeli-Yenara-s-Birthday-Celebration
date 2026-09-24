import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
  inviteeName?: string | null;
}

const images = [
  "/pre/NEW BORN.jpg",
  "/pre/1ST MONTH.jpg",
  "/pre/2ND MONTH.jpg",
  "/pre/3RD MONTH.jpg",
  "/pre/4TH MONTH.jpg",
  "/pre/5TH MONTH.jpg",
  "/pre/6TH MONTH.jpeg",
  "/pre/7TH MONTH.jpg",
  "/pre/8TH MONTH.jpg",
  "/pre/9TH MONTH.jpg",
  "/pre/10TH MONTH.jpg",
  "/pre/11TH MONTH.jpg.jpeg"
];

const getFileName = (path: string) => {
  return path.split('/').pop()?.split('.')[0] || '';
};

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete, inviteeName }) => {
  const [phase, setPhase] = useState<'idle' | 'intro_text' | 'enter' | 'message' | 'exit'>('idle');

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);


  const startAnimation = () => {
    setPhase('intro_text');

    // Show intro text for a few seconds, then start image sequence
    const enterTimer = setTimeout(() => {
      setPhase('enter');
    }, 4500);

    // Total duration for 12 images:
    // duration 2.4s, exit starts at 1.92s
    // 11 * 1.92 + 2.4 = 23.52s
    const messageTimer = setTimeout(() => {
      setPhase('message');
    }, 28500); // 4500 + 24000

    // Fade out message and transition
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 38500);

    // Call onComplete after exit animation finishes
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 39500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video 
        src="/bag.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      
      {/* Optional dark overlay to make images and button pop */}
      <div className="absolute inset-0 bg-ivory/60 -z-10" />
      
      {phase === 'idle' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 flex flex-col items-center gap-6 sm:gap-8 px-4 text-center"
        >
          <div className="space-y-3">
            {inviteeName && (
              <p className="font-serif-royal italic text-3xl sm:text-5xl text-pink-dusty font-bold mb-4 drop-shadow-md">
                Dear {inviteeName},
              </p>
            )}
            <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] uppercase text-olive-dark font-extrabold drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
              You are warmly invited to
            </p>
            <h1 className="font-cinzel text-4xl sm:text-6xl font-black text-pink-deep drop-shadow-[0_4px_12px_rgba(255,255,255,0.6)] tracking-wide">
              Ayeli Yenara's
            </h1>
            <h2 className="font-serif-royal text-2xl sm:text-4xl italic text-olive-dark font-bold drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] mt-2">
              Birthday Celebration
            </h2>
          </div>

          <button
            onClick={startAnimation}
            className="mt-6 px-10 py-4 rounded-full bg-ivory/95 backdrop-blur-md border border-white/50 text-lg sm:text-xl font-bold font-serif-royal shadow-[0_10px_40px_rgba(0,0,0,0.2)] text-olive-dark flex items-center gap-3 whitespace-nowrap transition-transform hover:scale-105 hover:bg-white"
          >
            <Sparkles className="w-5 h-5 text-pink-dusty" />
            Open Invitation
            <Sparkles className="w-5 h-5 text-pink-dusty" />
          </button>
        </motion.div>
      )}

      {/* Intro Text Phase */}
      <AnimatePresence>
        {phase === 'intro_text' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="z-50 absolute inset-0 flex items-center justify-center p-8 bg-ivory/80 backdrop-blur-sm"
          >
            <div className="max-w-3xl text-center space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="font-serif-royal text-2xl sm:text-4xl lg:text-5xl text-olive-dark italic font-medium leading-relaxed drop-shadow-md"
              >
                Once upon a time.. 
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 1.5 }}
                className="font-cinzel text-xl sm:text-3xl lg:text-4xl text-pink-dusty font-bold leading-relaxed drop-shadow-md"
              >
                a tiny butterfly came into our world 🌸
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase !== 'idle' && images.map((src, index) => {
          const colors = ["#fbcfe8", "#fce7f3", "#f9a8d4", "#f472b6", "#ec4899", "#fdf2f8", "#fce7f3"];

          return (
            <motion.div
              key={src}
              initial={{ 
                opacity: 0, 
                scale: 0.5, 
                x: "-100vw", 
                y: 0,
                rotate: -20
              }}
              animate={
                phase === 'enter' ? {
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1, 1.05, 0.5],
                  x: ["-100vw", "0vw", "0vw", "100vw"],
                  rotate: [-20, 0, 0, 20]
                } : {
                  opacity: 0
                }
              }
              transition={
                phase === 'enter' ? {
                  duration: 2.4,
                  times: [0, 0.2, 0.8, 1], // 0-0.48s: enter, 0.48-1.92s: stay, 1.92-2.4s: exit
                  delay: index * 1.92, // Next image enters exactly as this one exits
                  ease: "easeInOut"
                } : { duration: 0.5 }
              }
              className="absolute w-[80vw] h-[65vh] sm:w-[40rem] sm:h-[50rem] max-w-[95vw] max-h-[85vh] shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-2 sm:p-5 pb-8 sm:pb-16 rounded-sm border border-white/30"
              style={{ zIndex: index + 10, backgroundColor: colors[index % colors.length] }}
            >
              <div className="w-full h-full relative overflow-hidden rounded-sm">
                <img src={src} alt={`Intro ${index}`} className="w-full h-full object-contain bg-white" />
                <div className="absolute inset-0 bg-black/5" />
              </div>

              {/* Creative Corner Decor */}
              <motion.div animate={{ rotate: [0, 15, -5, 0], y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 text-4xl sm:text-6xl drop-shadow-lg z-20">🦋</motion.div>
              <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 180] }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 text-3xl sm:text-5xl text-pink-dusty drop-shadow-lg z-20">✨</motion.div>
              <motion.div animate={{ rotate: [0, -10, 10, 0], y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 text-5xl sm:text-7xl drop-shadow-lg z-20">🦋</motion.div>
              <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} className="absolute bottom-6 -left-4 sm:bottom-8 sm:-left-6 text-2xl sm:text-4xl text-pink-dusty drop-shadow-lg z-20">✨</motion.div>

              <div className="absolute bottom-2 sm:bottom-4 left-0 w-full text-center px-2">
                <p className="font-serif-royal italic text-sm sm:text-xl font-bold text-pink-950/80 tracking-widest truncate">
                  {getFileName(src)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {/* Background decorations removed as requested to place them on images */}

      {/* Final Message */}
      <AnimatePresence>
        {phase === 'message' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="z-50 absolute inset-0 flex items-center justify-center p-4 sm:p-8 bg-ivory/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -50 }}
              transition={{ delay: 0.3, duration: 1.2, type: "spring", bounce: 0.3 }}
              className="relative w-full max-w-4xl p-8 sm:p-16 rounded-[2rem] sm:rounded-[4rem] border border-white/60 bg-white/50 shadow-[0_10px_40px_rgba(0,0,0,0.1)] text-center overflow-hidden"
            >
              {/* Cute soft gradient overlay inside the card */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-pale via-ivory to-pink-pale" />

              {/* Decorative floating butterflies */}
              <motion.div animate={{ y: [0, -20, 0], rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-4 left-4 sm:top-10 sm:left-12 text-4xl sm:text-6xl drop-shadow-md">🦋</motion.div>
              <motion.div animate={{ y: [0, 20, 0], rotate: [0, 15, -5, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute bottom-4 right-4 sm:bottom-12 sm:right-12 text-5xl sm:text-7xl drop-shadow-md">🦋</motion.div>
              <motion.div animate={{ y: [0, -10, 0], x: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }} className="absolute top-1/2 left-2 sm:left-6 text-2xl sm:text-4xl drop-shadow-md opacity-80">🦋</motion.div>
              <motion.div animate={{ y: [0, 15, 0], rotate: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }} className="absolute top-8 right-6 sm:top-16 sm:right-16 text-3xl sm:text-5xl drop-shadow-md opacity-70">🦋</motion.div>

              <div className="relative z-10 space-y-8 sm:space-y-12">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 1 }}
                  className="font-serif-royal text-2xl sm:text-4xl lg:text-5xl text-olive-dark drop-shadow-sm font-bold italic"
                >
                  11 months have been captured…. 
                </motion.p>
                
                <motion.p 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.2, duration: 1 }}
                  className="font-serif-royal text-2xl sm:text-4xl lg:text-5xl text-pink-dusty drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] font-bold italic"
                >
                  But the sweetest picture is yet to be revealed.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.8, duration: 1.2 }}
                  className="pt-6 sm:pt-8"
                >
                  <p className="font-cinzel text-xl sm:text-3xl lg:text-4xl text-olive-dark drop-shadow-sm font-black leading-relaxed">
                    Come flutter into our butterfly garden <br className="hidden sm:block"/>
                    to see our little butterfly at <span className="text-pink-dusty text-4xl sm:text-6xl lg:text-7xl inline-block mx-2 drop-shadow-md animate-pulse">12</span> months 🦋
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip Intro Button */}
      {phase !== 'idle' && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onComplete}
          className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-[300] px-4 py-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-white/80 hover:text-white text-xs sm:text-sm font-serif-royal transition-all"
        >
          Skip Intro ⏭
        </motion.button>
      )}
    </div>
  );
};
