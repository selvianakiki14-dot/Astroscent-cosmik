import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAlchemist: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAlchemist,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#090a10]/90 backdrop-blur-md border-b border-amber-900/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Brand wordmark (single text element) */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
        >
          <span className="text-xl md:text-2xl font-serif tracking-wider text-amber-100 group-hover:text-amber-300 transition-colors whitespace-nowrap shrink-0">
            Astroscent Cosmik
          </span>
        </button>

        {/* Zone 2: 4-5 single-line clean text nav links */}
        <nav className="hidden md:flex items-center gap-7 text-xs tracking-widest uppercase font-medium text-slate-300">
          <button
            onClick={() => onNavigate('birth-chart')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Birth Chart Scent
          </button>
          <button
            onClick={() => onNavigate('collection')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            The 9 Perfumes
          </button>
          <button
            onClick={() => onNavigate('flacon-studio')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Flacon Studio
          </button>
          <button
            onClick={onOpenAlchemist}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-amber-200/90"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Alchemist</span>
          </button>
          <button
            onClick={() => onNavigate('heritage')}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Heritage
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-amber-100 bg-[#161722] hover:bg-[#202130] border border-amber-900/30 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:ring-1 focus-visible:ring-amber-400"
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Bag</span>
            <span className="font-mono tabular-nums text-amber-300 font-semibold">
              ({cartCount})
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
