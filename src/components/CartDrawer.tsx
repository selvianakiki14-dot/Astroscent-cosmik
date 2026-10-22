import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + (subtotal > 0 ? shipping : 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !shippingAddress) return;
    setOrderConfirmed(true);
    setTimeout(() => {
      onClearCart();
    }, 200);
  };

  const handleReset = () => {
    setOrderConfirmed(false);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f101b] border-l border-amber-900/40 p-6 flex flex-col justify-between shadow-2xl text-slate-100">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-amber-900/30">
            <div className="flex items-center gap-2">
              <span className="text-lg font-serif text-amber-50">Sacred Flacon Bag</span>
              <span className="text-xs font-mono text-amber-400 tabular-nums">
                ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-amber-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {orderConfirmed ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-300 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-amber-50">Celestial Order Confirmed</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                  Order <span className="font-mono text-amber-300">#ASTRO-7824</span> has been placed.
                  Our alchemists are hand-bottling and consecrating your bespoke planetary elixirs.
                </p>
                <div className="p-4 bg-[#161726] rounded-xl text-left text-xs space-y-1.5 border border-amber-900/30 font-mono">
                  <div className="text-amber-300 font-semibold font-sans mb-1">
                    Recipient Coordinates:
                  </div>
                  <div className="text-slate-300">Seeker: {customerName}</div>
                  <div className="text-slate-400">Email: {customerEmail}</div>
                  <div className="text-slate-400">Address: {shippingAddress}</div>
                  <div className="text-amber-200 pt-1 font-semibold">Total Paid: ${total} USD</div>
                </div>
                <button
                  onClick={handleReset}
                  className="mt-4 w-full py-2.5 px-4 bg-amber-300 hover:bg-amber-200 text-slate-950 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Return to Sanctuary
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <Sparkles className="w-10 h-10 text-amber-400/40 mx-auto" />
                <h4 className="text-lg font-serif text-amber-100">Your Bag is Empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Calculate your birth chart scent or select an astrological flacon to begin your
                  celestial journey.
                </p>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form */
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                    Delivery & Anointment Details
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-slate-400 hover:text-amber-200 underline cursor-pointer"
                  >
                    Back to Items
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    placeholder="Selviana Kiki"
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#18192a] border border-amber-900/40 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    placeholder="selvianakiki14@gmail.com"
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-[#18192a] border border-amber-900/40 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1 font-medium">
                    Shipping Address & City
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={shippingAddress}
                    placeholder="e.g. Connaught Place, New Delhi or International Address"
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full bg-[#18192a] border border-amber-900/40 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-400 resize-none"
                  />
                </div>

                <div className="p-3 bg-[#151625] rounded-lg border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal:</span>
                    <span className="font-mono tabular-nums">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Celestial Express Shipping:</span>
                    <span className="font-mono tabular-nums">
                      {shipping === 0 ? 'Complimentary' : `$${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-amber-200 font-semibold pt-1 border-t border-slate-800">
                    <span>Total:</span>
                    <span className="font-mono tabular-nums">${total} USD</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-amber-300 hover:bg-amber-200 text-slate-950 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Authorize & Consecrate Order (${total})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Itemized Cart List */
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-[#141525] border border-amber-900/30 rounded-xl space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-amber-300">{item.perfume.symbol}</span>
                        <h4 className="text-sm font-serif font-semibold text-amber-50">
                          {item.perfume.name}
                        </h4>
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {item.size}
                      </span>
                    </div>
                    <span className="font-mono text-sm font-semibold text-amber-200 tabular-nums">
                      ${item.price * item.quantity}
                    </span>
                  </div>

                  {/* Custom Flacon / Engraving Details */}
                  {(item.engraving || item.flaconStyle) && (
                    <div className="text-[10px] font-mono text-amber-300/80 bg-black/40 px-2 py-1 rounded border border-amber-900/30">
                      {item.flaconStyle && <div>Flacon: {item.flaconStyle}</div>}
                      {item.capStyle && <div>Talisman: {item.capStyle}</div>}
                      {item.engraving && <div>Engraving: &quot;{item.engraving}&quot;</div>}
                    </div>
                  )}

                  {/* Quantity and Remove */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 bg-[#1b1c2e] px-2 py-0.5 rounded border border-slate-800">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-slate-400 hover:text-amber-200 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs tabular-nums px-1 text-slate-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="text-slate-400 hover:text-amber-200 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {!orderConfirmed && items.length > 0 && !isCheckingOut && (
            <div className="pt-4 border-t border-amber-900/30 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Subtotal</span>
                <span className="font-mono text-base font-semibold text-amber-100 tabular-nums">
                  ${subtotal} USD
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Complimentary worldwide insured shipping on orders over $150.
              </p>
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3 px-4 bg-amber-300 hover:bg-amber-200 text-slate-950 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
