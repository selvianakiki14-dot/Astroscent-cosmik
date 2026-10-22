import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer id="heritage" className="bg-[#07070d] border-t border-amber-900/30 pt-16 pb-12 text-slate-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-amber-900/20">
          {/* Brand & Philosophy */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-2xl font-serif text-amber-100 tracking-wider">
              Astroscent Cosmik
            </span>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Haute astrological perfumery distilled in accordance with the ancient science of
              planetary light, birth charts, and sacred botanical essences.
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <div>Atelier: G-26, Middle Circle, Connaught Place</div>
              <div>Creative Sanctuary: DLF Phase 1, Gurugram, India</div>
              <div>Inquiries: <a href="mailto:namaste@astroscent.in" className="text-amber-300 hover:underline">namaste@astroscent.in</a></div>
            </div>
          </div>

          {/* Planetary Collections */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block">
              Navagraha Collections
            </span>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <span className="text-amber-200">Sol Invictus</span> · Sun Vitality
              </li>
              <li>
                <span className="text-amber-200">Chandra Som</span> · Lunar Intuition
              </li>
              <li>
                <span className="text-amber-200">Shukra Velvet</span> · Venusian Harmony
              </li>
              <li>
                <span className="text-amber-200">Mangala Blaze</span> · Martial Fire
              </li>
              <li>
                <span className="text-amber-200">Guru Brihaspati</span> · Sovereign Wisdom
              </li>
              <li>
                <span className="text-amber-200">Shani Zenith</span> · Stoic Mastery
              </li>
            </ul>
          </div>

          {/* Newsletter / Celestial Dispatch */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block">
              The Cosmic Dispatch
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive notifications during planetary retrograde transits, solar ingresses, and
              limited artisanal seasonal flacon releases.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-amber-300 p-2.5 bg-amber-950/40 rounded-lg border border-amber-900/50">
                <Check className="w-4 h-4" />
                <span>You are attuned to the Cosmic Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#12131f] border border-amber-900/40 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-300 hover:bg-amber-200 text-slate-950 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Join</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Astroscent Cosmik. All celestial rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hover:text-slate-300 cursor-pointer">Astrological Ethics</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Pure Botanical Extraction</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">Global Shipping Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
