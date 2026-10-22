import React, { useState } from 'react';
import { X, Sparkles, Send, Flame, Compass } from 'lucide-react';

interface CosmicAlchemistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AlchemicalResponse {
  bespokeRecipe: string;
  astrologicalInsight: string;
  accordBlend: string[];
  planetaryTiming: string;
  mantra: string;
}

export const CosmicAlchemistModal: React.FC<CosmicAlchemistModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [intentionPrompt, setIntentionPrompt] = useState('');
  const [zodiacSign, setZodiacSign] = useState('Leo');
  const [isLoading, setIsLoading] = useState(false);
  const [alchemicalResult, setAlchemicalResult] = useState<AlchemicalResponse | null>(null);

  if (!isOpen) return null;

  const handleSynthesize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intentionPrompt.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/gemini/scent-alchemy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intention: intentionPrompt,
          zodiacSign,
        }),
      });

      if (!response.ok) {
        throw new Error('Server response error');
      }

      const data = await response.json();
      setAlchemicalResult(data);
    } catch {
      // Graceful Astrological Alchemist Fallback
      setAlchemicalResult({
        bespokeRecipe: `The Alchemist harmonizes your ${zodiacSign} frequencies with celestial botanicals. We distill sun-warmed Sicilian bergamot and Kashmiri saffron to awaken vital confidence, intertwined with Florentine orris and creamy Mysore sandalwood for rooted inner tranquility.`,
        astrologicalInsight: `Transits to your chart indicate an opening of creative manifestation. The planetary currents call for warming resinous accords to protect your auric field while projecting magnetic radiance.`,
        accordBlend: [
          'Top: Golden Bergamot & Spiced Immortelle',
          'Heart: Damascus Rose & Sacred Frankincense',
          'Base: Creamy Mysore Sandalwood & Ambergris',
        ],
        planetaryTiming: 'Best applied during the planetary hour of the Sun at sunrise or high noon on Sunday.',
        mantra: 'Om Suryaya Namaha · Light Within, Radiance Without',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative bg-[#0f101b] border border-amber-900/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-amber-200 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-400/10 border border-amber-400/30 rounded-xl text-amber-300">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
              Gemini Cosmic Intelligence
            </span>
            <h3 className="text-2xl font-serif text-amber-50">
              The Celestial Scent Alchemist
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Share your deepest intention, current life transition, or mood. The Alchemist will synthesize
          an astrological scent formula, planetary timing, and sacred anointing ritual for you.
        </p>

        {/* Form */}
        <form onSubmit={handleSynthesize} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                Zodiac Influence
              </label>
              <select
                value={zodiacSign}
                onChange={(e) => setZodiacSign(e.target.value)}
                className="w-full bg-[#171829] border border-amber-900/40 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-400"
              >
                {[
                  'Aries',
                  'Taurus',
                  'Gemini',
                  'Cancer',
                  'Leo',
                  'Virgo',
                  'Libra',
                  'Scorpio',
                  'Sagittarius',
                  'Capricorn',
                  'Aquarius',
                  'Pisces',
                ].map((sign) => (
                  <option key={sign} value={sign}>
                    {sign}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                Your Intention or Dream
              </label>
              <input
                type="text"
                value={intentionPrompt}
                onChange={(e) => setIntentionPrompt(e.target.value)}
                placeholder="e.g. Navigating eclipse season with deep calm and grounded clarity"
                className="w-full bg-[#171829] border border-amber-900/40 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !intentionPrompt.trim()}
            className="w-full py-2.5 px-4 bg-amber-300 hover:bg-amber-200 disabled:opacity-50 text-slate-950 font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Consulting Celestial Spheres...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Synthesize Alchemical Recipe</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Suggestion Prompts */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="text-[11px] text-slate-400 self-center">Try:</span>
          {[
            'Seeking courage for a big creative career launch',
            'Deep emotional healing and peaceful dream states',
            'Magnetic presence and romantic attraction',
          ].map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => setIntentionPrompt(prompt)}
              className="text-[11px] px-2.5 py-1 bg-[#171828] hover:bg-[#23243c] text-amber-200/80 rounded border border-amber-900/30 transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Alchemical Result Card */}
        {alchemicalResult && (
          <div className="p-5 bg-gradient-to-br from-[#16182c] to-[#10111e] border border-amber-400/30 rounded-xl space-y-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block">
                Bespoke Scent Formulation
              </span>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                {alchemicalResult.bespokeRecipe}
              </p>
            </div>

            <div className="p-3 bg-[#0d0e19] rounded-lg border border-amber-900/30 space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider text-amber-400 font-medium flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                <span>Alchemical Accord Blend</span>
              </span>
              <ul className="text-xs text-slate-300 space-y-1 font-mono">
                {alchemicalResult.accordBlend.map((accord, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-amber-400">·</span>
                    <span>{accord}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#0d0e19] rounded-lg border border-slate-800">
                <span className="text-amber-300 font-medium block mb-1">
                  Planetary Hour & Timing:
                </span>
                <span className="text-slate-300">{alchemicalResult.planetaryTiming}</span>
              </div>
              <div className="p-3 bg-[#0d0e19] rounded-lg border border-slate-800">
                <span className="text-amber-300 font-medium block mb-1 flex items-center gap-1">
                  <Compass className="w-3 h-3 text-amber-400" />
                  <span>Sacred Anointing Mantra:</span>
                </span>
                <span className="text-slate-300 font-mono">{alchemicalResult.mantra}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
