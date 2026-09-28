import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';
import { StarCanvas } from './StarCanvas';
import { useShop } from '../context/ShopContext';

export const HeroSection: React.FC = () => {
  const { setActiveView } = useShop();

  const scrollToConstellation = () => {
    const el = document.getElementById('constellation-experience');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveView('constellations');
    }
  };

  const scrollToSignature = () => {
    const el = document.getElementById('signature-collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveView('shop');
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Star & Water Canvas */}
      <StarCanvas showWaterRipples={true} />

      {/* Atmospheric Radial Lunar Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#38BDF8]/10 via-[#D6B27C]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Typography & Call to Action */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#D6B27C] font-light">
              <span>Haute Joaillerie Céleste</span>
              <span className="w-8 h-[1px] bg-[#D6B27C]/40" />
              <span>Paris &amp; Geneva</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-light tracking-wide text-[#F8F9FA] leading-[1.1] text-balance">
              Jewellery Written in the Stars.
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Where moonlight meets water, and every connection finds its constellation. Hand-sculpted precious metals infused with astrometric precision and tidal memory.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={scrollToSignature}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#F8F9FA] text-[#070B14] hover:bg-[#D6B27C] transition-colors duration-300 text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-3 shadow-xl shadow-black/40 cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToConstellation}
                className="w-full sm:w-auto px-8 py-3.5 border border-white/20 hover:border-[#D6B27C] text-[#F8F9FA] hover:text-[#D6B27C] transition-colors duration-300 text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-3 bg-[#070B14]/40 backdrop-blur-sm cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#D6B27C]" />
                <span>Discover Your Constellation</span>
              </button>
            </div>

            {/* Quiet Subtle Quality Mark */}
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-white/[0.08] max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-xs tracking-[0.14em] text-[#CBD5E1] font-light">18k &amp; 950 Platinum</p>
                <p className="text-[11px] text-[#64748B] mt-0.5">Recycled precious metals</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.14em] text-[#CBD5E1] font-light">Astrometric Pavé</p>
                <p className="text-[11px] text-[#64748B] mt-0.5">Microscope set diamonds</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.14em] text-[#CBD5E1] font-light">Tidal Pearl Harvest</p>
                <p className="text-[11px] text-[#64748B] mt-0.5">Sustainable Akoya &amp; South Sea</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Cinematic Product Artwork */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] sm:aspect-[4/5]">
              {/* Moonlit halo backdrop */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#38BDF8]/10 via-[#D6B27C]/15 to-transparent blur-2xl transform scale-95 animate-pulse" />

              {/* Product Frame */}
              <div className="relative h-full w-full border border-white/15 bg-[#0A101D]/70 backdrop-blur-md overflow-hidden p-3 shadow-2xl shadow-black/80 group">
                <div className="relative w-full h-full overflow-hidden bg-[#070B14]">
                  <img
                    src={HERO_IMAGE}
                    alt="Célune Celestial Moonlit Pendant"
                    className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle water caustics overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent opacity-60" />
                  
                  {/* Caption badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-left">
                    <div>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#D6B27C]">Signature Motif</span>
                      <p className="font-serif text-lg text-[#F8F9FA] leading-tight">The Lunar Crescent Lariat</p>
                    </div>
                    <span className="text-xs font-mono tracking-wider text-[#CBD5E1] tabular-nums">$1,850</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
