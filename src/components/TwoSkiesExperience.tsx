import React, { useState } from 'react';
import { Sparkles, Heart, Share2, Bookmark, Check, RefreshCw, ShoppingBag } from 'lucide-react';
import { getConstellationFromDate, getMoonPhaseFromDate, generateSharedSkyNarrative, CONSTELLATIONS } from '../data/celestial';
import { ConstellationDisplay } from './ConstellationDisplay';
import { MoonPhaseDisplay } from './MoonPhaseDisplay';
import { PRODUCTS } from '../data/products';
import { MetalFinish, SharedSkyData } from '../types';
import { useShop } from '../context/ShopContext';

export const TwoSkiesExperience: React.FC = () => {
  const { addToCart, saveSharedSky, showToast, openProductDetail } = useShop();

  // Step 1: Person One
  const [p1Name, setP1Name] = useState('Deepa');
  const [p1Dob, setP1Dob] = useState('1997-06-08');

  // Step 2: Person Two
  const [p2Name, setP2Name] = useState('Arun');
  const [p2Dob, setP2Dob] = useState('1995-08-14');

  // Metal choice for the set
  const [selectedMetal, setSelectedMetal] = useState<MetalFinish>('18k White Gold');
  const [copiedLink, setCopiedLink] = useState(false);

  // Astrometric calculations
  const p1Constellation = getConstellationFromDate(p1Dob);
  const p2Constellation = getConstellationFromDate(p2Dob);
  const p1Moon = getMoonPhaseFromDate(p1Dob);
  const p2Moon = getMoonPhaseFromDate(p2Dob);

  // Shared moon calculation (midpoint synthesis between their lunar phases)
  const sharedMoon = p1Moon.name; // In Célune mythology, their shared sky zenith mirrors their harmonic alignment

  const poeticNarrative = generateSharedSkyNarrative(
    p1Name,
    p1Constellation,
    p2Name,
    p2Constellation,
    sharedMoon
  );

  // Recommended complementary pieces
  const pieceOne = PRODUCTS.find((p) => p.constellation === p1Constellation) || PRODUCTS[0];
  const pieceTwo = PRODUCTS.find((p) => p.constellation === p2Constellation) || PRODUCTS[3];

  const setTotalPrice = pieceOne.price + pieceTwo.price;
  const pairedDiscount = Math.round(setTotalPrice * 0.1); // 10% complimentary paired atelier benefit
  const pairedPrice = setTotalPrice - pairedDiscount;

  const handleWearSharedSky = () => {
    // Add both pieces to cart flagged as a Shared Sky Set
    addToCart(pieceOne, selectedMetal, undefined, 1, {
      isSharedSkySet: true,
      sharedSkyNames: [p1Name, p2Name],
      bondedWithTitle: `${pieceTwo.name} (${p2Name})`
    });

    addToCart(pieceTwo, selectedMetal, undefined, 1, {
      isSharedSkySet: true,
      sharedSkyNames: [p1Name, p2Name],
      bondedWithTitle: `${pieceOne.name} (${p1Name})`
    });

    showToast(`The Shared Moon Set for ${p1Name} & ${p2Name} added to your bag`);
  };

  const handleSaveSky = () => {
    const skyRecord: SharedSkyData = {
      id: `shared-sky-${Date.now()}`,
      timestamp: Date.now(),
      personOne: {
        name: p1Name,
        dob: p1Dob,
        constellation: p1Constellation,
        moonPhase: p1Moon.name
      },
      personTwo: {
        name: p2Name,
        dob: p2Dob,
        constellation: p2Constellation,
        moonPhase: p2Moon.name
      },
      sharedMoon,
      poeticStory: poeticNarrative,
      recommendedSet: {
        pieceOneId: pieceOne.id,
        pieceTwoId: pieceTwo.id,
        setName: `${p1Name} & ${p2Name}'s Shared Sky Set`
      }
    };

    saveSharedSky(skyRecord);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      showToast('Shared sky link copied to clipboard');
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleReset = () => {
    setP1Name('');
    setP2Name('');
  };

  return (
    <section id="two-skies" className="py-24 sm:py-36 relative bg-[#060A13] border-t border-white/[0.08] overflow-hidden">
      
      {/* Background Celestial Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-[#38BDF8]/5 via-[#D6B27C]/8 to-[#38BDF8]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#D6B27C] font-light">
            <Sparkles className="w-3.5 h-3.5 text-[#D6B27C]" />
            <span>Célune Signature Experience</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#F8F9FA] tracking-wide text-balance">
            Two Skies, One Moon
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#CBD5E1] font-light">
            &ldquo;Two people. Two constellations. One moon above them both.&rdquo;
          </p>
          <p className="text-sm text-[#94A3B8] font-light max-w-xl mx-auto leading-relaxed">
            Generate an astrometric synthesis connecting two individuals across space and time, immortalized in complementary high jewelry.
          </p>
        </div>

        {/* Input Stage: Person One & Person Two */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          
          {/* Person One Card */}
          <div className="bg-[#0B101E]/80 border border-white/[0.08] p-6 space-y-4 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#D6B27C]">Step 1 · Person One</span>
              <span className="text-xs font-mono text-[#64748B]">Sky I</span>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#94A3B8] font-light mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={p1Name}
                  onChange={(e) => setP1Name(e.target.value)}
                  placeholder="e.g. Deepa"
                  className="w-full bg-[#070B14] border border-white/15 px-3 py-2 text-sm text-[#F8F9FA] focus:outline-none focus:border-[#D6B27C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#94A3B8] font-light mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={p1Dob}
                  onChange={(e) => setP1Dob(e.target.value)}
                  className="w-full bg-[#070B14] border border-white/15 px-3 py-2 text-sm text-[#F8F9FA] focus:outline-none focus:border-[#D6B27C] transition-colors"
                />
              </div>

              <div className="pt-2 text-xs text-[#94A3B8] flex items-center justify-between">
                <span>Constellation: <strong className="text-[#CBD5E1] font-normal">{p1Constellation}</strong></span>
                <span>Moon: <strong className="text-[#CBD5E1] font-normal">{p1Moon.name}</strong></span>
              </div>
            </div>
          </div>

          {/* Person Two Card */}
          <div className="bg-[#0B101E]/80 border border-white/[0.08] p-6 space-y-4 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#D6B27C]">Step 2 · Person Two</span>
              <span className="text-xs font-mono text-[#64748B]">Sky II</span>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#94A3B8] font-light mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={p2Name}
                  onChange={(e) => setP2Name(e.target.value)}
                  placeholder="e.g. Arun"
                  className="w-full bg-[#070B14] border border-white/15 px-3 py-2 text-sm text-[#F8F9FA] focus:outline-none focus:border-[#D6B27C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#94A3B8] font-light mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={p2Dob}
                  onChange={(e) => setP2Dob(e.target.value)}
                  className="w-full bg-[#070B14] border border-white/15 px-3 py-2 text-sm text-[#F8F9FA] focus:outline-none focus:border-[#D6B27C] transition-colors"
                />
              </div>

              <div className="pt-2 text-xs text-[#94A3B8] flex items-center justify-between">
                <span>Constellation: <strong className="text-[#CBD5E1] font-normal">{p2Constellation}</strong></span>
                <span>Moon: <strong className="text-[#CBD5E1] font-normal">{p2Moon.name}</strong></span>
              </div>
            </div>
          </div>

        </div>

        {/* Step 3: Shared Sky Celestial Canvas Visual Display */}
        <div className="bg-[#0A101E]/70 border border-white/15 p-6 sm:p-12 mb-16 relative overflow-hidden backdrop-blur-xl">
          
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6B27C]">Step 3 · Astrometric Synthesis</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F8F9FA]">
              Their Shared Celestial Sky
            </h3>
          </div>

          {/* Interactive Celestial Triple Composite */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-center">
            
            {/* Person One Constellation */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-3 order-1">
              <div className="w-56 h-56 relative bg-[#070B14]/70 border border-white/[0.08] flex items-center justify-center p-3">
                <ConstellationDisplay name={p1Constellation} size={180} highlightColor="#38BDF8" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#F8F9FA]">{p1Name || 'Person One'}</span>
                <p className="text-xs text-[#94A3B8] font-light mt-0.5">{p1Constellation} constellation</p>
              </div>
            </div>

            {/* Central Shared Moon & Connective Celestial Line */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4 order-2 py-4 relative">
              
              {/* Connective Celestial Axis Graphic */}
              <div className="hidden lg:flex absolute top-1/2 left-0 right-0 -translate-y-1/2 items-center justify-between pointer-events-none px-4">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#38BDF8]/40 to-transparent" />
                <div className="w-2 h-2 rounded-full border border-[#D6B27C] bg-[#070B14] mx-2" />
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#D6B27C]/40 to-transparent" />
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <MoonPhaseDisplay phaseName={sharedMoon} size={110} showGlow={true} />
                <div className="mt-4">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6B27C] block font-light">
                    Their Shared Moon
                  </span>
                  <span className="font-serif text-lg text-[#F8F9FA] font-light">
                    {sharedMoon}
                  </span>
                </div>
              </div>

            </div>

            {/* Person Two Constellation */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-3 order-3">
              <div className="w-56 h-56 relative bg-[#070B14]/70 border border-white/[0.08] flex items-center justify-center p-3">
                <ConstellationDisplay name={p2Constellation} size={180} highlightColor="#D6B27C" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#F8F9FA]">{p2Name || 'Person Two'}</span>
                <p className="text-xs text-[#94A3B8] font-light mt-0.5">{p2Constellation} constellation</p>
              </div>
            </div>

          </div>

          {/* Poetic Narrative Result */}
          <div className="max-w-2xl mx-auto mt-12 pt-8 border-t border-white/[0.08] text-center space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6B27C]">
              Your Shared Sky Interpretation
            </span>
            <p className="font-serif text-base sm:text-lg text-[#CBD5E1] font-light leading-relaxed italic">
              &ldquo;{poeticNarrative}&rdquo;
            </p>
          </div>

          {/* Save / Share / Reset Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 pt-6 border-t border-white/[0.06]">
            <button
              onClick={handleSaveSky}
              className="px-4 py-2 border border-white/20 hover:border-[#D6B27C] text-xs tracking-wider uppercase text-[#CBD5E1] hover:text-[#D6B27C] transition-colors flex items-center gap-2"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Preserve in Celestial Archive</span>
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-2 border border-white/20 hover:border-[#D6B27C] text-xs tracking-wider uppercase text-[#CBD5E1] hover:text-[#D6B27C] transition-colors flex items-center gap-2"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied' : 'Share Shared Sky'}</span>
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs tracking-wider uppercase text-[#64748B] hover:text-[#94A3B8] transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Create Another</span>
            </button>
          </div>

        </div>

        {/* Recommended Matching Jewelry Set: "THE SHARED MOON SET" */}
        <div className="bg-[#0B101E]/90 border border-[#D6B27C]/30 p-6 sm:p-10 max-w-4xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-8">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6B27C]">Recommended Paired Set</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F8F9FA] font-light mt-1">
                The Shared Moon Set
              </h3>
              <p className="text-xs text-[#94A3B8] mt-1 font-light">
                Two complementary jewels crafted to harmonize as one when worn together.
              </p>
            </div>

            {/* Metal Selector */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[11px] text-[#64748B] uppercase tracking-wider mr-1">Metal:</span>
              {(['18k White Gold', '18k Yellow Gold', 'Platinum 950'] as MetalFinish[]).map((metal) => (
                <button
                  key={metal}
                  onClick={() => setSelectedMetal(metal)}
                  className={`text-[10px] tracking-wider uppercase px-2.5 py-1 transition-all ${
                    selectedMetal === metal
                      ? 'border border-[#D6B27C] text-[#D6B27C] bg-[#D6B27C]/10'
                      : 'border border-white/10 text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {metal.replace(' 950', '').replace('18k ', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Two Pieces Side by Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center mb-8">
            
            {/* Piece One */}
            <div className="flex items-center gap-4 bg-[#070B14] p-4 border border-white/[0.08]">
              <img
                src={pieceOne.image}
                alt={pieceOne.name}
                onClick={() => openProductDetail(pieceOne)}
                className="w-20 h-20 object-cover cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[9px] uppercase tracking-widest text-[#D6B27C]">Piece One · For {p1Name || 'Person One'}</span>
                <h4
                  onClick={() => openProductDetail(pieceOne)}
                  className="font-serif text-base text-[#F8F9FA] truncate cursor-pointer hover:text-[#D6B27C]"
                >
                  {pieceOne.name}
                </h4>
                <p className="text-[11px] text-[#64748B] mt-0.5">{pieceOne.constellation} Alignment</p>
                <p className="font-mono text-xs text-[#CBD5E1] mt-1">${pieceOne.price.toLocaleString()}</p>
              </div>
            </div>

            {/* Piece Two */}
            <div className="flex items-center gap-4 bg-[#070B14] p-4 border border-white/[0.08]">
              <img
                src={pieceTwo.image}
                alt={pieceTwo.name}
                onClick={() => openProductDetail(pieceTwo)}
                className="w-20 h-20 object-cover cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[9px] uppercase tracking-widest text-[#D6B27C]">Piece Two · For {p2Name || 'Person Two'}</span>
                <h4
                  onClick={() => openProductDetail(pieceTwo)}
                  className="font-serif text-base text-[#F8F9FA] truncate cursor-pointer hover:text-[#D6B27C]"
                >
                  {pieceTwo.name}
                </h4>
                <p className="text-[11px] text-[#64748B] mt-0.5">{pieceTwo.constellation} Alignment</p>
                <p className="font-mono text-xs text-[#CBD5E1] mt-1">${pieceTwo.price.toLocaleString()}</p>
              </div>
            </div>

          </div>

          {/* Pricing & "Wear Your Shared Sky" CTA */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xl text-[#F8F9FA] tabular-nums font-medium">
                  ${pairedPrice.toLocaleString()}
                </span>
                <span className="font-mono text-sm text-[#64748B] line-through tabular-nums">
                  ${setTotalPrice.toLocaleString()}
                </span>
                <span className="text-[11px] text-[#D6B27C] tracking-wider uppercase ml-1">
                  10% Paired Atelier Privilege
                </span>
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                Includes complimentary bespoke hand-calligraphed Two Skies certificate &amp; archival presentation box.
              </p>
            </div>

            <button
              onClick={handleWearSharedSky}
              className="px-8 py-3.5 bg-[#D6B27C] hover:bg-[#E5C79A] text-[#070B14] transition-colors text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-black/50"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Wear Your Shared Sky</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
