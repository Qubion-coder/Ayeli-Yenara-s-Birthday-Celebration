import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const images = [
  "/pre/HOSPITAL.jpg",
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

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'idle' | 'enter' | 'exit'>('idle');

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);


  const startAnimation = () => {
    setPhase('enter');

    // Images fall one by one. Hold them for a bit.
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 12000);

    // Call onComplete after exit animation finishes
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 13500);
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
      <div className="absolute inset-0 bg-slate-950/40 -z-10" />
      
      {phase === 'idle' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 flex flex-col items-center gap-6 sm:gap-8 px-4 text-center"
        >
          <div className="space-y-3">
            <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] uppercase text-purple-950 font-extrabold drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">
              You are warmly invited to
            </p>
            <h1 className="font-cinzel text-4xl sm:text-6xl font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] tracking-wide">
              Ayeli Yenara's
            </h1>
            <h2 className="font-serif-royal text-2xl sm:text-4xl italic text-purple-950 font-bold drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] mt-2">
              Birthday Celebration
            </h2>
          </div>

          <button
            onClick={startAnimation}
            className="mt-6 px-10 py-4 rounded-full bg-white/95 backdrop-blur-md border border-white/50 text-lg sm:text-xl font-bold font-serif-royal shadow-[0_10px_40px_rgba(0,0,0,0.4)] text-purple-950 flex items-center gap-3 whitespace-nowrap transition-transform hover:scale-105 hover:bg-white"
          >
            <Sparkles className="w-5 h-5 text-pink-500" />
            Open Invitation
            <Sparkles className="w-5 h-5 text-pink-500" />
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {phase !== 'idle' && images.map((src, index) => {
          // Generate a deterministic random look for each image
          const rotations = [-12, 14, -8, 10, -15, 12, -6, 9, -11, 15, -9, 7, -14];
          
          // Spread 13 images all around the screen to fill all empty space nicely
          const xOffsets = [
            "-32vw", "28vw", "-15vw", "15vw", "-28vw", "32vw", "0vw",
            "-22vw", "22vw", "-35vw", "35vw", "-10vw", "10vw"
          ];
          const yOffsets = [
            "-35vh", "-30vh", "-15vh", "-10vh", "15vh", "10vh", "0vh",
            "35vh", "30vh", "-5vh", "5vh", "25vh", "-25vh"
          ];
          
          const colors = ["#fbcfe8", "#fce7f3", "#f9a8d4", "#f472b6", "#ec4899", "#fdf2f8", "#fce7f3"];

          return (
            <motion.div
              key={src}
              initial={{ y: "-120vh", rotate: rotations[index % rotations.length], x: xOffsets[index % xOffsets.length], opacity: 1 }}
              animate={{
                y: phase === 'enter' ? yOffsets[index % yOffsets.length] : "120vh",
                rotate: rotations[index % rotations.length],
                x: xOffsets[index % xOffsets.length]
              }}
              transition={{
                y: phase === 'enter'
                  ? { delay: index * 0.7, duration: 2.5, ease: "easeOut" }
                  : { duration: 1.5, ease: "easeInOut", delay: index * 0.1 } // Exit sequentially too, slightly staggered
              }}
              className="absolute w-40 h-52 sm:w-[26rem] sm:h-[34rem] shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-1.5 sm:p-4 pb-6 sm:pb-12 rounded-sm border border-white/20"
              style={{ zIndex: index + 10, backgroundColor: colors[index % colors.length] }}
            >
              <div className="w-full h-full relative overflow-hidden rounded-sm">
                <img src={src} alt={`Intro ${index}`} className="w-full h-full object-contain bg-white" />
                <div className="absolute inset-0 bg-black/5" />
              </div>
              <div className="absolute bottom-1.5 sm:bottom-3 left-0 w-full text-center px-2">
                <p className="font-serif-royal italic text-[11px] sm:text-sm font-bold text-pink-950/80 tracking-widest truncate">
                  {getFileName(src)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {/* Sparkles background during animation */}
      {phase === 'enter' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 text-pink-300 text-xl animate-float-slow">✨</div>
          <div className="absolute top-1/3 right-1/4 text-blue-300 text-2xl animate-float-delayed">🦋</div>
          <div className="absolute bottom-1/3 left-1/3 text-purple-300 text-lg animate-float-slow opacity-80">✨</div>
        </div>
      )}
    </div>
  );
};
