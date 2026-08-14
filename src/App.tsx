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
              
              {/* Photo placed perfectly inside the golden oval frame in the background image */}
              <div className="absolute top-[16.5%] left-[27%] w-[46%] aspect-[3.2/4] rounded-full overflow-hidden mix-blend-multiply border-2 border-transparent">
                <img src="/1.jpeg" className="w-full h-full object-cover scale-110" alt="Sierra and Roy" />
              </div>
              
              {/* Main Invitation Text (positioned below the photo) */}
              <div className="absolute top-[48%] sm:top-[52%] left-0 w-full text-center space-y-2 sm:space-y-3 z-10 px-4">
                <p className="font-serif-royal italic text-purple-900 font-bold text-sm sm:text-base">Please join us for</p>
                <h1 className="font-cinzel text-3xl sm:text-4xl font-black text-pink-600 drop-shadow-md leading-tight">
                  SIERRA'S <span className="block text-xl sm:text-2xl mt-1 text-purple-700">FAIRY 1ST BIRTHDAY</span>
                </h1>
                <p className="font-serif-royal italic text-purple-900 font-bold">&</p>
                <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-amber-600 drop-shadow-md leading-tight">
                  ROY'S <span className="block text-xl sm:text-2xl mt-1 text-purple-700">ROYAL 36TH</span>
                </h1>
                
                <div className="w-full max-w-[200px] mx-auto h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent my-3"></div>
                
                <div className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide uppercase font-sans leading-relaxed">
                  <p>Sunday, 13 Sept 2026</p>
                  <p>11:30 AM – 2:30 PM</p>
                </div>
                
                <div className="text-[10px] sm:text-xs text-slate-800 italic mt-1">
                  <p className="font-bold">Spice in Valley</p>
                  <p>55 Benara Rd, Caversham</p>
                </div>
              </div>
            </div>

            {/* Collage Elements Grid */}
            <div className="w-full relative min-h-[800px] flex flex-col items-center gap-16 md:gap-24 mt-8">
              
              <div className="w-full px-4 relative z-10 flex justify-center">
                 <CountdownTimer targetDate="2026-09-13T11:30:00" />
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

              {/* PARTY SCHEDULE Scroll */}
              <div className="relative w-[115%] sm:w-full max-w-[500px] flex items-center justify-center mt-12 mb-4 -ml-4 sm:ml-0">
                <img 
                  src="/ChatGPT_Image_Aug_15__2026__03_22_39_AM-removebg-preview.png" 
                  className="w-full h-auto object-contain drop-shadow-2xl scale-110 sm:scale-100" 
                  alt="Party Schedule" 
                />
              </div>

              {/* VIEW LOCATION Ribbon */}
              <div className="relative w-full max-w-md my-8">
                <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white py-4 px-8 shadow-md transform -rotate-2 relative z-10">
                  <h3 className="font-cinzel text-xl tracking-widest font-bold text-center">VIEW LOCATION</h3>
                  <div className="absolute top-0 left-0 w-4 h-full bg-pink-600 -translate-x-full clip-path-ribbon-left"></div>
                  <div className="absolute top-0 right-0 w-4 h-full bg-pink-600 translate-x-full clip-path-ribbon-right"></div>
                </div>
                <div className="mt-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <LocationMapSection venueName="Spice in Valley" address="55 Benara Rd, Caversham WA" />
                </div>
              </div>



            </div>

            {/* Footer */}
            <footer className="mt-20 text-center text-xs text-slate-400 font-serif-royal pb-10">
              <p className="flex items-center justify-center gap-1">
                <span>Crafted with magic for</span>
                <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                <span>Sierra & Roy</span>
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
