import React, { useState, useEffect } from 'react';
import { Wand2, MessageSquareHeart, Sparkles, Send, Crown, Heart } from 'lucide-react';
import { Wish } from '../types';

export const GuestbookWishes: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('Family Friend');
  const [message, setMessage] = useState('');
  const [avatarIcon, setAvatarIcon] = useState('✨');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const res = await fetch('/api/wishes');
      const data = await res.json();
      if (data.success && data.wishes) {
        setWishes(data.wishes);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerateAiWish = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-wish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: author || 'Dear Guest',
          relation: relation,
          tone: 'magical fairytale'
        })
      });
      const data = await res.json();
      if (data.wish) {
        setMessage(data.wish);
      }
    } catch (e) {
      console.error(e);
      setMessage("Wishing little Princess Sierra a enchanting 1st birthday filled with fairy dust, and King Roy a majestic 36th year!");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, message, avatarIcon })
      });
      const data = await res.json();
      if (data.success && data.wish) {
        setWishes([data.wish, ...wishes]);
        setMessage('');
      }
    } catch (e) {
      console.error(e);
      const newWish: Wish = {
        id: `wish-${Date.now()}`,
        author,
        message,
        avatarIcon,
        createdAt: new Date().toISOString()
      };
      setWishes([newWish, ...wishes]);
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full my-8 p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-pink-300 shadow-xl text-slate-800">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-900 text-xs font-bold font-cinzel mb-2">
          <MessageSquareHeart className="w-3.5 h-3.5 text-pink-600" /> Royal Guestbook
        </div>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-purple-950">
          Fairytale Birthday Wishes
        </h2>
        <p className="text-xs sm:text-sm text-pink-700 font-serif-royal italic mt-1">
          Leave a magical blessing for Sierra's 1st Birthday & King Roy's 36th Birthday!
        </p>
      </div>

      {/* Add Wish Form */}
      <form onSubmit={handleSubmitWish} className="mb-8 p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 border border-pink-200 shadow-inner">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs font-bold text-purple-900 mb-1">
              Your Name / Title *
            </label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Uncle David"
              className="w-full px-3 py-2 rounded-xl bg-white border border-pink-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-purple-900 mb-1">
              Relation & Badge Icon
            </label>
            <div className="flex gap-2">
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-pink-300 text-sm text-slate-800 focus:outline-none"
              >
                <option value="Family Member">Family Member</option>
                <option value="Close Friend">Close Friend</option>
                <option value="Godparent">Godparent</option>
                <option value="Royal Guest">Royal Guest</option>
              </select>

              <select
                value={avatarIcon}
                onChange={(e) => setAvatarIcon(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white border border-pink-300 text-sm focus:outline-none"
              >
                <option value="✨">✨ Magic</option>
                <option value="👑">👑 Crown</option>
                <option value="🧚‍♀️">🧚‍♀️ Fairy</option>
                <option value="🍄">🍄 Mushroom</option>
                <option value="🦋">🦋 Butterfly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Text Area & AI Generator */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold text-purple-900">
              Your Fairytale Message *
            </label>
          </div>

          <textarea
            required
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your magical wishes for Sierra & Roy..."
            className="w-full p-3 rounded-xl bg-white border border-pink-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 rounded-xl bg-purple-900 hover:bg-purple-950 font-bold text-xs sm:text-sm text-amber-200 shadow-md transition flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>Post Birthday Wish to Guestbook</span>
        </button>
      </form>

      {/* Wishes Display List */}
      <div className="space-y-4">
        {wishes.map((wish) => (
          <div key={wish.id} className="p-4 rounded-2xl bg-gradient-to-r from-pink-50/80 to-purple-50/80 border border-pink-200/80 shadow-sm flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-200 border border-pink-300 flex items-center justify-center text-xl shrink-0">
              {wish.avatarIcon || '✨'}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-cinzel font-bold text-purple-950 text-sm">
                  {wish.author}
                </h4>
                <span className="text-[10px] text-pink-700 font-serif-royal">
                  {new Date(wish.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 font-serif-royal italic leading-relaxed">
                "{wish.message}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
