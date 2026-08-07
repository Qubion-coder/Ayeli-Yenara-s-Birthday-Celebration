import React from 'react';
import { MapPin, Navigation, Calendar as CalendarIcon, ExternalLink, Download } from 'lucide-react';

interface LocationMapSectionProps {
  venueName: string;
  address: string;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({
  venueName = "Spice in Valley",
  address = "55 Benara Rd, Caversham WA 6055"
}) => {
  const encodedAddress = encodeURIComponent(`${venueName}, ${address}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  // Calendar event generator
  const createGoogleCalendarLink = () => {
    // 20260913T033000Z to 20260913T063000Z (UTC for 11:30 AM to 2:30 PM AWST UTC+8)
    const title = encodeURIComponent("Sierra's 1st & Roy's 36th Fairytale Birthday");
    const details = encodeURIComponent("Join us for a royal fairytale celebration at Spice in Valley!");
    const location = encodeURIComponent(`${venueName}, ${address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260913T033000Z/20260913T063000Z&details=${details}&location=${location}`;
  };

  const downloadIcsFile = () => {
    const csContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'SUMMARY:Sierra 1st & Roy 36th Birthday Celebration',
      'DESCRIPTION:Fairytale and King theme birthday celebration at Spice in Valley.',
      'LOCATION:' + address,
      'DTSTART:20260913T033000Z',
      'DTEND:20260913T063000Z',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([csContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Sierra_and_Roy_Birthday.ics');
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
          href={mapsUrl}
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
          title="Spice in Valley Location Map"
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
          ✨ Sunday, 13th September 2026 • 11:30 AM – 2:30 PM
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
