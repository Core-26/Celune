import React, { useState } from 'react';
import { Compass, Sparkles, Bookmark, ShoppingBag, ArrowRight } from 'lucide-react';
import { getConstellationFromDate, getMoonPhaseFromDate, CONSTELLATIONS } from '../data/celestial';
import { ConstellationDisplay } from './ConstellationDisplay';
import { MoonPhaseDisplay } from './MoonPhaseDisplay';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';

export const ConstellationExperience: React.FC = () => {
  const { addToCart, saveUserConstellation, openProductDetail } = useShop();

  const [name, setName] = useState('');
  const [dob, setDob] = useState('1998-05-18');
  const [birthTime, setBirthTime] = useState('21:45');
  const [birthLocation, setBirthLocation] = useState('Paris, France');
  const [hasCalculated, setHasCalculated] = useState(true);

  // Compute calculated values
  const currentConstellationName = getConstellationFromDate(dob);
  const moonInfo = getMoonPhaseFromDate(dob);
  const constellationData = CONSTELLATIONS[currentConstellationName] || CONSTELLATIONS['Orion'];

  // Matching pieces
  const recommendedPiece = PRODUCTS.find((p) => p.constellation === currentConstellationName) || PRODUCTS[0];
  const matchingPiece = PRODUCTS.find((p) => p.id === recommendedPiece.complementaryProductId) || PRODUCTS[1];

  const handleSaveToArchive = () => {
    saveUserConstellation({
      name: name || 'Seeker',
      dob,
      constellation: currentConstellationName,
      moonPhase: moonInfo.name,
      symbolism: constellationData.symbolism,
      dateCalculated: new Date().toISOString()
    });
  };

  return (
    <section id="constellation-experience" className="py-24 sm:py-32 relative bg-[#070B14] border-t border-white/[0.08] overflow-hidden">
      
      {/* Background Star Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#D6B27C] font-light">
            <Compass className="w-3.5 h-3.5 text-[#D6B27C]" />
            <span>Interactive Astrometry</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#F8F9FA] tracking-wide text-balance">
            Find the piece written for your sky.
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] font-light leading-relaxed">
            Enter the moment you arrived beneath the celestial canopy to reveal the constellation and lunar phase that silently guides your journey.
          </p>
        </div>

        {/* Two-Column Experience Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Input Panel (Form) */}
          <div className="lg:col-span-5 bg-[#0B101E]/80 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md">
            <div className="space-y-6">
              <div className="border-b border-white/[0.08] pb-4">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#64748B]">Personal Astrometric Data</span>
                <h3 className="font-serif text-2xl text-[#F8F9FA] font-light mt-1">Celestial Coordinates</h3>
              </div>

              {/* Form Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-[#94A3B8] font-light mb-1.5">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Eleanor"
                    className="w-full bg-[#070B14] border border-white/15 px-3.5 py-2.5 text-sm text-[#F8F9FA] placeholder:text-[#475569] focus:outline-none focus:border-[#D6B27C] transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-wider uppercase text-[#94A3B8] font-light mb-1.5">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => {
                      setDob(e.target.value);
                      setHasCalculated(true);
                    }}
                    className="w-full bg-[#070B14] border border-white/15 px-3.5 py-2.5 text-sm text-[#F8F9FA] focus:outline-none focus:border-[#D6B27C] transition-colors font-light"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs tracking-wider uppercase text-[#94A3B8] font-light mb-1.5">
                      Birth Time (Optional)
                    </label>
                    <input
                      type="time"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="w-full bg-[#070B14] border border-white/15 px-3 py-2 text-sm text-[#F8F9FA] focus:outline-none focus:border-[#D6B27C] transition-colors font-light"
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-wider uppercase text-[#94A3B8] font-light mb-1.5">
                      Birth Location
                    </label>
                    <input
                      type="text"
                      value={birthLocation}
                      onChange={(e) => setBirthLocation(e.target.value)}
                      placeholder="e.g. London, UK"
                      className="w-full bg-[#070B14] border border-white/15 px-3 py-2 text-sm text-[#F8F9FA] placeholder:text-[#475569] focus:outline-none focus:border-[#D6B27C] transition-colors font-light"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-3">
              <button
                onClick={handleSaveToArchive}
                className="w-full py-3 border border-[#D6B27C]/40 hover:border-[#D6B27C] bg-[#D6B27C]/10 hover:bg-[#D6B27C]/20 text-[#D6B27C] transition-colors text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-2"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save to Celestial Archive</span>
              </button>
              
              <p className="text-[11px] text-[#64748B] text-center font-light">
                Stored privately in your Celestial Archive for custom bespoke pieces.
              </p>
            </div>
          </div>

          {/* Interactive Celestial Display Panel */}
          <div className="lg:col-span-7 bg-[#0B101E]/40 border border-white/[0.08] p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            
            {/* Visual Sky & Moon Presentation */}
            <div className="relative z-10 space-y-8">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/[0.08] pb-6">
                <div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6B27C]">Your Sky Blueprint</span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#F8F9FA] font-light mt-1">
                    {constellationData.name} <span className="text-xl sm:text-2xl text-[#94A3B8] font-normal italic">({constellationData.latinName})</span>
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1 font-light">
                    Element: <span className="text-[#CBD5E1]">{constellationData.element}</span> · Season of Peak Visibility: <span className="text-[#CBD5E1]">{constellationData.season}</span>
                  </p>
                </div>

                {/* Moon Phase Badge */}
                <div className="flex items-center gap-3 bg-[#070B14]/80 px-4 py-2 border border-white/10 self-start sm:self-auto">
                  <MoonPhaseDisplay phaseName={moonInfo.name} size={42} showGlow={false} />
                  <div>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-[#94A3B8] block">Your Moon</span>
                    <span className="text-xs font-medium text-[#F8F9FA]">{moonInfo.name}</span>
                  </div>
                </div>
              </div>

              {/* Sky Art & Constellation Canvas Centerpiece */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-6 flex justify-center py-4 bg-[#070B14]/60 border border-white/[0.05] relative rounded-none overflow-hidden">
                  <ConstellationDisplay name={currentConstellationName} size={240} highlightColor="#D6B27C" />
                  <span className="absolute bottom-3 text-[10px] tracking-[0.2em] uppercase text-[#64748B]">
                    Constellation of {constellationData.name}
                  </span>
                </div>

                <div className="md:col-span-6 space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#D6B27C]">Celestial Symbolism</span>
                    <p className="text-sm text-[#CBD5E1] font-light leading-relaxed">
                      {constellationData.symbolism}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#D6B27C]">Tidal Resonance</span>
                    <p className="text-xs italic font-serif text-[#94A3B8] leading-relaxed">
                      &ldquo;{constellationData.poeticNote}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Personalized Recommended Célune Piece */}
              <div className="pt-6 border-t border-white/[0.08]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs tracking-[0.2em] uppercase text-[#D6B27C]">
                    Your Written Célune Jewels
                  </span>
                  <span className="text-[11px] text-[#64748B]">Harmonized with your natal sky</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Primary Recommendation */}
                  <div className="flex items-center gap-3.5 bg-[#070B14] border border-white/10 p-3 group hover:border-[#D6B27C]/40 transition-all">
                    <img
                      src={recommendedPiece.image}
                      alt={recommendedPiece.name}
                      className="w-16 h-16 object-cover cursor-pointer flex-shrink-0"
                      onClick={() => openProductDetail(recommendedPiece)}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase tracking-wider text-[#D6B27C] block truncate">Direct Alignment</span>
                      <h4
                        onClick={() => openProductDetail(recommendedPiece)}
                        className="text-sm font-serif text-[#F8F9FA] truncate cursor-pointer hover:text-[#D6B27C]"
                      >
                        {recommendedPiece.name}
                      </h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-mono text-[#CBD5E1]">${recommendedPiece.price.toLocaleString()}</span>
                        <button
                          onClick={() => addToCart(recommendedPiece)}
                          className="text-[10px] tracking-wider uppercase text-[#D6B27C] hover:text-[#F8F9FA] font-medium"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Matching Pair Piece */}
                  <div className="flex items-center gap-3.5 bg-[#070B14] border border-white/10 p-3 group hover:border-[#D6B27C]/40 transition-all">
                    <img
                      src={matchingPiece.image}
                      alt={matchingPiece.name}
                      className="w-16 h-16 object-cover cursor-pointer flex-shrink-0"
                      onClick={() => openProductDetail(matchingPiece)}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] uppercase tracking-wider text-[#94A3B8] block truncate">Complementary Resonance</span>
                      <h4
                        onClick={() => openProductDetail(matchingPiece)}
                        className="text-sm font-serif text-[#F8F9FA] truncate cursor-pointer hover:text-[#D6B27C]"
                      >
                        {matchingPiece.name}
                      </h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-mono text-[#CBD5E1]">${matchingPiece.price.toLocaleString()}</span>
                        <button
                          onClick={() => addToCart(matchingPiece)}
                          className="text-[10px] tracking-wider uppercase text-[#D6B27C] hover:text-[#F8F9FA] font-medium"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
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
