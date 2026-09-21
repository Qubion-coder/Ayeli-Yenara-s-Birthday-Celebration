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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden selection:bg-pink-400 selection:text-purple-950">
      
      {/* Background Animated Fairytale Magical Stars & Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl" />

        {/* Floating Fairy Dust Particles */}
        <div className="absolute top-12 left-1/4 text-pink-300 text-lg animate-float-slow opacity-60">✨</div>
        <div className="absolute top-1/2 left-8 text-amber-200 text-2xl animate-float-delayed opacity-70">🦋</div>
        <div className="absolute top-2/3 right-12 text-purple-300 text-xl animate-float-slow opacity-60">🌸</div>
        <div className="absolute bottom-32 right-1/4 text-sky-200 text-2xl animate-float-delayed opacity-70">👑</div>
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
                src="/hero.mp4" 
                autoPlay 
                loop 
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
              
              {/* Photo placed perfectly inside the golden oval frame in the background image */}
              <div className="absolute top-[16.5%] left-[27%] w-[46%] aspect-[3.2/4] rounded-full overflow-hidden mix-blend-multiply border-2 border-transparent flex items-center justify-center">
                <img src="/1.jpeg" className="w-[95%] h-[95%] object-contain" alt="Baby Ayeli Yenara" />
              </div>
              
              {/* Main Invitation Text (positioned below the photo) */}
              <div className="absolute top-[48%] sm:top-[52%] left-0 w-full text-center space-y-2 sm:space-y-3 z-10 px-4">
                <p className="font-serif-royal italic text-purple-900 font-bold text-sm sm:text-base">Please join us for</p>
                <h1 className="font-cinzel text-3xl sm:text-4xl font-black text-pink-600 drop-shadow-md leading-tight">
                  BABY AYELI YENARA'S
                  <span className="block text-xl sm:text-2xl mt-1 text-purple-700">BIRTHDAY CELEBRATION</span>
                </h1>
                
                <div className="w-full max-w-[200px] mx-auto h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent my-3"></div>
                
                <div className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide uppercase font-sans leading-relaxed">
                  <p>Saturday, 10 Oct 2026</p>
                  <p>06:30 PM onwards</p>
                </div>
                
                <div className="text-[10px] sm:text-xs text-slate-800 italic mt-1 font-semibold">
                  <p className="font-bold">Madu River Reach Hotel</p>
                  <p>Royal Ballroom</p>
                  <p className="mt-2 not-italic">Kasun De Silva (Father): 0719713292</p>
                  <p className="not-italic">Vinuri Yasora (Mother): 0714771575</p>
                </div>
              </div>
            </div>



            {/* Collage Elements Grid */}
            <div className="w-full relative min-h-[800px] flex flex-col items-center gap-16 md:gap-24 mt-8">
              
              <div className="w-full px-4 relative z-20 flex justify-center">
                 <CountdownTimer targetDate="2026-10-10T18:30:00+05:30" />
              </div>

              {/* PREMIUM RSVP SECTION */}
              <div className="relative w-full max-w-[550px] px-4 cursor-pointer group my-8" onClick={() => setIsRsvpOpen(true)}>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-300/40 via-purple-300/40 to-blue-300/40 rounded-[2rem] blur-xl transition-all duration-700 group-hover:blur-2xl group-hover:opacity-100 opacity-60"></div>
                <div className="relative w-full bg-white/70 backdrop-blur-xl border border-white/90 rounded-[2rem] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-500 group-hover:bg-white/90 group-hover:-translate-y-1">
                  
                  {/* Decorative internal elegant borders */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-pink-400/50 rounded-tl-2xl"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-pink-400/50 rounded-br-2xl"></div>
                  
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200/40 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200/40 rounded-full blur-3xl"></div>

                  <span className="font-serif-royal italic text-purple-900/70 text-xl sm:text-2xl mb-1 relative z-10 font-bold">
                    We would be delighted
                  </span>
                  <span className="font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 text-4xl sm:text-5xl tracking-[0.2em] uppercase mt-2 relative z-10 drop-shadow-sm">
                    RSVP
                  </span>
                  
                  <p className="mt-6 font-sans text-[10px] sm:text-xs text-slate-500 font-bold tracking-[0.3em] uppercase flex items-center gap-2 relative z-10 transition-colors group-hover:text-pink-600">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    Click here to respond
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  </p>

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
                  <div className="absolute inset-0 bg-pink-400 rounded-full blur-xl opacity-40 animate-pulse-glow"></div>
                  <div className="w-16 h-16 rounded-full soft-fairytale-card flex items-center justify-center relative z-10 animate-float-slow shadow-xl border-2 border-pink-200">
                    <MapPin className="w-8 h-8 text-pink-500 drop-shadow-sm" />
                    <Sparkles className="absolute -top-1 -right-2 w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                  </div>
                </div>
                
                {/* Ornate Text Header */}
                <div className="flex items-center justify-center gap-3 sm:gap-6 w-full">
                  <div className="h-[2px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-pink-400 rounded-full"></div>
                  <h3 className="font-cinzel text-xl sm:text-2xl tracking-[0.2em] font-black text-center text-purple-950 drop-shadow-sm filter">
                    LOCATION
                  </h3>
                  <div className="h-[2px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-pink-400 rounded-full"></div>
                </div>
                <p className="font-serif-royal italic text-purple-800/70 mt-1 mb-6 text-sm sm:text-base font-bold text-center">Where the magic happens</p>

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
            <footer className="mt-20 text-center text-xs text-slate-400 font-serif-royal pb-10 flex flex-col items-center gap-1">
              <p className="flex items-center justify-center gap-1">
                <span>Crafted with magic for</span>
                <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                <span>Baby Ayeli Yenara</span>
              </p>
              <p className="text-white text-[10px] sm:text-xs mt-2 font-sans tracking-wider">
                Want a beautiful birthday invitation like this? Create yours with{' '}
                <a 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-white hover:text-pink-200 underline transition-colors font-semibold" 
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
