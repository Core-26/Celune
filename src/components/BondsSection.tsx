import React, { useState } from 'react';
import { Sparkles, ArrowRight, Layers, Users, HeartHandshake } from 'lucide-react';
import { BONDS_IMAGE, WATER_IMAGE, ORION_IMAGE, HERO_IMAGE } from '../data/products';
import { useShop } from '../context/ShopContext';

export const BondsSection: React.FC = () => {
  const { setActiveView } = useShop();

  const [activeCategory, setActiveCategory] = useState<'couples' | 'siblings' | 'friends' | 'family'>('couples');

  const bondPairs = {
    couples: {
      title: 'Partner × Partner',
      tagline: 'Complementary Moon & Ocean',
      description: 'The Crescent Moon pendant paired with the Solitaire Wave ring—representing gravitation and the tide that answers its call.',
      concept: 'Crescent Moon + Full Moon',
      image1: HERO_IMAGE,
      image2: WATER_IMAGE,
      piece1: 'Orion Crescent Necklace',
      piece2: 'Leo Full Moon Ring',
      price: '$3,830'
    },
    siblings: {
      title: 'Sister × Sister / Brother × Sister',
      tagline: 'Twin Stars of Castor & Pollux',
      description: 'Two stars forged in the same celestial cloud, orbiting each other with unbreakable generational affinity.',
      concept: 'Two halves of one constellation',
      image1: BONDS_IMAGE,
      image2: ORION_IMAGE,
      piece1: 'Gemini Twin Stars Bracelet',
      piece2: 'Ursa Major Star Band',
      price: '$3,640'
    },
    friends: {
      title: 'Soul Friends & Deep Affinities',
      tagline: 'Star + Constellation Pattern',
      description: 'One piece carries the focal diamond star; the other traces the complete constellation line, locking into place when near.',
      concept: 'Star + Constellation',
      image1: ORION_IMAGE,
      image2: BONDS_IMAGE,
      piece1: 'Cassiopeia Star Necklace',
      piece2: 'Lyra Moon Bracelet',
      price: '$3,830'
    },
    family: {
      title: 'Parent & Child / Generational Bond',
      tagline: 'Tidal Memory & Pearl Sanctuary',
      description: 'An Akoya sea pearl cradled in water contours for the mother, complemented by a subtle diamond wave band for the daughter.',
      concept: 'Wave + Tide',
      image1: WATER_IMAGE,
      image2: HERO_IMAGE,
      piece1: 'Pisces Moon Pendant',
      piece2: 'Thalassa Wave Solitaire',
      price: '$3,770'
    }
  };

  const current = bondPairs[activeCategory];

  const handleLaunchBuilder = () => {
    const el = document.getElementById('bond-builder');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveView('bonds');
    }
  };

  return (
    <section id="bonds-section" className="py-24 sm:py-32 relative bg-[#070B14] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#D6B27C] font-light">
            <HeartHandshake className="w-3.5 h-3.5 text-[#D6B27C]" />
            <span>The Bonds Collection</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F8F9FA] tracking-wide text-balance">
            Some connections deserve their own constellation.
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] font-light leading-relaxed">
            True bonds are not identical; they are complementary. Discover paired creations designed around the dialogue of moonlight, ocean currents, and celestial harmonics.
          </p>
        </div>

        {/* Category Tabs (Interactive Filter Buttons - Complies with zero-pill rule: clean segmented styling) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {[
            { id: 'couples', label: 'Couples' },
            { id: 'siblings', label: 'Siblings' },
            { id: 'friends', label: 'Friends' },
            { id: 'family', label: 'Family' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-5 py-2 text-xs tracking-[0.18em] uppercase transition-all duration-300 ${
                activeCategory === tab.id
                  ? 'bg-[#F8F9FA] text-[#070B14] font-medium shadow-md'
                  : 'text-[#94A3B8] hover:text-[#F8F9FA] border border-white/10 hover:border-white/25'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bond Showcase Split Module */}
        <div className="bg-[#0B101E]/60 border border-white/[0.08] p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Visual Pair Comparison */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="relative aspect-[3/4] bg-[#070B14] border border-white/10 overflow-hidden group">
              <img
                src={current.image1}
                alt={current.piece1}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent opacity-75" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[9px] uppercase tracking-widest text-[#D6B27C] block">First Harmony</span>
                <p className="text-sm font-serif text-[#F8F9FA] truncate">{current.piece1}</p>
              </div>
            </div>

            <div className="relative aspect-[3/4] bg-[#070B14] border border-white/10 overflow-hidden group">
              <img
                src={current.image2}
                alt={current.piece2}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent opacity-75" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[9px] uppercase tracking-widest text-[#D6B27C] block">Second Harmony</span>
                <p className="text-sm font-serif text-[#F8F9FA] truncate">{current.piece2}</p>
              </div>
            </div>
          </div>

          {/* Description & Interactive CTA */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6B27C]">{current.tagline}</span>
              <h3 className="font-serif text-3xl text-[#F8F9FA] font-light mt-1">{current.title}</h3>
              <p className="text-xs text-[#CBD5E1] mt-2 font-mono tracking-wider">Concept: {current.concept}</p>
            </div>

            <p className="text-sm text-[#94A3B8] font-light leading-relaxed">
              {current.description}
            </p>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#64748B]">Set Valuation</span>
                <p className="font-mono text-lg text-[#F8F9FA] tabular-nums">{current.price}</p>
              </div>

              <button
                onClick={handleLaunchBuilder}
                className="px-6 py-3 bg-[#D6B27C] hover:bg-[#E5C79A] text-[#070B14] text-xs tracking-[0.18em] uppercase font-medium flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Customize Bond</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="pt-2 text-xs text-[#64748B] font-light flex items-center gap-4">
              <span>✦ Complementary Engravings</span>
              <span>✦ Paired Velvet Coffret</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
