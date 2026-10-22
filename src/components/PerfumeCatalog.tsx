import React, { useState } from 'react';
import { COSMIC_PERFUMES } from '../data/cosmicPerfumes';
import { CosmicPerfume } from '../types';
import { Plus, Eye, X, Check } from 'lucide-react';

interface PerfumeCatalogProps {
  onAddToCart: (perfume: CosmicPerfume) => void;
  onCustomizeBottle: (perfume: CosmicPerfume) => void;
}

export const PerfumeCatalog: React.FC<PerfumeCatalogProps> = ({
  onAddToCart,
  onCustomizeBottle,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'Fire' | 'Water' | 'Earth' | 'Air'>('all');
  const [selectedPerfume, setSelectedPerfume] = useState<CosmicPerfume | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredPerfumes = COSMIC_PERFUMES.filter((perfume) => {
    if (activeFilter === 'all') return true;
    return perfume.element === activeFilter;
  });

  const handleAdd = (perfume: CosmicPerfume) => {
    onAddToCart(perfume);
    setAddedId(perfume.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section id="collection" className="py-16 lg:py-24 max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-amber-300/80 mb-2">
            <span>The Navagraha Pantheon</span>
            <span aria-hidden="true">·</span>
            <span>Nine Celestial Formulations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-amber-50">
            Sacred Cosmic Fragrances
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">
            Each formulation is attuned to the electromagnetic light and botanical correspondences of
            a planetary deity, distilled in high concentrations of pure extrait.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-[#141524] rounded-lg border border-amber-900/30 self-start md:self-end">
          {(
            [
              { key: 'all', label: 'All Planets' },
              { key: 'Fire', label: 'Solar & Fire' },
              { key: 'Water', label: 'Lunar & Water' },
              { key: 'Earth', label: 'Venus & Earth' },
              { key: 'Air', label: 'Mercury & Air' },
            ] as const
          ).map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === filter.key
                  ? 'bg-amber-300 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Column Luxury Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPerfumes.map((perfume) => (
          <article
            key={perfume.id}
            className="group relative bg-[#11121d] border border-amber-900/30 rounded-xl overflow-hidden flex flex-col justify-between hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-950/20 transition-all duration-300"
          >
            {/* Lead Image (65% card visual weight) */}
            <div className="relative aspect-[4/3] bg-[#0c0d15] overflow-hidden">
              <img
                src={perfume.image}
                alt={`${perfume.name} - Astroscent ${perfume.planet} Perfume`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fb = target.nextElementSibling as HTMLElement;
                  if (fb) fb.style.display = 'flex';
                }}
              />
              <div
                style={{ display: 'none' }}
                className="w-full h-full flex items-center justify-center bg-[#151624] text-amber-200"
              >
                <span className="text-4xl">{perfume.symbol}</span>
              </div>

              {/* Planet Badge & Element */}
              <div className="absolute top-3 left-3 flex items-center gap-2 text-[11px] font-mono tracking-wider bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-amber-300 border border-amber-900/40">
                <span>{perfume.symbol}</span>
                <span>{perfume.planet}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-300">{perfume.element}</span>
              </div>

              {/* Quick View Button */}
              <button
                onClick={() => setSelectedPerfume(perfume)}
                aria-label={`View details of ${perfume.name}`}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/90 text-amber-200 border border-amber-900/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* Product Metadata & Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-amber-300/80 font-medium">
                    {perfume.tagline}
                  </span>
                  <span className="font-mono text-sm font-semibold text-amber-100 tabular-nums">
                    ${perfume.price}
                  </span>
                </div>

                <h3 className="text-xl font-serif text-amber-50 mt-1">{perfume.name}</h3>

                <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                  {perfume.description}
                </p>

                {/* Key Dominant Accords */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {perfume.dominantAccords.slice(0, 3).map((accord) => (
                    <span
                      key={accord}
                      className="text-[11px] text-slate-400 bg-[#171828] px-2 py-0.5 rounded border border-slate-800"
                    >
                      {accord}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-amber-900/20 flex items-center gap-2">
                <button
                  onClick={() => handleAdd(perfume)}
                  className="flex-1 py-2 px-3 bg-amber-300 hover:bg-amber-200 text-slate-950 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {addedId === perfume.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onCustomizeBottle(perfume)}
                  title="Customize bottle shape and engraving"
                  className="px-3 py-2 bg-[#171828] hover:bg-[#22243a] text-amber-200 text-xs rounded-lg border border-amber-900/30 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Flacon
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Quick View Modal */}
      {selectedPerfume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative bg-[#11121d] border border-amber-900/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPerfume(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-amber-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="text-3xl text-amber-300">{selectedPerfume.symbol}</span>
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
                  {selectedPerfume.planet} Sovereign · {selectedPerfume.element}
                </span>
                <h3 className="text-2xl font-serif text-amber-50">{selectedPerfume.name}</h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedPerfume.description}
            </p>

            {/* Olfactory Pyramid Breakdown */}
            <div className="p-4 bg-[#171829] border border-amber-900/30 rounded-xl space-y-3">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-medium block">
                Olfactory Pyramid Architecture
              </span>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-amber-400/90 font-medium">Top Notes: </span>
                  <span className="text-slate-300">{selectedPerfume.pyramid.top.join(' · ')}</span>
                </div>
                <div>
                  <span className="text-amber-400/90 font-medium">Heart Notes: </span>
                  <span className="text-slate-300">{selectedPerfume.pyramid.heart.join(' · ')}</span>
                </div>
                <div>
                  <span className="text-amber-400/90 font-medium">Base Notes: </span>
                  <span className="text-slate-300">{selectedPerfume.pyramid.base.join(' · ')}</span>
                </div>
              </div>
            </div>

            {/* Astrological Resonance & Mantra */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-3 bg-[#151624] rounded-lg border border-slate-800">
                <span className="text-amber-300 font-semibold block mb-1">
                  Astrological Resonance:
                </span>
                {selectedPerfume.astrologicalResonance}
              </div>
              <div className="p-3 bg-[#151624] rounded-lg border border-slate-800 flex items-center justify-between font-mono">
                <span className="text-slate-400">Sacred Mantra:</span>
                <span className="text-amber-200">{selectedPerfume.mantra}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-amber-900/30">
              <span className="font-mono text-xl text-amber-100 tabular-nums font-semibold">
                ${selectedPerfume.price} USD
              </span>
              <button
                onClick={() => {
                  handleAdd(selectedPerfume);
                  setSelectedPerfume(null);
                }}
                className="py-2.5 px-6 bg-amber-300 hover:bg-amber-200 text-slate-950 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Add 50ml Flacon to Bag
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
