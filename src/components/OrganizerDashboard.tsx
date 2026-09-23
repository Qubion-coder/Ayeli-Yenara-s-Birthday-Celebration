import React, { useState, useEffect } from 'react';
import { Users, Download, ShieldCheck, Share2, Copy, Check, QrCode, Sparkles, RefreshCw } from 'lucide-react';
import { RSVP } from '../types';

export const OrganizerDashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchRsvps();
    }
  }, [isOpen]);

  const fetchRsvps = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/rsvps');
      const data = await res.json();
      if (data.rsvps) {
        setRsvps(data.rsvps);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const totalAttendingGuests = rsvps
    .filter(r => r.attending)
    .reduce((sum, r) => sum + (r.adultsCount || 1) + (r.kidsCount || 0), 0);

  const totalAdults = rsvps
    .filter(r => r.attending)
    .reduce((sum, r) => sum + (r.adultsCount || 1), 0);

  const totalKids = rsvps
    .filter(r => r.attending)
    .reduce((sum, r) => sum + (r.kidsCount || 0), 0);

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportToCsv = () => {
    const headers = ["Guest Name", "Attending", "Adults", "Kids", "Dietary", "Message", "Date"];
    const rows = rsvps.map(r => [
      `"${r.guestName}"`,
      r.attending ? "YES" : "NO",
      r.adultsCount,
      r.kidsCount,
      `"${r.dietary || ''}"`,
      `"${r.specialNote || ''}"`,
      r.submittedAt ? new Date(r.submittedAt).toLocaleDateString() : ''
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'Baby_Ayeli_Yenara_RSVPs.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full my-8 text-center">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ivory text-olive-dark border border-olive-light/50 text-xs font-bold font-cinzel hover:bg-pink-pale transition shadow-lg"
        >
          <ShieldCheck className="w-4 h-4 text-olive-light" />
          <span>{isOpen ? "Hide Host RSVP Dashboard" : "Host RSVP & Guest List"}</span>
        </button>

        <button
          onClick={copyShareLink}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-olive-light hover:bg-olive-light/90 text-white border border-transparent text-xs font-bold font-cinzel transition shadow-lg"
        >
          {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "Link Copied!" : "Copy Share Link"}</span>
        </button>

        <button
          onClick={() => setShowQr(!showQr)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-dusty hover:bg-pink-dusty/90 text-white border border-transparent text-xs font-bold font-cinzel transition shadow-lg"
        >
          <QrCode className="w-4 h-4 text-white" />
          <span>QR Code</span>
        </button>
      </div>

      {/* QR Code Modal Popup */}
      {showQr && (
        <div className="mt-4 p-6 rounded-2xl bg-ivory border-2 border-olive-light max-w-xs mx-auto text-olive-dark shadow-2xl">
          <h4 className="font-cinzel font-bold text-olive-dark text-sm mb-2">
            Scan to Open Invitation
          </h4>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(window.location.href)}`}
            alt="RSVP QR Code"
            className="w-44 h-44 mx-auto rounded-lg border p-2 bg-white"
            referrerPolicy="no-referrer"
          />
          <p className="text-[11px] text-olive-dark/80 mt-2 font-serif-royal">
            Share with family & friends for instant mobile invitation!
          </p>
        </div>
      )}

      {/* Dashboard View */}
      {isOpen && (
        <div className="mt-6 p-6 sm:p-8 rounded-3xl bg-ivory text-olive-dark border border-olive-light/40 shadow-2xl text-left">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-olive-light/30">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-pink-dusty flex items-center gap-2">
                <Users className="w-5 h-5 text-olive-light" /> Guest List & RSVP Summary
              </h3>
              <p className="text-xs text-olive-dark/80 font-serif-royal">
                Organizer Portal for Baby Ayeli Yenara's Fairytale Birthday
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchRsvps}
                className="p-2 rounded-lg bg-pink-pale hover:bg-pink-pale/80 text-olive-dark transition"
                title="Refresh RSVPs"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={exportToCsv}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-olive-light hover:bg-olive-light/90 font-bold text-xs text-white shadow transition"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="p-3 rounded-xl bg-pink-pale border border-olive-light/20">
              <span className="block text-2xl font-black font-cinzel text-olive-dark">
                {totalAttendingGuests}
              </span>
              <span className="text-[11px] text-olive-dark/70 uppercase font-semibold">Total Attending</span>
            </div>

            <div className="p-3 rounded-xl bg-pink-pale border border-olive-light/20">
              <span className="block text-2xl font-black font-cinzel text-olive-dark">
                {totalAdults}
              </span>
              <span className="text-[11px] text-olive-dark/70 uppercase font-semibold">Adult Royalty</span>
            </div>

            <div className="p-3 rounded-xl bg-pink-pale border border-olive-light/20">
              <span className="block text-2xl font-black font-cinzel text-olive-dark">
                {totalKids}
              </span>
              <span className="text-[11px] text-olive-dark/70 uppercase font-semibold">Little Princesses/Princes</span>
            </div>

            <div className="p-3 rounded-xl bg-pink-pale border border-olive-light/20">
              <span className="block text-2xl font-black font-cinzel text-olive-dark">
                {rsvps.length}
              </span>
              <span className="text-[11px] text-olive-dark/70 uppercase font-semibold">Total Responses</span>
            </div>
          </div>

          {/* RSVPs Table */}
          <div className="overflow-x-auto rounded-xl border border-olive-light/30 bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-pink-pale text-olive-dark font-cinzel font-bold border-b border-olive-light/30">
                <tr>
                  <th className="p-3">Guest Name</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Adults</th>
                  <th className="p-3">Kids</th>
                  <th className="p-3">Dietary Info</th>
                  <th className="p-3">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-olive-light/20 text-olive-dark/90">
                {rsvps.map((r) => (
                  <tr key={r.id} className="hover:bg-ivory/50">
                    <td className="p-3 font-semibold text-olive-dark font-bold">{r.guestName}</td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.attending ? 'bg-olive-light/20 text-olive-dark' : 'bg-pink-dusty/20 text-olive-dark'
                      }`}>
                        {r.attending ? 'Attending' : 'Declined'}
                      </span>
                    </td>
                    <td className="p-3">{r.adultsCount}</td>
                    <td className="p-3">{r.kidsCount}</td>
                    <td className="p-3 font-serif-royal italic text-olive-dark/80">{r.dietary || 'None'}</td>
                    <td className="p-3 max-w-xs truncate">{r.specialNote || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
