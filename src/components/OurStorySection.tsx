import React from 'react';
import { HERO_IMAGE, WATER_IMAGE, ORION_IMAGE } from '../data/products';

export const OurStorySection: React.FC = () => {
  return (
    <section id="our-story" className="py-28 sm:py-36 relative bg-[#070B14] border-t border-white/[0.08]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#38BDF8]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Main Editorial Hero */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <span className="text-xs tracking-[0.25em] uppercase text-[#D6B27C] font-light">
            The Philosophy of Célune
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#F8F9FA] tracking-wide leading-tight text-balance">
            Born Between Moonlight and Water.
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-[#CBD5E1] font-light leading-relaxed">
            &ldquo;Jewelry can represent more than beauty — it can hold a phase of life, a quiet memory, or a connection written across the night sky.&rdquo;
          </p>
        </div>

        {/* Cinematic Image Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 aspect-[4/3] bg-[#0A101D] border border-white/10 overflow-hidden">
            <img
              src={WATER_IMAGE}
              alt="Célune tidal jewelry craftsmanship"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="md:col-span-5 space-y-4 text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#D6B27C]">Chapter I · Tidal Memory</span>
            <h3 className="font-serif text-2xl text-[#F8F9FA] font-light">The Pull of the Ocean</h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed">
              Before maps existed, voyagers navigated open seas by following the reflection of constellations cast upon undisturbed ocean waters. Water does not resist light; it receives it, bends it, and carries its image forward.
            </p>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed">
              At Célune, our forms borrow directly from this liquid dialogue: wave-contoured platinum bands, natural saltwater pearls, and precious stones set to catch the silver tilt of the moon.
            </p>
          </div>
        </div>

        {/* Three Central Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/[0.08]">
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#D6B27C]">01</span>
            <h4 className="font-serif text-xl text-[#F8F9FA]">Astrometric Rigor</h4>
            <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
              Every constellation motif is charted according to actual astronomical star charts. The pavé diamonds in our necklaces reflect the relative magnitude of individual stellar bodies.
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs text-[#D6B27C]">02</span>
            <h4 className="font-serif text-xl text-[#F8F9FA]">The Lunar Phase</h4>
            <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
              The moon is in constant motion, teaching us that beauty lies in transformation. Our pieces celebrate phases of transition—new beginnings, high tides of joy, and quiet introspection.
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs text-[#D6B27C]">03</span>
            <h4 className="font-serif text-xl text-[#F8F9FA]">Human Resonance</h4>
            <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
              Relationships are not isolated moments; they are constellations formed over time. Through our Bonds and Two Skies pieces, two individuals share a tangible touchpoint of their shared journey.
            </p>
          </div>
        </div>

        {/* Atelier Commitment Quote */}
        <div className="p-8 sm:p-12 bg-[#0B101E]/50 border border-white/[0.08] text-center max-w-2xl mx-auto space-y-4">
          <p className="font-serif text-xl sm:text-2xl text-[#CBD5E1] font-light italic leading-relaxed">
            &ldquo;We do not make jewelry for fleeting trends. We forge pieces meant to outlive generations, as timeless and unwavering as the stars above.&rdquo;
          </p>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#D6B27C]">
            — Atelier Célune, Master Jeweler Statement
          </p>
        </div>

      </div>
    </section>
  );
};
