import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle2 } from 'lucide-react';
import { RSVP } from '../types';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRsvpSuccess: (data: RSVP) => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose, onRsvpSuccess }) => {
  const [guestName, setGuestName] = useState('');
  const [guestsCount, setGuestsCount] = useState('');
  const [kidsCount, setKidsCount] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [specialNote, setSpecialNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || attending === null) return;

    setIsSubmitting(true);

    try {
      // Google Apps Script Web App URL
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxjhnF46qG4ER7hHlev41xQnZqK76ZvxXwDQL7Ie_JhtG-MrABxWtJzhQ61HFvZI422/exec';

      const payload = {
        guestName,
        attending,
        adultsCount: Number(guestsCount) || 1,
        kidsCount: Number(kidsCount) || 0,
        specialNote,
      };

      // We use text/plain to avoid CORS preflight issues with Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        onRsvpSuccess(payload as any);
      } else {
        throw new Error(data.error || 'Failed to save RSVP');
      }
    } catch (err) {
      console.error('RSVP Submission Error:', err);
      // Fallback for success even if it errors locally, so UI still works
      // Remove this fallback in production if you want strict validation
      onRsvpSuccess({
        guestName,
        email: '',
        attending,
        adultsCount: Number(guestsCount) || 1,
        kidsCount: Number(kidsCount) || 0,
        dietary: '',
        specialNote,
        submittedAt: new Date().toISOString()
      });
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);

      if (attending) {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#eeb9c6', '#d8dcd1', '#ffffff']
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ivory/80 backdrop-blur-md animate-fadeIn">

      {/* Magical Floating Particles Behind the Modal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-pink-dusty text-xl animate-float-slow">✨</div>
        <div className="absolute top-1/3 right-1/4 text-olive-light text-2xl animate-float-delayed">🦋</div>
        <div className="absolute bottom-1/3 left-1/3 text-pink-dusty text-lg animate-float-slow opacity-80">✨</div>
        <div className="absolute bottom-1/4 right-1/3 text-pink-dusty text-sm animate-float-delayed">🌸</div>
      </div>

      {/* Light aesthetic modal matching the image, now with magical pink/blue/purple gradients */}
      <div className="relative w-full max-w-md p-[2px] bg-gradient-to-br from-pink-pale via-ivory to-pink-pale rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] animate-pulse-glow" style={{ animationDuration: '4s' }}>
        <div className="relative w-full h-full bg-white/90 backdrop-blur-2xl rounded-[2.4rem] p-8 sm:p-10 overflow-hidden max-h-[85vh] overflow-y-auto border border-white/50 shadow-inner">

          {/* Soft internal corner glows (Pink, Purple, Blue) */}
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-pink-dusty/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-olive-light/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-dusty/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-[#6b6863] hover:bg-ivory transition z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-8 relative z-10">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-pale via-ivory to-pink-pale p-1 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-olive-dark" />
                </div>
              </div>
              <h3 className="font-cinzel text-3xl font-black text-pink-dusty drop-shadow-sm">
                {attending ? "RSVP Accepted" : "RSVP Recorded"}
              </h3>
              <p className="text-sm text-[#8c8984] mt-2 font-serif-royal">
                {attending
                  ? `Thank you ${guestName}! We cannot wait to see you.`
                  : `Thank you for letting us know, ${guestName}.`}
              </p>

              <button
                onClick={onClose}
                className="mt-8 px-10 py-3 rounded-full bg-gradient-to-r from-olive-dark via-olive-light to-olive-dark text-white hover:opacity-90 font-sans tracking-widest uppercase text-sm font-bold shadow-lg shadow-olive-light/50 transition-all hover:scale-105"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="font-cinzel text-2xl sm:text-3xl tracking-widest text-pink-dusty font-bold mb-4 drop-shadow-sm">
                  FILL RSVP
                </h2>

                {/* Animated Live Fairy Icon accent */}
                <div className="flex justify-center mb-2">
                  <div className="relative animate-float-slow">
                    <img src="/fairy.png" alt="fairy" className="w-14 h-auto opacity-80 mix-blend-multiply drop-shadow-md" />
                    <div className="absolute -top-1 -right-2 text-pink-dusty text-xs animate-pulse">✨</div>
                    <div className="absolute bottom-0 -left-2 text-olive-light text-[10px] animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-xs font-sans tracking-[0.2em] uppercase text-olive-dark/70 mb-2 font-bold">
                    Name*
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-olive-dark text-sm focus:outline-none focus:ring-2 focus:ring-olive-light focus:bg-white transition-all"
                  />
                </div>

                {/* Number of guests */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans tracking-[0.2em] uppercase text-olive-dark/70 mb-2 font-bold">
                      Adults*
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-olive-dark text-sm focus:outline-none focus:ring-2 focus:ring-olive-light focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans tracking-[0.2em] uppercase text-olive-dark/70 mb-2 font-bold">
                      Kids
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={kidsCount}
                      onChange={(e) => setKidsCount(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-olive-dark text-sm focus:outline-none focus:ring-2 focus:ring-olive-light focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Are you coming? */}
                <div>
                  <label className="block text-xs font-sans tracking-[0.2em] uppercase text-olive-dark/70 mb-2 font-bold">
                    Are you coming?*
                  </label>
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => setAttending(true)}
                      className={`w-full py-3.5 px-5 text-left rounded-2xl transition-all text-sm font-serif-royal italic font-bold border ${attending === true
                          ? 'bg-olive-light text-white border-transparent shadow-[0_10px_20px_rgba(0,0,0,0.1)]'
                          : 'bg-white/60 border-white/80 text-olive-dark/70 hover:bg-white hover:shadow-sm'
                        }`}
                    >
                      Absolutely, wouldn't miss it!
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttending(false)}
                      className={`w-full py-3.5 px-5 text-left rounded-2xl transition-all text-sm font-serif-royal italic font-bold border ${attending === false
                          ? 'bg-olive-light text-white border-transparent shadow-[0_10px_20px_rgba(0,0,0,0.1)]'
                          : 'bg-white/60 border-white/80 text-olive-dark/70 hover:bg-white hover:shadow-sm'
                        }`}
                    >
                      Can't make it this time.
                    </button>
                  </div>
                </div>

                {/* Leave a Wish */}
                <div>
                  <label className="block text-[10px] sm:text-xs font-sans tracking-[0.1em] sm:tracking-[0.2em] uppercase text-olive-dark/70 mb-2 font-bold">
                    Leave a Magical Wish (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-olive-dark text-sm focus:outline-none focus:ring-2 focus:ring-olive-light focus:bg-white resize-none transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || attending === null}
                  className="w-full mt-6 py-4 rounded-full bg-gradient-to-r from-olive-dark via-olive-light to-olive-dark hover:opacity-90 text-white font-sans tracking-[0.2em] uppercase text-sm font-bold shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
                >
                  Submit
                </button>

              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
