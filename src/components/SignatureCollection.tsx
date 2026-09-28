import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

export const SignatureCollection: React.FC = () => {
  const { setActiveView, setActiveCollectionFilter } = useShop();

  // Signature items
  const signatureProducts = PRODUCTS.slice(0, 8);

  const handleViewAll = () => {
    setActiveCollectionFilter('constellations');
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="signature-collection" className="py-24 sm:py-32 relative bg-[#060912]">
      
      {/* Subtle background ambient beam */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#38BDF8]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#D6B27C]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/[0.08] pb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#D6B27C] font-light">
              <Sparkles className="w-3.5 h-3.5 text-[#D6B27C]" />
              <span>Exclusive Signature Vault</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F8F9FA] tracking-wide text-balance">
              The Lunar Constellation Collection
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] font-light leading-relaxed">
              Where celestial geometry intertwines with hand-sculpted curves of the moon. Each jewel is configured with certified natural diamonds mapping ancient stellar paths.
            </p>
          </div>

          <button
            onClick={handleViewAll}
            className="self-start md:self-end text-xs tracking-[0.2em] uppercase text-[#F8F9FA] hover:text-[#D6B27C] transition-colors flex items-center gap-2 pb-1 border-b border-[#D6B27C]/40 hover:border-[#D6B27C]"
          >
            <span>Explore All 12 Alignments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {signatureProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Storytelling Quote Banner */}
        <div className="mt-20 p-8 sm:p-12 border border-white/[0.08] bg-[#0A101E]/60 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <p className="font-serif italic text-xl sm:text-2xl text-[#E2E8F0] font-light leading-relaxed">
              &ldquo;The moon pulls the tides. The stars map the sky. Water remembers every movement. And some connections are written between them.&rdquo;
            </p>
            <p className="text-xs tracking-[0.25em] uppercase text-[#D6B27C]">
              — The Célune Philosophy
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D6B27C]/5 to-transparent pointer-events-none" />
        </div>

      </div>
    </section>
  );
};
