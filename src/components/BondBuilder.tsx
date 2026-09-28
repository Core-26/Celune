import React, { useState } from 'react';
import { Layers, Sparkles, Check, ShoppingBag, RefreshCw } from 'lucide-react';
import { PRODUCTS, HERO_IMAGE, ORION_IMAGE, BONDS_IMAGE, WATER_IMAGE } from '../data/products';
import { Product, MetalFinish } from '../types';
import { useShop } from '../context/ShopContext';

export const BondBuilder: React.FC = () => {
  const { addToCart, showToast } = useShop();

  const [relationship, setRelationship] = useState('Couple');
  const [theme, setTheme] = useState('Moon');
  
  const [piece1Type, setPiece1Type] = useState<'necklace' | 'bracelet' | 'ring' | 'pendant'>('necklace');
  const [piece2Type, setPiece2Type] = useState<'necklace' | 'bracelet' | 'ring' | 'pendant'>('ring');
  
  const [metal1, setMetal1] = useState<MetalFinish>('18k White Gold');
  const [metal2, setMetal2] = useState<MetalFinish>('18k White Gold');

  const [engraving1, setEngraving1] = useState('Until the stars align');
  const [engraving2, setEngraving2] = useState('Beneath one moon');

  // Select appropriate products based on theme and type
  const piece1Product: Product = PRODUCTS.find(
    (p) => p.category === piece1Type
  ) || PRODUCTS[0];

  const piece2Product: Product = PRODUCTS.find(
    (p) => p.category === piece2Type && p.id !== piece1Product.id
  ) || PRODUCTS[3];

  const combinedPrice = piece1Product.price + piece2Product.price;
  const pairedDiscount = Math.round(combinedPrice * 0.1);
  const finalPrice = combinedPrice - pairedDiscount;

  const handleAddPairToCart = () => {
    addToCart(piece1Product, metal1, undefined, 1, {
      isSharedSkySet: true,
      bondedWithTitle: `${piece2Product.name} (${relationship} set)`
    });

    addToCart(piece2Product, metal2, undefined, 1, {
      isSharedSkySet: true,
      bondedWithTitle: `${piece1Product.name} (${relationship} set)`
    });

    showToast(`Custom ${relationship} Bond Set added to your collection`);
  };

  return (
    <section id="bond-builder" className="py-24 sm:py-32 relative bg-[#060912] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#D6B27C] font-light">
            <Layers className="w-3.5 h-3.5 text-[#D6B27C]" />
            <span>Atelier Configurator</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F8F9FA] tracking-wide text-balance">
            Interactive Bond Builder
          </h2>
          <p className="text-sm text-[#94A3B8] font-light leading-relaxed">
            Compose your own complementary pairing. Select the bond you honor, the cosmic theme that anchors it, and the silhouettes that speak to both souls.
          </p>
        </div>

        {/* Builder Container */}
        <div className="bg-[#0B101E]/80 border border-white/10 p-6 sm:p-10 backdrop-blur-md">
          
          {/* Controls Bar: Relationship & Theme */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/[0.08] pb-8 mb-8">
            
            {/* Step 1: Relationship */}
            <div className="space-y-3">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6B27C]">1. Select Relationship</span>
              <div className="grid grid-cols-3 gap-2">
                {['Couple', 'Siblings', 'Friends', 'Parent & Child', 'Family', 'Custom'].map((rel) => (
                  <button
                    key={rel}
                    onClick={() => setRelationship(rel)}
                    className={`px-3 py-2 text-xs tracking-wider uppercase transition-all ${
                      relationship === rel
                        ? 'bg-[#F8F9FA] text-[#070B14] font-medium'
                        : 'bg-[#070B14] text-[#94A3B8] border border-white/10 hover:border-[#D6B27C]/40'
                    }`}
                  >
                    {rel}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Theme */}
            <div className="space-y-3">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6B27C]">2. Select Cosmic Motif</span>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {['Moon', 'Stars', 'Water', 'Constellation', 'Tides'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-3 py-2 text-xs tracking-wider uppercase transition-all ${
                      theme === t
                        ? 'bg-[#D6B27C] text-[#070B14] font-medium'
                        : 'bg-[#070B14] text-[#94A3B8] border border-white/10 hover:border-[#D6B27C]/40'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Dual Side-by-Side Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-10">
            
            {/* Piece One Config */}
            <div className="bg-[#070B14] border border-white/[0.08] p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D6B27C]">
                  Piece One ({relationship} I)
                </span>
                <span className="text-xs text-[#94A3B8]">{piece1Product.name}</span>
              </div>

              {/* Jewelry Type Selector */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#64748B] block mb-2">Jewelry Silhouette</span>
                <div className="grid grid-cols-4 gap-2">
                  {(['necklace', 'bracelet', 'ring', 'pendant'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setPiece1Type(type)}
                      className={`py-1.5 text-[11px] tracking-wider uppercase ${
                        piece1Type === type
                          ? 'border border-[#D6B27C] text-[#D6B27C] bg-[#D6B27C]/10 font-medium'
                          : 'border border-white/10 text-[#94A3B8]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Preview */}
              <div className="relative aspect-[4/3] bg-[#0A101E] border border-white/10 overflow-hidden">
                <img
                  src={piece1Product.image}
                  alt={piece1Product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-3 text-xs font-mono text-[#CBD5E1]">
                  ${piece1Product.price.toLocaleString()}
                </div>
              </div>

              {/* Metal Finish */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#64748B]">Precious Metal</span>
                <select
                  value={metal1}
                  onChange={(e) => setMetal1(e.target.value as MetalFinish)}
                  className="w-full bg-[#0B101E] border border-white/15 text-xs text-[#CBD5E1] p-2 focus:outline-none focus:border-[#D6B27C]"
                >
                  <option value="18k White Gold">18k White Gold</option>
                  <option value="18k Yellow Gold">18k Yellow Gold</option>
                  <option value="18k Rose Gold">18k Rose Gold</option>
                  <option value="Platinum 950">Platinum 950</option>
                </select>
              </div>

              {/* Optional Engraving */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#64748B]">Bespoke Engraving (Optional)</span>
                <input
                  type="text"
                  value={engraving1}
                  onChange={(e) => setEngraving1(e.target.value)}
                  maxLength={24}
                  className="w-full bg-[#0B101E] border border-white/15 text-xs text-[#CBD5E1] px-3 py-2 focus:outline-none focus:border-[#D6B27C]"
                />
              </div>
            </div>

            {/* Piece Two Config */}
            <div className="bg-[#070B14] border border-white/[0.08] p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D6B27C]">
                  Piece Two ({relationship} II)
                </span>
                <span className="text-xs text-[#94A3B8]">{piece2Product.name}</span>
              </div>

              {/* Jewelry Type Selector */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#64748B] block mb-2">Jewelry Silhouette</span>
                <div className="grid grid-cols-4 gap-2">
                  {(['necklace', 'bracelet', 'ring', 'pendant'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setPiece2Type(type)}
                      className={`py-1.5 text-[11px] tracking-wider uppercase ${
                        piece2Type === type
                          ? 'border border-[#D6B27C] text-[#D6B27C] bg-[#D6B27C]/10 font-medium'
                          : 'border border-white/10 text-[#94A3B8]'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Preview */}
              <div className="relative aspect-[4/3] bg-[#0A101E] border border-white/10 overflow-hidden">
                <img
                  src={piece2Product.image}
                  alt={piece2Product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-3 text-xs font-mono text-[#CBD5E1]">
                  ${piece2Product.price.toLocaleString()}
                </div>
              </div>

              {/* Metal Finish */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#64748B]">Precious Metal</span>
                <select
                  value={metal2}
                  onChange={(e) => setMetal2(e.target.value as MetalFinish)}
                  className="w-full bg-[#0B101E] border border-white/15 text-xs text-[#CBD5E1] p-2 focus:outline-none focus:border-[#D6B27C]"
                >
                  <option value="18k White Gold">18k White Gold</option>
                  <option value="18k Yellow Gold">18k Yellow Gold</option>
                  <option value="18k Rose Gold">18k Rose Gold</option>
                  <option value="Platinum 950">Platinum 950</option>
                </select>
              </div>

              {/* Optional Engraving */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider text-[#64748B]">Bespoke Engraving (Optional)</span>
                <input
                  type="text"
                  value={engraving2}
                  onChange={(e) => setEngraving2(e.target.value)}
                  maxLength={24}
                  className="w-full bg-[#0B101E] border border-white/15 text-xs text-[#CBD5E1] px-3 py-2 focus:outline-none focus:border-[#D6B27C]"
                />
              </div>
            </div>

          </div>

          {/* Builder Summary & Action Bar */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs text-[#94A3B8]">
                Customized {relationship} Set · Concept: {theme} Harmony
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-2xl text-[#F8F9FA] tabular-nums font-medium">
                  ${finalPrice.toLocaleString()}
                </span>
                <span className="font-mono text-sm text-[#64748B] line-through tabular-nums">
                  ${combinedPrice.toLocaleString()}
                </span>
                <span className="text-[11px] text-[#D6B27C] uppercase tracking-wider">
                  Includes 10% Paired Privilege
                </span>
              </div>
            </div>

            <button
              onClick={handleAddPairToCart}
              className="px-8 py-3.5 bg-[#D6B27C] hover:bg-[#E5C79A] text-[#070B14] transition-colors text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-black/40"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Custom Bond Set to Bag</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
