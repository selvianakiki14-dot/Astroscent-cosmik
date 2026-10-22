import React, { useState } from 'react';
import { Compass, Sparkles, Plus, Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { calculateBirthChart } from '../utils/astrologyEngine';
import { BirthChartResult, CosmicPerfume } from '../types';

interface BirthChartCalculatorProps {
  onAddToCart: (perfume: CosmicPerfume, engraving?: string) => void;
  onCustomizeBottle: (perfume: CosmicPerfume, coordinates?: string) => void;
}

export const BirthChartCalculator: React.FC<BirthChartCalculatorProps> = ({
  onAddToCart,
  onCustomizeBottle,
}) => {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('1998-07-15');
  const [birthTime, setBirthTime] = useState('14:30');
  const [birthLocation, setBirthLocation] = useState('New Delhi, India');
  const [result, setResult] = useState<BirthChartResult | null>(() =>
    calculateBirthChart('Aria Vance', '1998-07-15', '14:30', 'New Delhi, India')
  );
  const [isCalculated, setIsCalculated] = useState(true);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;
    const res = calculateBirthChart(fullName || 'Seeker', birthDate, birthTime, birthLocation);
    setResult(res);
    setIsCalculated(true);
  };

  const loadPreset = (name: string, date: string, time: string, location: string) => {
    setFullName(name);
    setBirthDate(date);
    setBirthTime(time);
    setBirthLocation(location);
    const res = calculateBirthChart(name, date, time, location);
    setResult(res);
    setIsCalculated(true);
  };

  return (
    <section id="birth-chart" className="py-16 lg:py-24 bg-[#0d0e17] border-y border-amber-900/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-medium text-amber-300/80 mb-2">
            <span>Cosmic Natal Alignment</span>
            <span aria-hidden="true">·</span>
            <span>Olfactory Translation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-amber-50 [text-wrap:balance]">
            Calculate Your Astrological Signature Scent
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Enter your exact birth credentials to map your Sun, Moon, and Ascendant positions into a
            harmonized bespoke fragrance pyramid.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Natal Coordinates Entry */}
          <div className="lg:col-span-5 bg-[#12131f] border border-amber-900/30 rounded-xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-serif text-amber-100 flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-300" />
              <span>Natal Parameters</span>
            </h3>

            <form onSubmit={handleCalculate} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium">
                  Your Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Selviana Kiki"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#181928] border border-amber-900/40 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-300/80" />
                  <span>Date of Birth</span>
                </label>
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full bg-[#181928] border border-amber-900/40 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-300/80" />
                    <span>Exact Time</span>
                  </label>
                  <input
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="w-full bg-[#181928] border border-amber-900/40 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Used to calculate Ascendant
                  </span>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 mb-1.5 font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-300/80" />
                    <span>Birth City</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Paris, France"
                    value={birthLocation}
                    onChange={(e) => setBirthLocation(e.target.value)}
                    className="w-full bg-[#181928] border border-amber-900/40 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 bg-amber-300 hover:bg-amber-200 text-slate-950 font-medium text-xs tracking-wider uppercase rounded-lg shadow transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Cast Chart & Synthesize Scent</span>
              </button>
            </form>

            {/* Presets */}
            <div className="pt-2 border-t border-amber-900/20">
              <span className="text-xs text-slate-400 block mb-2 font-medium">Quick Cosmic Presets:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => loadPreset('Aria Vance', '1998-07-15', '14:30', 'New Delhi, India')}
                  className="px-2.5 py-1 text-xs bg-[#181928] hover:bg-[#222438] text-amber-200/90 rounded border border-amber-900/30 transition-colors cursor-pointer"
                >
                  Cancer Sun (July 15)
                </button>
                <button
                  type="button"
                  onClick={() => loadPreset('Orion Blake', '1995-11-08', '08:15', 'London, UK')}
                  className="px-2.5 py-1 text-xs bg-[#181928] hover:bg-[#222438] text-amber-200/90 rounded border border-amber-900/30 transition-colors cursor-pointer"
                >
                  Scorpio Sun (Nov 8)
                </button>
                <button
                  type="button"
                  onClick={() => loadPreset('Selena Ray', '2001-04-28', '21:00', 'Tokyo, Japan')}
                  className="px-2.5 py-1 text-xs bg-[#181928] hover:bg-[#222438] text-amber-200/90 rounded border border-amber-900/30 transition-colors cursor-pointer"
                >
                  Taurus Sun (Apr 28)
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Natal Olfactory Matrix */}
          <div className="lg:col-span-7 bg-[#12131f] border border-amber-900/30 rounded-xl p-6 sm:p-8 space-y-6">
            {result && isCalculated && (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-amber-900/20 gap-3">
                  <div>
                    <span className="text-xs text-amber-300 uppercase tracking-widest font-medium">
                      Astrological Scent Diagnosis
                    </span>
                    <h3 className="text-2xl font-serif text-amber-50">
                      {result.fullName}&apos;s Celestial Reading
                    </h3>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {result.birthLocation} · {result.birthDate} {result.birthTime}
                  </div>
                </div>

                {/* 3 Pillars of Chart: Sun, Moon, Ascendant */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3.5 bg-[#171827] border border-amber-900/20 rounded-lg">
                    <div className="text-[11px] tracking-wider uppercase text-amber-400 font-medium">
                      Sun Sign {result.sunSign.symbol}
                    </div>
                    <div className="text-base font-serif text-amber-50 font-semibold mt-0.5">
                      {result.sunSign.name}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {result.sunSign.element} Element · Ruler: {result.sunSign.rulingPlanet}
                    </div>
                    <div className="text-[11px] text-amber-200/80 mt-2 font-mono">
                      Accord: {result.sunSign.signatureAccord.split(',')[0]}
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#171827] border border-amber-900/20 rounded-lg">
                    <div className="text-[11px] tracking-wider uppercase text-amber-400 font-medium">
                      Moon Sign {result.moonSign.symbol}
                    </div>
                    <div className="text-base font-serif text-amber-50 font-semibold mt-0.5">
                      {result.moonSign.name}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {result.moonSign.element} Element · Inner Realm
                    </div>
                    <div className="text-[11px] text-amber-200/80 mt-2 font-mono">
                      Accord: {result.moonSign.signatureAccord.split(',')[0]}
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#171827] border border-amber-900/20 rounded-lg">
                    <div className="text-[11px] tracking-wider uppercase text-amber-400 font-medium">
                      Rising Sign (Asc) {result.risingSign.symbol}
                    </div>
                    <div className="text-base font-serif text-amber-50 font-semibold mt-0.5">
                      {result.risingSign.name}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {result.risingSign.element} Element · Outer Aura
                    </div>
                    <div className="text-[11px] text-amber-200/80 mt-2 font-mono">
                      Accord: {result.risingSign.signatureAccord.split(',')[0]}
                    </div>
                  </div>
                </div>

                {/* Elemental Balance Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span className="font-medium">Elemental Balance:</span>
                    <span className="font-mono tabular-nums text-slate-400">
                      Fire {result.elementalBalance.fire}% · Earth {result.elementalBalance.earth}% · Air{' '}
                      {result.elementalBalance.air}% · Water {result.elementalBalance.water}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full flex overflow-hidden">
                    <div
                      style={{ width: `${result.elementalBalance.fire}%` }}
                      className="bg-amber-500 h-full"
                      title="Fire"
                    />
                    <div
                      style={{ width: `${result.elementalBalance.earth}%` }}
                      className="bg-emerald-600 h-full"
                      title="Earth"
                    />
                    <div
                      style={{ width: `${result.elementalBalance.air}%` }}
                      className="bg-sky-400 h-full"
                      title="Air"
                    />
                    <div
                      style={{ width: `${result.elementalBalance.water}%` }}
                      className="bg-indigo-500 h-full"
                      title="Water"
                    />
                  </div>
                </div>

                {/* Recommended Astroscent Perfume Highlight */}
                <div className="p-4 sm:p-5 bg-gradient-to-br from-[#181a2e] to-[#121320] border border-amber-400/30 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-amber-300">
                        {result.recommendedPerfume.symbol}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                        Governing Planetary Match
                      </span>
                    </div>
                    <span className="text-sm font-mono text-amber-200 tabular-nums">
                      ${result.recommendedPerfume.price} USD
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xl font-serif text-amber-50">
                        {result.recommendedPerfume.name}
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {result.recommendedPerfume.tagline}
                      </p>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-amber-950/60 border border-amber-800/40 text-amber-200 rounded self-start">
                      Governs {result.rulingPlanet}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {result.recommendedPerfume.description}
                  </p>

                  <div className="pt-2 text-xs text-amber-200/90 font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mantra: &apos;{result.recommendedPerfume.mantra}&apos;</span>
                  </div>

                  {/* Actions for Bespoke Bottle */}
                  <div className="pt-3 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() =>
                        onAddToCart(
                          result.recommendedPerfume,
                          `${result.fullName} · ${result.sunSign.name} Sun`
                        )
                      }
                      className="flex-1 py-2.5 px-4 bg-amber-300 hover:bg-amber-200 text-slate-950 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Order Natal Bottle (${result.recommendedPerfume.price})</span>
                    </button>

                    <button
                      onClick={() =>
                        onCustomizeBottle(
                          result.recommendedPerfume,
                          `${result.birthDate} ${result.birthLocation.slice(0, 16)}`
                        )
                      }
                      className="py-2.5 px-4 bg-[#141525] hover:bg-[#1f2038] text-amber-200 border border-amber-900/50 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                    >
                      <span>Customize Flacon & Engraving</span>
                    </button>
                  </div>
                </div>

                {/* Application Ritual Advice */}
                <div className="text-xs text-slate-400 bg-[#0e0f18] p-3 rounded-lg border border-slate-800/60 space-y-1">
                  <span className="text-amber-300/90 font-medium block">
                    Personalized Anointing Ritual:
                  </span>
                  <p className="leading-relaxed">{result.bespokeFormula.applicationRitual}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
