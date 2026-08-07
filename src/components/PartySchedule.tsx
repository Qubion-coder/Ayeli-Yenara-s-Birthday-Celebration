import React from 'react';
import { Calendar, Clock, Utensils, Gift, Cake, Sparkles, HeartHandshake } from 'lucide-react';
import { ScheduleItem } from '../types';

export const PartySchedule: React.FC = () => {
  const items: ScheduleItem[] = [
    {
      time: "11:30 AM",
      title: "Event Starts",
      description: "Step into our fairytale realm! Welcome to the celebration for Princess Sierra & King Roy.",
      icon: "✨",
    },
    {
      time: "2:30 PM",
      title: "Event Concludes",
      description: "Royal Farewell and heartfelt thanks for celebrating with our family!",
      icon: "👑",
    }
  ];

  return (
    <div className="w-full my-8 p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-pink-300 shadow-xl text-slate-800">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold font-cinzel mb-2">
          <Clock className="w-3.5 h-3.5 text-purple-600" /> Event Timeline
        </div>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-purple-950">
          Party Schedule
        </h2>
        <p className="text-xs sm:text-sm text-pink-700 font-serif-royal italic mt-1">
          11:30 AM to 2:30 PM • Spice in Valley
        </p>
      </div>

      <div className="relative border-l-2 border-pink-300 ml-4 sm:ml-8 space-y-8 pr-2">
        {items.map((item, index) => (
          <div key={index} className="relative pl-6 sm:pl-8 group">
            {/* Timeline node icon */}
            <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 text-white border-2 border-white shadow-md flex items-center justify-center text-sm">
              {item.icon}
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50/60 border border-pink-200/80 shadow-sm group-hover:shadow-md transition">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-900 text-amber-200 text-xs font-bold font-cinzel mb-1">
                {item.time}
              </span>
              <h3 className="font-cinzel font-bold text-purple-950 text-base sm:text-lg">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
