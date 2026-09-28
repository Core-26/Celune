import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlistIds,
    toggleWishlist,
    addToCart,
    openProductDetail,
    savedConstellation,
    savedSharedSkies
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#070B14] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#D6B27C]" />
              <h2 className="font-serif text-xl tracking-wider text-[#F8F9FA] font-light">
                Saved Constellations
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="text-[#94A3B8] hover:text-[#F8F9FA] p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Tabs or Item Lists */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Saved Pieces List */}
            {wishlistedProducts.length > 0 ? (
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-widest text-[#D6B27C] block">
                  Saved Pieces ({wishlistedProducts.length})
                </span>

                {wishlistedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3 bg-[#0B101E] border border-white/[0.06] hover:border-white/20 transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() => {
                        setIsWishlistOpen(false);
                        openProductDetail(product);
                      }}
                      className="w-16 h-16 object-cover cursor-pointer flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4
                        onClick={() => {
                          setIsWishlistOpen(false);
                          openProductDetail(product);
                        }}
                        className="font-serif text-sm text-[#F8F9FA] truncate cursor-pointer hover:text-[#D6B27C]"
                      >
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#64748B]">{product.constellation} · {product.moonPhase}</p>
                      <p className="font-mono text-xs text-[#CBD5E1] mt-1">${product.price.toLocaleString()}</p>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => {
                            addToCart(product);
                            toggleWishlist(product.id);
                          }}
                          className="text-[10px] tracking-wider uppercase text-[#D6B27C] hover:text-[#F8F9FA] font-medium"
                        >
                          Move to Bag
                        </button>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-[10px] tracking-wider uppercase text-[#64748B] hover:text-rose-400"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-[#64748B] space-y-2">
                <p className="font-serif text-lg text-[#94A3B8]">No jewels saved yet.</p>
                <p className="text-xs">Click the heart icon on any celestial piece to preserve it here.</p>
              </div>
            )}

            {/* Saved Constellation Badge */}
            {savedConstellation && (
              <div className="p-4 bg-[#0A101E] border border-[#D6B27C]/20 space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-[#D6B27C]">Natal Alignment</span>
                <p className="font-serif text-base text-[#F8F9FA]">
                  {savedConstellation.name}&rsquo;s {savedConstellation.constellation}
                </p>
                <p className="text-xs text-[#94A3B8]">Moon: {savedConstellation.moonPhase}</p>
              </div>
            )}

            {/* Saved Shared Skies preview */}
            {savedSharedSkies.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#D6B27C] block">
                  Preserved Shared Skies ({savedSharedSkies.length})
                </span>
                {savedSharedSkies.map((sky) => (
                  <div key={sky.id} className="p-3 bg-[#0B101E] border border-white/[0.06] text-xs">
                    <p className="text-[#F8F9FA] font-serif">
                      {sky.personOne.name} ({sky.personOne.constellation}) ✦ {sky.personTwo.name} ({sky.personTwo.constellation})
                    </p>
                    <p className="text-[#64748B] text-[11px] mt-0.5">Shared Moon: {sky.sharedMoon}</p>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/[0.08]">
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-full py-3 bg-[#F8F9FA] text-[#070B14] hover:bg-[#D6B27C] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer"
            >
              Continue Exploring
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
