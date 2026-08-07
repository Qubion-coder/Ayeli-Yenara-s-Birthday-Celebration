import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Send, CheckCircle2, User, Users, Sparkles, X, Utensils } from 'lucide-react';
import { RSVP } from '../types';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRsvpSuccess: (data: RSVP) => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose, onRsvpSuccess }) => {
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState(true);
  const [adultsCount, setAdultsCount] = useState(1);
  const [kidsCount, setKidsCount] = useState(0);
  const [dietary, setDietary] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName,
          email,
          attending,
          adultsCount,
          kidsCount,
          dietary,
          specialNote
        }),
      });

      const data = await response.json();
      if (data.success && data.rsvp) {
        onRsvpSuccess(data.rsvp);
      }
    } catch (err) {
      console.error(err);
      onRsvpSuccess({
        guestName,
        email,
        attending,
        adultsCount,
        kidsCount,
        dietary,
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
          colors: ['#ec4899', '#a855f7', '#38bdf8', '#fef08a']
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-purple-950 via-slate-900 to-slate-950 border-2 border-pink-500/40 p-6 sm:p-8 text-white shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Background glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-pink-300 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-amber-200">
              {attending ? "Royal Decree Accepted!" : "RSVP Recorded"}
            </h3>
            <p className="text-sm text-pink-200 mt-2 font-serif-royal">
              {attending
                ? `Thank you ${guestName}! We cannot wait to celebrate Sierra & Roy's fairytale birthday with you at Spice in Valley!`
                : `Thank you for letting us know, ${guestName}. You will be missed!`}
            </p>

            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 font-bold text-sm text-white shadow-lg transition"
            >
              Back to Invitation
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold font-cinzel mb-2 border border-pink-400/30">
                <Sparkles className="w-3.5 h-3.5" /> Royal RSVP
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-200">
                Kindly Respond
              </h2>
              <p className="text-xs text-pink-200/80 font-serif-royal italic mt-1">
                Please respond by 1st September 2026 for Spice in Valley dining arrangements
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Guest Name */}
              <div>
                <label className="block text-xs font-semibold text-pink-200 mb-1">
                  Your Full Name / Family Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-pink-400" />
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Auntie Sarah & Family"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-pink-400/30 text-white text-sm focus:outline-none focus:border-pink-400"
                  />
                </div>
              </div>

              {/* Attendance Choice */}
              <div>
                <label className="block text-xs font-semibold text-pink-200 mb-2">
                  Will You Attend The Fairytale Feast? *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      attending
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-pink-300 text-white shadow-lg shadow-pink-500/20'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Heart className="w-4 h-4 fill-current" /> Joyfully Accept
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      !attending
                        ? 'bg-purple-900/80 border-purple-400 text-pink-200 shadow-lg'
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    Regretfully Decline
                  </button>
                </div>
              </div>

              {attending && (
                <>
                  {/* Guest Counts */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-pink-200 mb-1">
                        Adults Count
                      </label>
                      <select
                        value={adultsCount}
                        onChange={(e) => setAdultsCount(Number(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-pink-400/30 text-white text-sm focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-pink-200 mb-1">
                        Children Count
                      </label>
                      <select
                        value={kidsCount}
                        onChange={(e) => setKidsCount(Number(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-pink-400/30 text-white text-sm focus:outline-none"
                      >
                        {[0, 1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Child' : 'Children'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Dietary Requirements */}
                  <div>
                    <label className="block text-xs font-semibold text-pink-200 mb-1">
                      Dietary Preferences / Allergies
                    </label>
                    <div className="relative">
                      <Utensils className="absolute left-3 top-3 w-4 h-4 text-pink-400" />
                      <input
                        type="text"
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                        placeholder="e.g. Vegetarian, Gluten-Free, Halal, Nut Allergy"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-pink-400/30 text-white text-sm focus:outline-none focus:border-pink-400"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Special Note */}
              <div>
                <label className="block text-xs font-semibold text-pink-200 mb-1">
                  Message for Sierra & Roy
                </label>
                <textarea
                  rows={2}
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="Send your warm wishes or song requests..."
                  className="w-full p-3 rounded-xl bg-slate-900/90 border border-pink-400/30 text-white text-sm focus:outline-none focus:border-pink-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 font-bold text-sm text-white shadow-xl shadow-pink-500/25 transition transform active:scale-98 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Sending Royal RSVP...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Royal RSVP</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
