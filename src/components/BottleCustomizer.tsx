import React, { useState } from 'react';
import { COSMIC_PERFUMES } from '../data/cosmicPerfumes';
import { CosmicPerfume } from '../types';
import { Sparkles, Check } from 'lucide-react';

interface BottleCustomizerProps {
  initialPerfume?: CosmicPerfume | null;
  initialEngraving?: string;
  onAddToCart: (
    perfume: CosmicPerfume,
    engraving?: string,
    flaconStyle?: string,
    capStyle?: string
  ) => void;
}

export const BottleCustomizer: React.FC<BottleCustomizerProps> = ({
  initialPerfume,
  initialEngraving,
  onAddToCart,
}) => {
  const [selectedPerfume, setSelectedPerfume] = useState<CosmicPerfume>(
    initialPerfume || COSMIC_PERFUMES[0]
  );
  const [flaconSilhouette, setFlaconSilhouette] = useState('Celestial Flask');
  const [glassHue, setGlassHue] = useState<'Obsidian Noir' | 'Solar Gold' | 'Rose Nebula' | 'Astral Azure'>('Obsidian Noir');
  const [capTalisman, setCapTalisman] = useState('Crescent Moon');
  const [engravingText, setEngravingText] = useState(initialEngraving || '28°38\'N 77°13\'E');
  const [isAdded, setIsAdded] = useState(false);

  // Sync if initial perfume changes
  React.useEffect(() => {
    if (initialPerfume) {
      setSelectedPerfume(initialPerfume);
    }
  }, [initialPerfume]);

  React.useEffect(() => {
    if (initialEngraving) {
      setEngravingText(initialEngraving);
    }
  }, [initialEngraving]);

  const handleAddCustom = () => {
    onAddToCart(
      selectedPerfume,
      engravingText,
      `${flaconSilhouette} in ${glassHue}`,
      capTalisman
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const getGlassStyle = () => {
    switch (glassHue) {
      case 'Solar Gold':
        return 'from-amber-600/40 via-amber-800/60 to-black/90 border-amber-500/50 shadow-amber-500/20';
      case 'Rose Nebula':
        return 'from-rose-500/30 via-rose-950/60 to-black/90 border-rose-400/50 shadow-rose-500/20';
      case 'Astral Azure':
        return 'from-cyan-600/30 via-indigo-950/70 to-black/90 border-cyan-400/50 shadow-cyan-500/20';
      default:
        return 'from-slate-700/30 via-slate-900/80 to-black/95 border-amber-400/40 shadow-amber-400/10';
    }
  };

  return (
    <section id="flacon-studio" className="py-16 lg:py-24 bg-[#0a0b12] border-t border-amber-900/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-medium text-amber-300/80 mb-2">
            <span>Atelier Alchimique</span>
            <span aria-hidden="true">·</span>
            <span>Bespoke Flacon Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-amber-50">
            Craft Your Cosmic Talisman Flacon
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Configure the sacred vessel for your planetary fragrance with custom crystal geometry,
            celestial talismans, and personalized laser-engraved birth coordinates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Interactive Flacon Render Preview */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-[#10111d] border border-amber-900/30 rounded-2xl relative overflow-hidden min-h-[460px]">
            {/* Background cosmic aura */}
            <div
              className="absolute inset-0 bg-radial from-amber-400/5 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Rendered Bottle Graphic */}
            <div className="relative flex flex-col items-center">
              {/* Talisman Cap */}
              <div className="w-16 h-14 bg-gradient-to-b from-amber-200 to-amber-500 rounded-t-xl border border-amber-300 shadow-lg flex items-center justify-center text-slate-950 font-bold z-10">
                {capTalisman === 'Crescent Moon' && (
                  <span className="text-xl font-serif">☽</span>
                )}
                {capTalisman === 'Sunburst Crown' && (
                  <span className="text-xl font-serif">☼</span>
                )}
                {capTalisman === 'Planetary Orb' && (
                  <span className="text-xl font-serif">🪐</span>
                )}
                {capTalisman === 'Starlight Prism' && (
                  <span className="text-xl font-serif">✦</span>
                )}
              </div>

              {/* Collar ring */}
              <div className="w-20 h-3 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 border-x border-amber-300 z-10" />

              {/* Bottle Body */}
              <div
                className={`w-48 sm:w-56 h-64 sm:h-72 bg-gradient-to-b ${getGlassStyle()} border-2 shadow-2xl relative flex flex-col items-center justify-center p-4 backdrop-blur-md transition-all duration-500 ${
                  flaconSilhouette === 'Crescent Amphora'
                    ? 'rounded-3xl'
                    : flaconSilhouette === 'Stellar Obelisk'
                    ? 'rounded-none border-amber-400/60'
                    : 'rounded-xl'
                }`}
              >
                {/* Gold Planetary Sigil */}
                <div className="text-4xl text-amber-300 drop-shadow-[0_0_12px_rgba(212,175,55,0.6)] mb-2">
                  {selectedPerfume.symbol}
                </div>

                {/* Perfume Label */}
                <div className="text-center px-3 py-2 bg-black/60 backdrop-blur-sm border border-amber-900/50 rounded w-full max-w-[170px]">
                  <span className="text-[10px] uppercase tracking-widest text-amber-300 font-medium block">
                    {selectedPerfume.planet} Sovereign
                  </span>
                  <span className="text-sm font-serif text-amber-50 font-semibold block truncate">
                    {selectedPerfume.name}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
                    50ml Extrait
                  </span>
                </div>

                {/* Laser Engraved text on glass */}
                {engravingText && (
                  <div className="mt-4 text-[10px] font-mono tracking-widest uppercase text-amber-300/80 px-2 py-0.5 border-b border-amber-400/30 text-center max-w-[180px] truncate">
                    {engravingText}
                  </div>
                )}
              </div>
            </div>

            {/* Spec summary badge */}
            <div className="mt-8 text-xs font-mono text-slate-400 flex items-center gap-3">
              <span>{flaconSilhouette}</span>
              <span>·</span>
              <span>{glassHue}</span>
              <span>·</span>
              <span>{capTalisman}</span>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-6 space-y-6 bg-[#121321] border border-amber-900/30 rounded-2xl p-6 sm:p-8">
            {/* Fragrance Base Picker */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                1. Select Sacred Perfume Base
              </label>
              <select
                value={selectedPerfume.id}
                onChange={(e) => {
                  const p = COSMIC_PERFUMES.find((item) => item.id === e.target.value);
                  if (p) setSelectedPerfume(p);
                }}
                className="w-full bg-[#18192b] border border-amber-900/40 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-400"
              >
                {COSMIC_PERFUMES.map((perfume) => (
                  <option key={perfume.id} value={perfume.id}>
                    {perfume.symbol} {perfume.name} ({perfume.planet} · ${perfume.price})
                  </option>
                ))}
              </select>
            </div>

            {/* Flacon Silhouette */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                2. Flacon Silhouette
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Celestial Flask', 'Stellar Obelisk', 'Crescent Amphora'].map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setFlaconSilhouette(style)}
                    className={`py-2 px-2.5 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                      flaconSilhouette === style
                        ? 'bg-amber-300 text-slate-950 font-semibold border-amber-300'
                        : 'bg-[#18192b] text-slate-300 border-amber-900/30 hover:border-amber-400/40'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Glass Hue */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                3. Heavy Crystal Glass Hue
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: 'Obsidian Noir', color: 'bg-slate-900' },
                  { name: 'Solar Gold', color: 'bg-amber-700' },
                  { name: 'Rose Nebula', color: 'bg-rose-900' },
                  { name: 'Astral Azure', color: 'bg-cyan-900' },
                ].map((hue) => (
                  <button
                    key={hue.name}
                    type="button"
                    onClick={() =>
                      setGlassHue(hue.name as 'Obsidian Noir' | 'Solar Gold' | 'Rose Nebula' | 'Astral Azure')
                    }
                    className={`py-2 px-2 text-xs rounded-lg border text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                      glassHue === hue.name
                        ? 'bg-amber-300 text-slate-950 font-semibold border-amber-300'
                        : 'bg-[#18192b] text-slate-300 border-amber-900/30 hover:border-amber-400/40'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${hue.color}`} />
                    <span className="truncate">{hue.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cap Talisman */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 mb-2 font-medium">
                4. Talisman Cap
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Crescent Moon', 'Sunburst Crown', 'Planetary Orb', 'Starlight Prism'].map(
                  (cap) => (
                    <button
                      key={cap}
                      type="button"
                      onClick={() => setCapTalisman(cap)}
                      className={`py-2 px-2 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                        capTalisman === cap
                          ? 'bg-amber-300 text-slate-950 font-semibold border-amber-300'
                          : 'bg-[#18192b] text-slate-300 border-amber-900/30 hover:border-amber-400/40'
                      }`}
                    >
                      {cap}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Laser Engraving Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs uppercase tracking-wider text-slate-300 font-medium">
                  5. Laser Engraving (Coordinates or Name)
                </label>
                <span className="text-[11px] text-slate-400">Max 28 chars</span>
              </div>
              <input
                type="text"
                maxLength={28}
                value={engravingText}
                placeholder="e.g. 28°38'N 77°13'E or ARIEL"
                onChange={(e) => setEngravingText(e.target.value)}
                className="w-full bg-[#18192b] border border-amber-900/40 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono"
              />
            </div>

            {/* Submit Price & CTA */}
            <div className="pt-4 border-t border-amber-900/30 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block">
                  Bespoke Atelier Price:
                </span>
                <span className="text-2xl font-serif text-amber-50 font-semibold tabular-nums">
                  ${selectedPerfume.price + 25} USD
                </span>
                <span className="text-[10px] text-amber-300/80 block">Includes custom flacon & engraving</span>
              </div>

              <button
                type="button"
                onClick={handleAddCustom}
                className="py-3 px-6 bg-amber-300 hover:bg-amber-200 text-slate-950 font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors cursor-pointer flex items-center gap-2"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Add Bespoke Flacon</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
