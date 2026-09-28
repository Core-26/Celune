import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FEATURED_COLLECTIONS } from '../data/products';
import { useShop } from '../context/ShopContext';

export const FeaturedCollections: React.FC = () => {
  const { setActiveView, setActiveCollectionFilter } = useShop();

  const handleSelectCollection = (collectionId: string) => {
    setActiveCollectionFilter(collectionId);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 sm:py-32 relative bg-[#070B14] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <p className="text-xs tracking-[0.25em] uppercase text-[#D6B27C] font-light">
            The Four Pillars of Célune
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F8F9FA] tracking-wide">
            Curated Collections
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] font-light leading-relaxed">
            Inspired by the ceaseless celestial rhythms above and the silent, gravitational pull of ocean tides below.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {FEATURED_COLLECTIONS.map((col, index) => (
            <div
              key={col.id}
              onClick={() => handleSelectCollection(col.id)}
              className="group relative cursor-pointer flex flex-col justify-between border border-white/[0.08] hover:border-[#D6B27C]/50 transition-all duration-700 bg-[#0B101E]/60 p-5 overflow-hidden"
            >
              {/* Subtle top index indicator */}
              <div className="flex items-center justify-between text-xs text-[#64748B] mb-4">
                <span className="font-mono text-[11px] tracking-wider">0{index + 1}</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#94A3B8]">{col.tag}</span>
              </div>

              {/* Image Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#070B14] mb-6">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-108 filter brightness-95 group-hover:brightness-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B101E] via-transparent to-transparent opacity-80" />
              </div>

              {/* Text Content */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-light text-[#F8F9FA] tracking-wider group-hover:text-[#D6B27C] transition-colors">
                    {col.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#CBD5E1] group-hover:border-[#D6B27C] group-hover:text-[#D6B27C] transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
                  {col.description}
                </p>
              </div>

              {/* Bottom Subtle Golden Horizon Line */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D6B27C]/0 to-transparent group-hover:via-[#D6B27C]/60 transition-all duration-700" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
