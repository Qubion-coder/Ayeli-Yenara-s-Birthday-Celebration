import React from 'react';
import { MapPin, Navigation, Calendar as CalendarIcon, ExternalLink, Download } from 'lucide-react';

interface LocationMapSectionProps {
  venueName?: string;
  address?: string;
  mapsUrl?: string;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({
  venueName = "Madu River Reach Hotel",
  address = "Royal Ballroom",
  mapsUrl = "https://maps.app.goo.gl/cT7iun8JNQXSD39T9"
}) => {
  const encodedAddress = encodeURIComponent(`${venueName}, Balapitiya, Sri Lanka`);
  const directMapsUrl = mapsUrl || "https://maps.app.goo.gl/cT7iun8JNQXSD39T9";

  // Calendar event generator
  const createGoogleCalendarLink = () => {
    // 10th October 2026 6:30 PM Sri Lanka Time (UTC+5:30) -> 13:00 UTC to 17:00 UTC
    const title = encodeURIComponent("Baby Ayeli Yenara's Birthday Celebration");
    const details = encodeURIComponent("Join us for a magical butterfly celebration for Baby Ayeli Yenara at Madu River Reach Hotel, Royal Ballroom!");
    const location = encodeURIComponent(`${venueName}, ${address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261010T130000Z/20261010T170000Z&details=${details}&location=${location}`;
  };

  const downloadIcsFile = () => {
    const csContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'SUMMARY:Baby Ayeli Yenara Birthday Celebration',
      'DESCRIPTION:Butterfly birthday celebration for Baby Ayeli Yenara at Madu River Reach Hotel, Royal Ballroom.',
      'LOCATION:' + venueName + ', ' + address,
      'DTSTART:20261010T130000Z',
      'DTEND:20261010T170000Z',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([csContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Baby_Ayeli_Yenara_Birthday.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full my-8 p-6 sm:p-8 rounded-3xl bg-white/90 text-olive-dark border border-olive-light/50 backdrop-blur-md shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ivory text-olive-dark text-xs font-bold font-cinzel mb-2 border border-olive-light/40">
            <MapPin className="w-3.5 h-3.5 text-olive-light" /> Venue & Location
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-pink-dusty">
            {venueName}
          </h2>
          <p className="text-xs sm:text-sm text-olive-dark/90 mt-1 flex items-center gap-1">
            <span>📍 {address}</span>
          </p>
        </div>

        <a
          href={directMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-olive-dark to-olive-light hover:opacity-90 text-white font-bold text-xs sm:text-sm shadow-lg shadow-olive-light/30 transition active:scale-95"
        >
          <Navigation className="w-4 h-4" />
          <span>Get Directions</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>
      </div>

      {/* Embedded Map Visual Frame */}
      <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden border border-olive-light/40 shadow-inner bg-ivory">
        <iframe
          title="Madu River Reach Hotel Location Map"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'contrast(1.05) opacity(0.9)' }}
          loading="lazy"
          allowFullScreen
          src={`https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        />
      </div>

      {/* Add to Calendar Actions */}
      <div className="mt-6 pt-4 border-t border-olive-light/30 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-serif-royal text-olive-dark/80 italic">
          ✨ Saturday, 10th October 2026 • 6.30 pm
        </span>

        <div className="flex items-center gap-2">
          <a
            href={createGoogleCalendarLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-ivory hover:bg-pink-pale text-olive-dark text-xs font-semibold border border-olive-light/30 transition"
          >
            <CalendarIcon className="w-3.5 h-3.5 text-pink-dusty" />
            <span>Google Calendar</span>
          </a>

          <button
            onClick={downloadIcsFile}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-ivory hover:bg-pink-pale text-olive-dark text-xs font-semibold border border-olive-light/30 transition"
          >
            <Download className="w-3.5 h-3.5 text-olive-light" />
            <span>iCal / Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
};
