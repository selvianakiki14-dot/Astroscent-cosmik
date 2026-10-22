import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BirthChartCalculator } from './components/BirthChartCalculator';
import { PerfumeCatalog } from './components/PerfumeCatalog';
import { BottleCustomizer } from './components/BottleCustomizer';
import { CosmicAlchemistModal } from './components/CosmicAlchemistModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { CartItem, CosmicPerfume } from './types';
import { COSMIC_PERFUMES } from './data/cosmicPerfumes';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('astroscent_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAlchemistOpen, setIsAlchemistOpen] = useState(false);
  const [customizerPerfume, setCustomizerPerfume] = useState<CosmicPerfume | null>(null);
  const [customizerEngraving, setCustomizerEngraving] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem('astroscent_cart', JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart]);

  const handleAddToCart = (
    perfume: CosmicPerfume,
    engraving?: string,
    flaconStyle?: string,
    capStyle?: string
  ) => {
    const itemKey = `${perfume.id}-${flaconStyle || 'classic'}-${engraving || 'none'}`;
    const price = flaconStyle ? perfume.price + 25 : perfume.price;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemKey,
          perfume,
          size: '50ml Eau de Parfum',
          price,
          quantity: 1,
          engraving,
          flaconStyle,
          capStyle,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCustomizeBottle = (perfume: CosmicPerfume, coordinates?: string) => {
    setCustomizerPerfume(perfume);
    if (coordinates) {
      setCustomizerEngraving(coordinates);
    }
    const el = document.getElementById('flacon-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090a10] text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      {/* Top Bar */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAlchemist={() => setIsAlchemistOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Campaign Sections */}
      <main>
        <Hero
          onCalculateClick={() => handleNavigate('birth-chart')}
          onExploreCollection={() => handleNavigate('collection')}
          onOpenAlchemist={() => setIsAlchemistOpen(true)}
        />

        <BirthChartCalculator
          onAddToCart={(perfume, engraving) => handleAddToCart(perfume, engraving)}
          onCustomizeBottle={handleCustomizeBottle}
        />

        <PerfumeCatalog
          onAddToCart={(perfume) => handleAddToCart(perfume)}
          onCustomizeBottle={(perfume) => handleCustomizeBottle(perfume)}
        />

        <BottleCustomizer
          initialPerfume={customizerPerfume || COSMIC_PERFUMES[0]}
          initialEngraving={customizerEngraving}
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* AI Cosmic Scent Alchemist Modal */}
      <CosmicAlchemistModal
        isOpen={isAlchemistOpen}
        onClose={() => setIsAlchemistOpen(false)}
      />
    </div>
  );
}
