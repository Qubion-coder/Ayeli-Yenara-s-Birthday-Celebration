import React, { useState } from 'react';
import { Gift, Heart, Sparkles } from 'lucide-react';

export const RoyalRegistry: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'menaya' | 'wishingWell'>('menaya');

  const menayaItems = [
    { title: "Fairytale Picture Books & Soft Plushies", category: "Books & Toys", note: "Baby Ayeli Yenara loves colorful touch-and-feel books!" },
    { title: "Wooden Montessori Activity Toys", category: "Milestones", note: "Interactive and learning sensory toys" },
    { title: "Fairy Dress & Princess Hair Accessories", category: "Keepsakes", note: "Cute toddler princess outfits" }
  ];

  return (
    <div className="w-full my-8 p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-pink-300 shadow-xl text-slate-800">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold font-cinzel mb-2">
          <Gift className="w-3.5 h-3.5 text-purple-600" /> Gifts & Blessing Jar
        </div>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-purple-950">
          Royal Gift Registry
        </h2>
        <p className="text-xs sm:text-sm text-pink-700 font-serif-royal italic mt-1">
          Your presence is our greatest present! For those who wish to honor Baby Ayeli Yenara:
        </p>
      </div>

      {/* Tabs */}
      <div className="flex rounded-2xl bg-pink-100/80 p-1.5 max-w-sm mx-auto mb-6">
        <button
          onClick={() => setActiveTab('menaya')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === 'menaya'
              ? 'bg-purple-900 text-amber-200 shadow-md'
              : 'text-purple-900 hover:bg-pink-200/60'
          }`}
        >
          🌸 Baby Ayeli Yenara's Wishlist
        </button>

        <button
          onClick={() => setActiveTab('wishingWell')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
            activeTab === 'wishingWell'
              ? 'bg-purple-900 text-amber-200 shadow-md'
              : 'text-purple-900 hover:bg-pink-200/60'
          }`}
        >
          ✨ Wishing Well
        </button>
      </div>

      {/* Content based on Tab */}
      {activeTab === 'wishingWell' ? (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-200 border-2 border-amber-400 flex items-center justify-center text-amber-900 shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-cinzel text-lg font-bold text-purple-950">
            Fairytale Blessing Jar & Wishing Well
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 mt-2 max-w-lg mx-auto font-serif-royal leading-relaxed">
            If you wish to give a gift, a contribution towards Little Baby Ayeli Yenara's future in our Wishing Well on party day would be warmly appreciated!
          </p>
          <div className="mt-4 inline-block px-4 py-2 rounded-xl bg-purple-900 text-amber-200 text-xs font-bold">
            🎁 A Wishing Well box will be placed at Madu River Reach Hotel, Royal Ballroom
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {menayaItems.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gradient-to-b from-pink-50/80 to-purple-50/80 border border-pink-200 flex flex-col justify-between">
              <div>
                <span className="inline-block px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-bold uppercase mb-2">
                  {item.category}
                </span>
                <h4 className="font-cinzel font-bold text-purple-950 text-sm">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1 font-serif-royal">
                  {item.note}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-pink-200/60 flex items-center justify-between text-[11px] text-pink-700 font-semibold">
                <span>Gift Suggestion</span>
                <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-300" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
