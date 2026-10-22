import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface HeroProps {
  onCalculateClick: () => void;
  onExploreCollection: () => void;
  onOpenAlchemist: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onCalculateClick,
  onExploreCollection,
  onOpenAlchemist,
}) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/5 blur-[140px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Campaign Split-Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Brand & Astrological Pitch */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Quiet text kicker with typographic separator */}
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-amber-300/80">
              <span>Haute Astrological Perfumery</span>
              <span aria-hidden="true">·</span>
              <span>Navagraha Planetary Light</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-amber-50 tracking-tight leading-[1.12] [text-wrap:balance]">
              Perfume Aligned with Your Celestial Blueprint
            </h1>

            <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-xl">
              At the exact moment of your birth, the cosmos arranged a singular vibrational harmony.
              Astroscent Cosmik translates your planetary chart into pure botanical alchemy and sacred accords.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onCalculateClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-slate-950 bg-amber-300 hover:bg-amber-200 rounded-lg shadow-lg shadow-amber-950/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <Compass className="w-4 h-4 text-slate-950" />
                <span>Calculate Your Birth Chart Scent</span>
              </button>

              <button
                onClick={onExploreCollection}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-amber-100 bg-[#141522] hover:bg-[#1c1d2e] border border-amber-900/40 rounded-lg transition-colors cursor-pointer"
              >
                <span>Explore The 9 Elixirs</span>
              </button>
            </div>

            {/* AI Alchemist Prompt shortcut */}
            <div className="pt-2">
              <button
                onClick={onOpenAlchemist}
                className="text-xs text-amber-300/80 hover:text-amber-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Need a bespoke intuitive pairing? Consult the AI Scent Alchemist</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Fidelity Campaign Hero Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-900/30 shadow-2xl shadow-black/80 bg-[#12131e] group">
              <img
                src="/src/assets/images/astroscent_hero_flacon_1792646796904.jpg"
                alt="Astroscent Cosmik bespoke astronomical perfume flacon with etched golden constellations"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[480px] lg:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  // Fallback container if image fails to load
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div
                style={{ display: 'none' }}
                className="w-full h-[480px] flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[#141526] to-[#090a10]"
              >
                <Compass className="w-12 h-12 text-amber-300 mb-4" />
                <h3 className="text-xl font-serif text-amber-100">Astroscent Cosmik</h3>
                <p className="text-xs text-slate-400 mt-2 max-w-sm">
                  Celestial Astrological Haute Perfumery Flacon
                </p>
              </div>

              {/* Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-between">
                <div>
                  <div className="text-xs tracking-wider uppercase font-medium text-amber-300">
                    Cosmic Odyssey Series
                  </div>
                  <div className="text-sm font-serif text-amber-50">
                    Hand-Blown Obsidian Glass Flacon with 24K Constellation Leaf
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-300 tabular-nums">
                  50ml Extrait
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Adjacent Proof Strip (Claim-to-Proof Adjacency) */}
        <div className="mt-14 pt-8 border-t border-amber-900/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <div className="font-serif text-2xl lg:text-3xl text-amber-100 tabular-nums">
              9 Planets
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Navagraha sacred botanical accords calibrated to cosmic frequencies.
            </div>
          </div>

          <div>
            <div className="font-serif text-2xl lg:text-3xl text-amber-100 tabular-nums">
              100% Pure
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Wild-harvested botanical absolutes, rare resins, and natural orris.
            </div>
          </div>

          <div>
            <div className="font-serif text-2xl lg:text-3xl text-amber-100 tabular-nums">
              340+ Natal Points
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Precision algorithmic calculation of Sun, Moon & Ascendant harmony.
            </div>
          </div>

          <div>
            <div className="font-serif text-2xl lg:text-3xl text-amber-100 tabular-nums">
              Custom Flacon
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Personalized laser engraving with your exact natal coordinates.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
