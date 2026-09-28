import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, Sparkles, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { MetalFinish, Product } from '../types';
import { PRODUCTS } from '../data/products';

export const ProductDetailModal: React.FC = () => {
  const {
    activeProductModal,
    closeProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openProductDetail,
    setIsCheckoutOpen
  } = useShop();

  const product = activeProductModal;

  const [selectedMetal, setSelectedMetal] = useState<MetalFinish>('18k White Gold');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageTab, setActiveImageTab] = useState<'primary' | 'secondary'>('primary');

  if (!product) return null;

  const wishlisted = isInWishlist(product.id);
  const complementary = PRODUCTS.find((p) => p.id === product.complementaryProductId) || PRODUCTS[1];

  const handleAddToCart = () => {
    addToCart(product, selectedMetal, selectedSize || (product.sizes ? product.sizes[0] : undefined), quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedMetal, selectedSize || (product.sizes ? product.sizes[0] : undefined), quantity);
    closeProductDetail();
    setIsCheckoutOpen(true);
  };

  const currentImage = activeImageTab === 'primary' ? product.image : (product.secondaryImage || product.image);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#070B14] border border-white/15 shadow-2xl my-auto overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={closeProductDetail}
          className="absolute top-4 right-4 z-30 p-2 bg-[#070B14]/80 text-[#94A3B8] hover:text-[#F8F9FA] border border-white/10 hover:border-white/30 transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-[#0B101E]/50 border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-between">
            
            {/* Main Stage */}
            <div className="relative aspect-square w-full bg-[#070B14] border border-white/10 overflow-hidden mb-4">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14]/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 left-4 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                  wishlisted
                    ? 'bg-[#D6B27C] text-[#070B14]'
                    : 'bg-[#070B14]/70 text-white hover:bg-[#070B14]'
                }`}
              >
                <Heart className="w-4 h-4 fill-current" />
              </button>
            </div>

            {/* Thumbnail switcher */}
            {product.secondaryImage && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveImageTab('primary')}
                  className={`w-16 h-16 border overflow-hidden transition-all ${
                    activeImageTab === 'primary' ? 'border-[#D6B27C]' : 'border-white/10 opacity-60'
                  }`}
                >
                  <img src={product.image} alt="Primary" className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => setActiveImageTab('secondary')}
                  className={`w-16 h-16 border overflow-hidden transition-all ${
                    activeImageTab === 'secondary' ? 'border-[#D6B27C]' : 'border-white/10 opacity-60'
                  }`}
                >
                  <img src={product.secondaryImage} alt="Alternate Angle" className="w-full h-full object-cover" />
                </button>
              </div>
            )}

            {/* Trust markers */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-2 gap-4 text-xs text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D6B27C]" />
                <span>Certificate of Authenticity</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D6B27C]" />
                <span>Armored White Glove Delivery</span>
              </div>
            </div>

          </div>

          {/* Right Column: Product Narrative & Contiguous Purchase Module */}
          <div className="lg:col-span-6 p-6 sm:p-10 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs text-[#94A3B8] font-light mb-1.5 tracking-wider">
                <span>{product.constellation}</span>
                <span aria-hidden="true" className="text-[#64748B]">·</span>
                <span>{product.moonPhase}</span>
                <span aria-hidden="true" className="text-[#64748B]">·</span>
                <span className="uppercase text-[#D6B27C]">{product.collection} Collection</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#F8F9FA] font-light tracking-wide">
                {product.name}
              </h2>

              <p className="font-mono text-2xl text-[#F8F9FA] tabular-nums font-normal mt-2">
                ${product.price.toLocaleString()}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#CBD5E1] font-light leading-relaxed">
              {product.description}
            </p>

            {/* Metal Finish Selector */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-[#64748B] block">
                Precious Metal Finish
              </span>
              <div className="flex flex-wrap gap-2">
                {product.availableMetals.map((metal) => (
                  <button
                    key={metal}
                    onClick={() => setSelectedMetal(metal)}
                    className={`px-3.5 py-1.5 text-xs tracking-wider uppercase transition-all ${
                      selectedMetal === metal
                        ? 'border border-[#D6B27C] text-[#D6B27C] bg-[#D6B27C]/10 font-medium'
                        : 'border border-white/10 text-[#94A3B8] hover:text-[#F8F9FA]'
                    }`}
                  >
                    {metal}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing Selector */}
            {product.sizes && (
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-[#64748B] block">
                  Select Dimension / Sizing
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1 text-xs tracking-wider transition-all ${
                        (selectedSize || product.sizes![0]) === s
                          ? 'border border-white text-white bg-white/10 font-medium'
                          : 'border border-white/10 text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Buy Buttons */}
            <div className="space-y-3 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-white/15 bg-[#0B101E]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-sm text-[#CBD5E1] hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-mono text-white tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-sm text-[#CBD5E1] hover:text-white"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-[#F8F9FA] hover:bg-[#D6B27C] text-[#070B14] transition-colors text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3 bg-[#D6B27C] hover:bg-[#E5C79A] text-[#070B14] transition-colors text-xs tracking-[0.2em] uppercase font-medium cursor-pointer"
              >
                Instant Atelier Checkout
              </button>
            </div>

            {/* Dedicated Editorial Section: "THE STORY BEHIND THE PIECE" */}
            <div className="pt-6 border-t border-white/[0.08] space-y-2">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6B27C] block font-light">
                The Story Behind the Piece
              </span>
              <p className="font-serif italic text-sm text-[#CBD5E1] leading-relaxed">
                &ldquo;{product.story}&rdquo;
              </p>
            </div>

            {/* Astrometric Specifications */}
            <div className="p-4 bg-[#0B101E] border border-white/[0.06] space-y-1.5 text-xs text-[#94A3B8]">
              <div className="flex justify-between">
                <span>Materials:</span>
                <span className="text-[#CBD5E1]">{product.materials}</span>
              </div>
              <div className="flex justify-between">
                <span>Dimensions:</span>
                <span className="text-[#CBD5E1]">{product.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span>Symbolism:</span>
                <span className="text-[#CBD5E1]">{product.symbolism}</span>
              </div>
            </div>

            {/* "COMPLETE YOUR CONSTELLATION" Recommended Complementary Piece */}
            {complementary && (
              <div className="pt-4 border-t border-white/[0.08]">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#D6B27C] block mb-2">
                  Complete Your Constellation
                </span>
                <div
                  onClick={() => openProductDetail(complementary)}
                  className="flex items-center gap-3 p-3 bg-[#0B101E] border border-white/10 hover:border-[#D6B27C]/40 transition-colors cursor-pointer group"
                >
                  <img
                    src={complementary.image}
                    alt={complementary.name}
                    className="w-12 h-12 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-serif text-[#F8F9FA] group-hover:text-[#D6B27C] truncate">
                      {complementary.name}
                    </h4>
                    <p className="font-mono text-[11px] text-[#94A3B8]">${complementary.price.toLocaleString()}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#D6B27C]" />
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
