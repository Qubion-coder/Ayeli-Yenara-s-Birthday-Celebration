/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Crown, Calendar, Clock, MapPin, Heart, Flower2, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import { FairytaleEnvelope } from './components/FairytaleEnvelope';
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

      {/* Section 1: Interactive Fairytale Opening Envelope */}
      <FairytaleEnvelope
        isOpen={envelopeOpened}
        onOpen={() => setEnvelopeOpened(true)}
        onReset={() => setEnvelopeOpened(false)}
      />

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
              <div className="absolute top-[16.5%] left-[27%] w-[46%] aspect-[3.2/4] rounded-full overflow-hidden mix-blend-multiply border-2 border-transparent">
                <img src="/1.jpeg" className="w-full h-full object-cover scale-110" alt="Baby Menaya" />
              </div>
              
              {/* Main Invitation Text (positioned below the photo) */}
              <div className="absolute top-[48%] sm:top-[52%] left-0 w-full text-center space-y-2 sm:space-y-3 z-10 px-4">
                <p className="font-serif-royal italic text-purple-900 font-bold text-sm sm:text-base">Please join us for</p>
                <h1 className="font-cinzel text-3xl sm:text-4xl font-black text-pink-600 drop-shadow-md leading-tight">
                  BABY MENAYA'S
                  <span className="block text-xl sm:text-2xl mt-1 text-purple-700">BIRTHDAY CELEBRATION</span>
                </h1>
                
                <div className="w-full max-w-[200px] mx-auto h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent my-3"></div>
                
                <div className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide uppercase font-sans leading-relaxed">
                  <p>Friday, 17 Oct 2025</p>
                  <p>6:00 PM</p>
                </div>
                
                <div className="text-[10px] sm:text-xs text-slate-800 italic mt-1 font-semibold">
                  <p className="font-bold">Samara Banquet Hall</p>
                  <p>Gampaha</p>
                </div>
              </div>
            </div>

            <div className="w-full px-4 relative z-10">
              <div className="mx-auto max-w-[760px] rounded-[30px] border border-pink-200/40 bg-white/10 p-4 shadow-[0_20px_50px_rgba(80,22,59,0.18)] backdrop-blur-sm sm:p-6">
                <div className="mb-4 text-center">
                  <p className="font-cinzel text-[10px] uppercase tracking-[0.35em] text-rose-900/70 sm:text-xs">
                    Our little star
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 sm:gap-5">
                  {["/pre/ChatGPT Image Sep 11, 2026, 03_36_55 AM.png", "/pre/ChatGPT Image Sep 11, 2026, 03_40_12 AM.png", "/pre/ChatGPT Image Sep 11, 2026, 03_41_57 AM.png"].map((image, index) => (
                    <div
                      key={image}
                      className={`overflow-hidden rounded-[24px] border border-white/40 bg-white/5 shadow-lg ${index === 1 ? 'translate-y-3 sm:translate-y-5' : ''}`}
                    >
                      <img
                        src={image}
                        alt="Baby Menaya memory"
                        className="h-44 w-full object-cover object-center transition duration-500 hover:scale-105 sm:h-56"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Collage Elements Grid */}
            <div className="w-full relative min-h-[800px] flex flex-col items-center gap-16 md:gap-24 mt-8">
              
              <div className="w-full px-4 relative z-20 flex justify-center">
                 <CountdownTimer targetDate="2025-10-17T18:00:00+05:30" />
              </div>

              {/* KINDLY RSVP Circle */}
              <div className="relative group cursor-pointer" onClick={() => setIsRsvpOpen(true)}>
                <div className="w-48 h-48 rounded-full border-[6px] border-pink-300 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center shadow-lg transition-transform group-hover:scale-105 z-20 relative">
                  <span className="font-serif-royal italic text-purple-800 text-xl">Kindly</span>
                  <span className="font-cinzel font-black text-pink-500 text-4xl mt-1">RSVP</span>
                  {userRsvp && <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-2" />}
                </div>
                {/* Decorative bits around RSVP */}
                <div className="absolute -bottom-4 -left-8 text-3xl animate-bounce">🌸</div>
                <div className="absolute top-0 -right-6 text-2xl animate-float-slow">🦋</div>
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
                    venueName="Samara Banquet Hall" 
                    address="No. 71/2/A, Yakkala Road, Bandarawatta, Gampaha" 
                    mapsUrl="https://maps.app.goo.gl/syzAERatEEDNx7bu5" 
                  />
                </div>
              </div>



            </div>

            {/* Footer */}
            <footer className="mt-20 text-center text-xs text-slate-400 font-serif-royal pb-10">
              <p className="flex items-center justify-center gap-1">
                <span>Crafted with magic for</span>
                <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                <span>Baby Menaya</span>
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
