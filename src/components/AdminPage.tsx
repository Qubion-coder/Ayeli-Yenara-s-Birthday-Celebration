import React, { useState } from 'react';
import { Copy, Link as LinkIcon } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');

  const prefixes = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'];

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    
    // Generate the link using the current origin
    const domain = window.location.origin;
    // You could also hardcode a domain if needed, but origin is flexible
    const formattedName = guestName.trim().toLowerCase().replace(/\s+/g, '-');
    const link = `${domain}/${encodeURIComponent(formattedName)}?prefix=${encodeURIComponent(prefix)}`;
    setGeneratedLink(link);

    const getFormattedName = (pref: string, name: string) => {
      if (pref === 'Family') return `${name} and Family`;
      if (pref === 'Dear') return name;
      return `${pref} ${name}`;
    };

    const formattedGuestName = getFormattedName(prefix, guestName.trim());

    // Generate the full message
    const message = `Dear ${formattedGuestName} ❤️

We cordially invite you to join us as we celebrate the
First Birthday Celebration of our beloved little one,
Ayeli Yenara. 🎀✨

Your presence would make this special day even more
beautiful and memorable for us.

Please view the birthday invitation and all the celebration
details through the link below 🌸

${link}

We would be delighted to celebrate this precious milestone
with you and create beautiful memories together. ❤️

With love,
Ayeli Yenara's Family`;

    setGeneratedMessage(message);
  };

  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      alert('Link copied to clipboard!');
    }
  };

  const handleCopyMessage = () => {
    if (generatedMessage) {
      navigator.clipboard.writeText(generatedMessage);
      alert('Full message copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-olive-dark font-sans p-6 sm:p-12 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-olive-light/50">
        <div className="text-center mb-8">
          <h1 className="font-cinzel text-3xl font-black text-pink-dusty">Admin Dashboard</h1>
          <p className="font-serif-royal italic text-olive-dark/80 mt-2">Generate Personalized Invitation Links</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-xs font-bold text-olive-dark mb-2 uppercase tracking-widest">
                Select Prefix
              </label>
              <select
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-ivory border border-olive-light/30 focus:outline-none focus:ring-2 focus:ring-pink-dusty"
              >
                {prefixes.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-olive-dark mb-2 uppercase tracking-widest">
                Guest Name
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Sanjaya"
                className="w-full px-4 py-3 rounded-xl bg-ivory border border-olive-light/30 focus:outline-none focus:ring-2 focus:ring-pink-dusty"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!guestName.trim()}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-olive-dark to-olive-light text-white font-bold tracking-widest uppercase shadow-lg hover:opacity-90 disabled:opacity-50 transition"
          >
            Generate Link
          </button>

          {generatedLink && (
            <div className="mt-8 space-y-6 animate-fadeIn">
              <div className="p-4 rounded-xl bg-pink-pale border border-pink-200">
                <p className="text-xs font-bold uppercase tracking-widest text-pink-900 mb-2">Generated Link</p>
                <div className="flex items-center justify-between gap-4 bg-white p-3 rounded-lg border border-pink-100">
                  <span className="text-sm font-mono text-olive-dark truncate">{generatedLink}</span>
                  <button onClick={handleCopyLink} className="whitespace-nowrap px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 font-bold text-xs rounded-md transition flex items-center gap-2">
                    <LinkIcon className="w-3 h-3" />
                    Copy Link Only
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-ivory border border-olive-light/20">
                <p className="text-xs font-bold uppercase tracking-widest text-olive-dark mb-2">Generated Message</p>
                <div className="relative bg-white p-4 rounded-lg border border-olive-light/10 text-sm font-sans text-olive-dark whitespace-pre-wrap leading-relaxed">
                  {generatedMessage}
                </div>
                <button
                  onClick={handleCopyMessage}
                  className="mt-4 w-full py-3 rounded-xl bg-pink-dusty hover:bg-pink-600 text-white font-bold tracking-widest uppercase shadow-md transition flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy Full Message
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
