import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    openProductDetail,
    setIsCheckoutOpen
  } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  if (!isCartOpen) return null;

  const discountAmount = promoApplied ? Math.round(cartSubtotal * 0.1) : 0;
  const finalTotal = cartSubtotal - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'LUNAR10' || promoCode.trim().toUpperCase() === 'CELUNE') {
      setPromoApplied(true);
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#070B14] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[#D6B27C]" />
              <h2 className="font-serif text-xl tracking-wider text-[#F8F9FA] font-light">
                Your Atelier Bag ({cartItems.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-[#94A3B8] hover:text-[#F8F9FA] p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-[#0B101E] border border-white/[0.08] space-y-3 relative group"
                  >
                    {/* Shared Sky Set Indicator */}
                    {item.isSharedSkySet && (
                      <div className="text-[9px] tracking-[0.2em] uppercase text-[#D6B27C] flex items-center gap-1.5 pb-2 border-b border-white/[0.06]">
                        <span>Your Shared Sky Set</span>
                        {item.sharedSkyNames && (
                          <span className="text-[#94A3B8]">
                            · {item.sharedSkyNames[0]} &amp; {item.sharedSkyNames[1]}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        onClick={() => {
                          setIsCartOpen(false);
                          openProductDetail(item.product);
                        }}
                        className="w-16 h-16 object-cover cursor-pointer flex-shrink-0 bg-[#070B14]"
                      />

                      <div className="flex-1 min-w-0">
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            openProductDetail(item.product);
                          }}
                          className="font-serif text-sm text-[#F8F9FA] truncate cursor-pointer hover:text-[#D6B27C]"
                        >
                          {item.product.name}
                        </h4>

                        <div className="text-[11px] text-[#64748B] mt-0.5 space-x-2">
                          <span>{item.selectedMetal}</span>
                          {item.selectedSize && <span>· {item.selectedSize}</span>}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-white/15 bg-[#070B14]">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-2 py-0.5 text-xs text-[#CBD5E1] hover:text-white"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 text-[11px] font-mono text-white tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-2 py-0.5 text-xs text-[#CBD5E1] hover:text-white"
                            >
                              +
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-[#F8F9FA] tabular-nums">
                              ${(item.product.price * item.quantity).toLocaleString()}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#64748B] hover:text-rose-400 p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Atelier code (Try: LUNAR10)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full bg-[#0B101E] border border-white/15 pl-9 pr-3 py-2 text-xs text-[#F8F9FA] placeholder:text-[#475569] uppercase focus:outline-none focus:border-[#D6B27C]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-2 border border-white/20 hover:border-[#D6B27C] text-xs text-[#CBD5E1] uppercase tracking-wider transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-[11px] text-[#D6B27C] mt-1.5 font-light">
                      ✦ 10% Lunar Atelier privilege applied
                    </p>
                  )}
                </form>
              </div>
            ) : (
              <div className="py-20 text-center text-[#64748B] space-y-3">
                <ShoppingBag className="w-8 h-8 text-[#64748B]/40 mx-auto" />
                <p className="font-serif text-lg text-[#94A3B8]">Your atelier bag is empty.</p>
                <p className="text-xs">Browse our signature lunar constellations to begin.</p>
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/[0.08] space-y-4 bg-[#0A101E]">
              <div className="space-y-1.5 text-xs text-[#94A3B8]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono text-white tabular-nums">${cartSubtotal.toLocaleString()}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-[#D6B27C]">
                    <span>Atelier Privilege (10%):</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Armored Delivery:</span>
                  <span className="text-[#D6B27C] uppercase tracking-wider text-[11px]">Complimentary</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/[0.06] text-sm text-white font-medium">
                  <span className="font-serif text-base">Estimated Total:</span>
                  <span className="font-mono text-base tabular-nums">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#D6B27C] hover:bg-[#E5C79A] text-[#070B14] transition-colors text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-black/40"
              >
                <span>Proceed to Private Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#64748B] uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D6B27C]" />
                <span>Global Insured Transit &amp; Atelier Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
