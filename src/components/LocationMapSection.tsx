import React from 'react';
import { MapPin, Navigation, Calendar as CalendarIcon, ExternalLink, Download } from 'lucide-react';

interface LocationMapSectionProps {
  venueName?: string;
  address?: string;
  mapsUrl?: string;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({
  venueName = "Samara Banquet Hall",
  address = "No. 71/2/A, Yakkala Road, Bandarawatta, Gampaha",
  mapsUrl = "https://maps.app.goo.gl/syzAERatEEDNx7bu5"
}) => {
  const encodedAddress = encodeURIComponent(`${venueName}, Gampaha, Sri Lanka`);
  const directMapsUrl = mapsUrl || "https://maps.app.goo.gl/syzAERatEEDNx7bu5";

  // Calendar event generator
  const createGoogleCalendarLink = () => {
    // 17th October 2026 6:00 PM Sri Lanka Time (UTC+5:30) -> 12:30 UTC to 16:30 UTC
    const title = encodeURIComponent("Baby Menaya's Birthday Celebration");
    const details = encodeURIComponent("Join us for a magical fairytale celebration for Baby Menaya at Samara Banquet Hall, Gampaha!");
    const location = encodeURIComponent(`${venueName}, ${address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261017T123000Z/20261017T163000Z&details=${details}&location=${location}`;
  };

  const downloadIcsFile = () => {
    const csContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'SUMMARY:Baby Menaya Birthday Celebration',
      'DESCRIPTION:Fairytale birthday celebration for Baby Menaya at Samara Banquet Hall, Gampaha.',
      'LOCATION:' + venueName + ', ' + address,
      'DTSTART:20261017T123000Z',
      'DTEND:20261017T163000Z',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([csContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Baby_Menaya_Birthday.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full my-8 p-6 sm:p-8 rounded-3xl bg-slate-900/90 text-white border border-pink-500/30 backdrop-blur-md shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold font-cinzel mb-2 border border-pink-400/30">
            <MapPin className="w-3.5 h-3.5 text-pink-400" /> Venue & Location
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-200">
            {venueName}
          </h2>
          <p className="text-xs sm:text-sm text-pink-200/90 mt-1 flex items-center gap-1">
            <span>📍 {address}</span>
          </p>
        </div>

        <a
          href={directMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-pink-500/20 transition active:scale-95"
        >
          <Navigation className="w-4 h-4" />
          <span>Get Directions</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>
      </div>

      {/* Embedded Map Visual Frame */}
      <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden border border-pink-400/30 shadow-inner bg-slate-800">
        <iframe
          title="Samara Banquet Hall Location Map"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'contrast(1.05) opacity(0.9)' }}
          loading="lazy"
          allowFullScreen
          src={`https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        />
      </div>

      {/* Add to Calendar Actions */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-serif-royal text-pink-200/80 italic">
          ✨ Saturday, 17th October 2026 • 6:00 PM
        </span>

        <div className="flex items-center gap-2">
          <a
            href={createGoogleCalendarLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-200 text-xs font-semibold border border-pink-400/20 transition"
          >
            <CalendarIcon className="w-3.5 h-3.5 text-amber-300" />
            <span>Google Calendar</span>
          </a>

          <button
            onClick={downloadIcsFile}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-pink-200 text-xs font-semibold border border-pink-400/20 transition"
          >
            <Download className="w-3.5 h-3.5 text-cyan-300" />
            <span>iCal / Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
};
