import React from 'react';
import { Clock } from 'lucide-react';
import { ScheduleItem } from '../types';

export const PartySchedule: React.FC = () => {
  const items: ScheduleItem[] = [
    {
      time: "6.30 pm",
      title: "Party Begins",
      description: "Step into our fairytale realm! Welcome drinks, warm greetings & photo sessions.",
      icon: "✨",
    },
    {
      time: "7.00 pm",
      title: "Birthday Cake & Celebration",
      description: "Gather around for Baby Ayeli Yenara's cake cutting ceremony and special musical wishes.",
      icon: "🎂",
    },
    {
      time: "8.30 pm",
      title: "Royal Banquet Dinner",
      description: "Enjoy a delightful dinner feast with music and wonderful company.",
      icon: "👑",
    },
    {
      time: "11.00 pm",
      title: "Thank You & Farewells",
      description: "Heartfelt gratitude and fairy blessings as we wrap up this magical celebration.",
      icon: "🌸",
    }
  ];

  return (
    <div className="w-full my-8 p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-olive-light shadow-xl text-olive-dark">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory text-olive-dark border border-olive-light/50 text-xs font-bold font-cinzel mb-2">
          <Clock className="w-3.5 h-3.5 text-olive-light" /> Event Timeline
        </div>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-pink-dusty">
          Party Schedule
        </h2>
        <p className="text-xs sm:text-sm text-olive-dark/80 font-serif-royal italic mt-1 font-semibold">
          6.30 pm onwards • Madu River Reach Hotel, Royal Ballroom
        </p>
      </div>

      <div className="relative border-l-2 border-olive-light ml-4 sm:ml-8 space-y-8 pr-2">
        {items.map((item, index) => (
          <div key={index} className="relative pl-6 sm:pl-8 group">
            {/* Timeline node icon */}
            <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-gradient-to-tr from-olive-light to-pink-dusty text-white border-2 border-white shadow-md flex items-center justify-center text-sm">
              {item.icon}
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-ivory to-pink-pale border border-olive-light/40 shadow-sm group-hover:shadow-md transition">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-olive-light text-white text-xs font-bold font-cinzel mb-1">
                {item.time}
              </span>
              <h3 className="font-cinzel font-bold text-olive-dark text-base sm:text-lg">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-olive-dark/80 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
