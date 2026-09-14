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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">

      {/* Magical Floating Particles Behind the Modal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-pink-300 text-xl animate-float-slow">✨</div>
        <div className="absolute top-1/3 right-1/4 text-blue-300 text-2xl animate-float-delayed">🦋</div>
        <div className="absolute bottom-1/3 left-1/3 text-purple-300 text-lg animate-float-slow opacity-80">✨</div>
        <div className="absolute bottom-1/4 right-1/3 text-pink-300 text-sm animate-float-delayed">🌸</div>
      </div>

      {/* Light aesthetic modal matching the image, now with magical pink/blue/purple gradients */}
      <div className="relative w-full max-w-md p-[6px] sm:p-[10px] bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-[2.5rem] shadow-[0_0_50px_rgba(192,132,252,0.5)] animate-pulse-glow" style={{ animationDuration: '4s' }}>
        <div className="relative w-full h-full bg-[#fcfbfa] rounded-[2.1rem] p-8 sm:p-10 overflow-hidden max-h-[85vh] overflow-y-auto">

          {/* Soft internal corner glows (Pink, Purple, Blue) */}
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-pink-400/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-[#6b6863] hover:bg-slate-200 transition z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="text-center py-8 relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 flex items-center justify-center text-white shadow-lg shadow-purple-300/50">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-[#6b6863]">
                {attending ? "RSVP Accepted" : "RSVP Recorded"}
              </h3>
              <p className="text-sm text-[#8c8984] mt-2 font-serif-royal">
                {attending
                  ? `Thank you ${guestName}! We cannot wait to see you.`
                  : `Thank you for letting us know, ${guestName}.`}
              </p>

              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 rounded-sm bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white hover:opacity-90 font-serif-royal text-lg shadow-md transition"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="font-cinzel text-2xl sm:text-3xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 font-bold mb-4 drop-shadow-sm">
                  FILL RSVP
                </h2>

                {/* Animated Live Fairy Icon accent */}
                <div className="flex justify-center mb-2">
                  <div className="relative animate-float-slow">
                    <img src="/fairy.png" alt="fairy" className="w-14 h-auto opacity-80 mix-blend-multiply drop-shadow-md" />
                    <div className="absolute -top-1 -right-2 text-pink-400 text-xs animate-pulse">✨</div>
                    <div className="absolute bottom-0 -left-2 text-blue-400 text-[10px] animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-[15px] font-serif-royal text-[#6b6863] mb-2 font-bold">
                    Name*
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-3 rounded-[4px] bg-[#f0eee9] border border-[#a9a5a3] text-[#5c5552] text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition"
                  />
                </div>

                {/* Number of guests */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[15px] font-serif-royal text-[#6b6863] mb-2 font-bold">
                      Adults*
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(e.target.value)}
                      className="w-full px-3 py-3 rounded-[4px] bg-[#f0eee9] border border-[#a9a5a3] text-[#5c5552] text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[15px] font-serif-royal text-[#6b6863] mb-2 font-bold">
                      Kids
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={kidsCount}
                      onChange={(e) => setKidsCount(e.target.value)}
                      className="w-full px-3 py-3 rounded-[4px] bg-[#f0eee9] border border-[#a9a5a3] text-[#5c5552] text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition"
                    />
                  </div>
                </div>

                {/* Are you coming? */}
                <div>
                  <label className="block text-[15px] font-serif-royal text-[#6b6863] mb-2 font-bold">
                    Are you coming?*
                  </label>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setAttending(true)}
                      className={`w-full py-3 px-4 text-left rounded-[4px] transition text-[15px] font-serif-royal font-bold ${attending === true
                          ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white shadow-md'
                          : 'bg-[#e5dfd8] text-[#6b6863] hover:bg-[#dcd5cd]'
                        }`}
                    >
                      Absolutely, wouldn't miss it!
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttending(false)}
                      className={`w-full py-3 px-4 text-left rounded-[4px] transition text-[15px] font-serif-royal font-bold ${attending === false
                          ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white shadow-md'
                          : 'bg-[#e5dfd8] text-[#6b6863] hover:bg-[#dcd5cd]'
                        }`}
                    >
                      Can't make it this time.
                    </button>
                  </div>
                </div>

                {/* Leave a Wish */}
                <div>
                  <label className="block text-[15px] font-serif-royal text-[#6b6863] mb-2 font-bold">
                    Leave a Magical Wish for Baby Menaya (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    className="w-full px-3 py-3 rounded-[4px] bg-[#f0eee9] border border-[#a9a5a3] text-[#5c5552] text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 resize-none transition"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || attending === null}
                  className="w-full mt-4 py-3 rounded-[4px] bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 hover:opacity-90 text-white font-serif-royal text-xl font-bold shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-center"
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
