/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Crown, Calendar, Clock, MapPin, Heart, Flower2, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import { IntroAnimation } from './components/IntroAnimation';
import { RoyalPortrait } from './components/RoyalPortrait';
import { CountdownTimer } from './components/CountdownTimer';
import { PartySchedule } from './components/PartySchedule';
import { LocationMapSection } from './components/LocationMapSection';
import { RsvpModal } from './components/RsvpModal';


import { RoyalRegistry } from './components/RoyalRegistry';
import { AudioPlayer } from './components/AudioPlayer';
import { OrganizerDashboard } from './components/OrganizerDashboard';
import { RSVP } from './types';

export default function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [userRsvp, setUserRsvp] = useState<RSVP | null>(null);

  const handleRsvpSuccess = (rsvp: RSVP) => {
    setUserRsvp(rsvp);
  };

  return (
    <div className="min-h-screen bg-ivory text-olive-dark font-sans relative overflow-x-hidden selection:bg-pink-pale selection:text-olive-dark">
      
      {/* Background Animated Fairytale Magical Stars & Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-dusty/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-olive-light/30 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-pale/60 rounded-full blur-3xl" />

        {/* Floating Fairy Dust Particles */}
        <div className="absolute top-12 left-1/4 text-pink-dusty text-lg animate-float-slow opacity-60">✨</div>
        <div className="absolute top-1/2 left-8 text-olive-light text-2xl animate-float-delayed opacity-70">🦋</div>
        <div className="absolute top-2/3 right-12 text-pink-dusty text-xl animate-float-slow opacity-60">🌸</div>
        <div className="absolute bottom-32 right-1/4 text-olive-light text-2xl animate-float-delayed opacity-70">👑</div>
      </div>

      {/* Section 1: Interactive Intro Animation */}
      {!envelopeOpened && (
        <IntroAnimation onComplete={() => setEnvelopeOpened(true)} />
      )}

      {/* Main Scrapbook Wrapper */}

      <div className="relative z-10 w-full min-h-screen">
        <video 
          src="/bag.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none"
        />
        {/* Section 2: Main Invitation Card (Revealed after opening) */}
        {envelopeOpened && (
          <div className="animate-fadeIn transition-all duration-1000 w-full relative z-10 flex flex-col items-center gap-16">
            
            {/* The Main Invitation Card using a robust aspect-ratio layout */}
            <div className="w-full max-w-[600px] relative shadow-md flex flex-col">
              <video 
                src="/Butterflies_fluttering_in_garden_20260924013359.mp4" 
                autoPlay 
                muted 
                playsInline
                className="w-full h-[100dvh] sm:h-auto object-cover block" 
              />

              <div className="absolute top-[7%] left-1/2 -translate-x-1/2 z-20">
                <div className="rounded-full border border-white/60 bg-white/20 px-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:px-6">
                  <p className="font-cinzel text-[9px] uppercase tracking-[0.35em] text-amber-800 sm:text-[11px]">
                    Birthday Invitation
                  </p>
                </div>
              </div>
              
              {/* Cute Baby Photo with Creative Fairytale Frame */}
              <div className="absolute top-[12%] sm:top-[16%] left-1/2 -translate-x-1/2 w-[55%] sm:w-[45%] max-w-[260px] aspect-[4/5] z-20">
                {/* Decorative elements behind photo */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-pink-300 via-purple-300 to-amber-200 rounded-t-full rounded-b-[3rem] opacity-60 blur-lg animate-pulse-glow"></div>
                <div className="absolute -top-5 -right-5 text-4xl animate-float-delayed z-30 drop-shadow-md">👑</div>
                <div className="absolute -bottom-3 -left-5 text-3xl animate-float-slow z-30 drop-shadow-md">🦋</div>
                <div className="absolute top-1/2 -right-7 text-2xl animate-float-slow z-30 drop-shadow-md opacity-90">🌸</div>
                
                {/* The Photo itself */}
                <div className="w-full h-full p-2 bg-white/50 backdrop-blur-md rounded-t-full rounded-b-[3rem] border border-white/80 shadow-[0_15px_35px_rgba(236,72,153,0.2)] overflow-hidden relative z-10 group">
                  <div className="w-full h-full rounded-t-full rounded-b-[2.5rem] overflow-hidden relative border-2 border-pink-200/60">
                    <img 
                      src="/1.jpeg" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      alt="Baby Ayeli Yenara" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent pointer-events-none mix-blend-overlay"></div>
                  </div>
                </div>
              </div>
              
              {/* Main Invitation Text (positioned perfectly below the photo) */}
              <div className="absolute top-[43%] sm:top-[50%] left-1/2 -translate-x-1/2 w-[85%] sm:w-[75%] max-w-[420px] text-center z-10 px-5 sm:px-8 py-5 sm:py-8 rounded-[2.5rem] bg-white/50 backdrop-blur-md border border-white/80 shadow-[0_10px_40px_rgba(236,72,153,0.15)] flex flex-col items-center">
                
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 via-white/10 to-purple-200/20 rounded-[2.5rem]" />

                <div className="relative z-10 w-full space-y-4">
                  <p className="font-serif-royal italic text-olive-dark font-bold text-sm sm:text-base tracking-widest uppercase">
                    Please join us for
                  </p>
                  
                  <div className="space-y-1 py-1">
                    <h1 className="font-cinzel text-3xl sm:text-4xl font-black text-pink-deep drop-shadow-sm leading-tight">
                      BABY AYELI YENARA'S
                    </h1>
                    <span className="block font-serif-royal text-xl sm:text-2xl mt-2 text-olive-dark/90 italic font-bold">
                      First Birthday Celebration
                    </span>
                  </div>
                  
                  <div className="w-full flex items-center justify-center gap-3 opacity-70 py-1">
                    <div className="h-px w-12 bg-olive-light"></div>
                    <Flower2 className="w-4 h-4 text-pink-dusty" />
                    <div className="h-px w-12 bg-olive-light"></div>
                  </div>
                  
                  <div className="bg-white/50 rounded-2xl p-4 border border-white/50 shadow-sm w-full backdrop-blur-sm">
                    <div className="text-xs sm:text-sm font-bold tracking-widest uppercase font-sans leading-relaxed">
                      <p className="text-olive-dark">Saturday, 10 Oct 2026</p>
                      <p className="text-olive-dark mt-1">6.30 pm onwards</p>
                    </div>
                  </div>
                  
                  <div className="text-[10px] sm:text-xs text-olive-dark italic mt-2 font-medium space-y-1">
                    <p className="font-bold text-olive-dark text-[11px] sm:text-[13px] uppercase tracking-wider not-italic">
                      Madu River Reach Hotel
                    </p>
                    <p className="text-olive-dark font-semibold">Royal Ballroom</p>
                  </div>
                </div>
              </div>
              
              {/* Scroll Down Indicator */}
              <div 
                className="absolute bottom-[4%] sm:bottom-[6%] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 animate-bounce cursor-pointer opacity-90 hover:opacity-100 transition-opacity"
                onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
              >
                <span className="font-serif-royal text-white text-[10px] sm:text-[11px] tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-bold">
                  Scroll Down
                </span>
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-pink-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
              </div>
            </div>



            {/* Collage Elements Grid */}
            <div className="w-full relative min-h-[800px] flex flex-col items-center gap-16 md:gap-24 mt-8">
              
              <div className="w-full px-4 relative z-20 flex justify-center">
                 <CountdownTimer targetDate="2026-10-10T18:30:00+05:30" />
              </div>

              {/* PREMIUM RSVP SECTION */}
              <div className="relative w-full max-w-[550px] px-4 cursor-pointer group my-8" onClick={() => setIsRsvpOpen(true)}>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-pale via-ivory to-pink-pale rounded-[2rem] blur-xl transition-all duration-700 group-hover:blur-2xl group-hover:opacity-100 opacity-60"></div>
                <div className="relative w-full bg-white/70 backdrop-blur-xl border border-white/90 rounded-[2rem] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-500 group-hover:bg-white/90 group-hover:-translate-y-1">
                  
                  {/* Decorative internal elegant borders */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-olive-light/50 rounded-tl-2xl"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-olive-light/50 rounded-br-2xl"></div>
                  
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-dusty/40 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-olive-light/30 rounded-full blur-3xl"></div>

                  <span className="font-serif-royal italic text-olive-dark/80 text-xl sm:text-2xl mb-1 relative z-10 font-bold">
                    We would be delighted
                  </span>
                  <span className="font-cinzel font-black text-pink-dusty text-4xl sm:text-5xl tracking-[0.2em] uppercase mt-2 relative z-10 drop-shadow-sm">
                    RSVP
                  </span>
                  
                  <p className="mt-6 font-sans text-[10px] sm:text-xs text-olive-dark/70 font-bold tracking-[0.3em] uppercase flex items-center gap-2 relative z-10 transition-colors group-hover:text-olive-dark">
                    <Sparkles className="w-3.5 h-3.5 text-pink-dusty" />
                    Click here to respond
                    <Sparkles className="w-3.5 h-3.5 text-pink-dusty" />
                  </p>

                  <div className="mt-8 flex flex-col gap-2 relative z-10 text-[9px] sm:text-[10px] uppercase tracking-widest text-olive-dark/80 font-bold">
                    <p>Kasun De Silva (Father): <a href="tel:0719713292" onClick={(e) => e.stopPropagation()} className="text-olive-light hover:underline font-black">0719713292</a></p>
                    <p>Vinuri Yasora (Mother): <a href="tel:0714771575" onClick={(e) => e.stopPropagation()} className="text-olive-light hover:underline font-black">0714771575</a></p>
                  </div>

                  {userRsvp && (
                    <div className="mt-6 flex items-center gap-2 bg-emerald-50/80 text-emerald-600 px-5 py-2.5 rounded-full border border-emerald-200/50 shadow-sm relative z-10 backdrop-blur-md">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">Response Received</span>
                    </div>
                  )}
                </div>
              </div>

              {/* PARTY SCHEDULE */}
              <div className="relative w-full max-w-[550px] px-4">
                <PartySchedule />
              </div>

              {/* VIEW LOCATION Creative Section */}
              <div className="relative w-full max-w-lg my-12 flex flex-col items-center px-4">
                {/* Magical Map Pin Icon */}
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-olive-light rounded-full blur-xl opacity-40 animate-pulse-glow"></div>
                  <div className="w-16 h-16 rounded-full soft-fairytale-card flex items-center justify-center relative z-10 animate-float-slow shadow-xl border-2 border-olive-light">
                    <MapPin className="w-8 h-8 text-olive-dark drop-shadow-sm" />
                    <Sparkles className="absolute -top-1 -right-2 w-5 h-5 text-pink-dusty animate-spin" style={{ animationDuration: '4s' }} />
                  </div>
                </div>
                
                {/* Ornate Text Header */}
                <div className="flex items-center justify-center gap-3 sm:gap-6 w-full">
                  <div className="h-[2px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-olive-light rounded-full"></div>
                  <h3 className="font-cinzel text-xl sm:text-2xl tracking-[0.2em] font-black text-center text-pink-dusty drop-shadow-sm filter">
                    LOCATION
                  </h3>
                  <div className="h-[2px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-olive-light rounded-full"></div>
                </div>
                <p className="font-serif-royal italic text-olive-dark/70 mt-1 mb-6 text-sm sm:text-base font-bold text-center">Where the magic happens</p>

                {/* Map Section */}
                <div className="w-full bg-white/70 backdrop-blur-md p-2 sm:p-4 rounded-3xl shadow-2xl border border-white/80 relative z-10 transform hover:scale-[1.02] transition-transform duration-500">
                  <div className="absolute -top-5 -left-5 text-3xl animate-float-delayed z-20">🦋</div>
                  <div className="absolute -bottom-4 -right-4 text-3xl animate-float-slow z-20">🌸</div>
                  <LocationMapSection 
                    venueName="Madu River Reach Hotel" 
                    address="Royal Ballroom" 
                    mapsUrl="https://maps.app.goo.gl/cT7iun8JNQXSD39T9" 
                  />
                </div>
              </div>



            </div>

            {/* Footer */}
            <footer className="mt-20 text-center text-xs text-olive-dark font-serif-royal pb-10 flex flex-col items-center gap-1">
              <p className="flex items-center justify-center gap-1">
                <span>Crafted with magic for</span>
                <Heart className="w-3.5 h-3.5 text-pink-dusty fill-pink-dusty" />
                <span>Baby Ayeli Yenara</span>
              </p>
              <p className="text-olive-dark text-[10px] sm:text-xs mt-2 font-sans tracking-wider">
                Want a beautiful birthday invitation like this? Create yours with{' '}
                <a 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-olive-dark hover:text-olive-light underline transition-colors font-semibold" 
                  href="https://wa.me/94707819074"
                >
                  invitemint
                </a>
              </p>
            </footer>

          </div>
        )}

      </div>

      {/* Floating Audio Ambient Music Toggle */}
      <AudioPlayer />

      {/* Interactive RSVP Modal */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        onRsvpSuccess={handleRsvpSuccess}
      />
    </div>
  );
}
