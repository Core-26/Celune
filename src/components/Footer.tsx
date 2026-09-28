import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setActiveView, setActiveCollectionFilter, showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showToast('You are now inscribed into the Lunar Gazette');
      setEmail('');
    }
  };

  const navigateTo = (view: string, colFilter?: string) => {
    if (colFilter) setActiveCollectionFilter(colFilter);
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05080E] text-[#CBD5E1] border-t border-white/[0.08] relative overflow-hidden">
      
      {/* Subtle top border glow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        
        {/* Newsletter Inscription Strip */}
        <div className="pb-16 mb-16 border-b border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6B27C]">
              Lunar Gazette &amp; Solstice Previews
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F8F9FA]">
              Stay beneath the same moon.
            </h3>
            <p className="text-xs text-[#94A3B8] font-light max-w-md">
              Receive private invitations to new constellation drops, lunar cycle reflections, and bespoke atelier appointments.
            </p>
          </div>

          <div className="lg:col-span-6">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex max-w-md lg:ml-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#0A101E] border border-white/15 px-4 py-3 text-xs text-[#F8F9FA] placeholder:text-[#475569] focus:outline-none focus:border-[#D6B27C] font-light"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#F8F9FA] text-[#070B14] hover:bg-[#D6B27C] text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-xs text-[#D6B27C] lg:justify-end">
                <Check className="w-4 h-4" />
                <span>You will receive private dispatches each new moon.</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <span className="font-serif text-2xl tracking-[0.25em] text-[#F8F9FA] font-light">
              CÉLUNE
            </span>
            <p className="font-serif italic text-sm text-[#94A3B8] leading-relaxed">
              &ldquo;Jewellery Written in the Stars.&rdquo;
            </p>
            <p className="text-xs text-[#64748B] font-light max-w-xs leading-relaxed">
              Fine celestial jewelry house inspired by lunar phases, ocean tides, constellations, and the deep emotional bonds that join us together.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs tracking-wider text-[#94A3B8]">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#D6B27C] transition-colors">
                Instagram
              </a>
              <span className="text-[#334155]">·</span>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-[#D6B27C] transition-colors">
                Pinterest
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1 md:col-span-3 space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6B27C] block font-light">
              Creations
            </span>
            <ul className="space-y-2 text-xs text-[#94A3B8] font-light">
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  Shop All Creations
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'constellations')} className="hover:text-white transition-colors">
                  The Lunar Constellation Collection
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('collections')} className="hover:text-white transition-colors">
                  The Four Pillars
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('bonds')} className="hover:text-white transition-colors">
                  Bonds &amp; Complementary Pairs
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('twoskies')} className="hover:text-white transition-colors">
                  Two Skies, One Moon
                </button>
              </li>
            </ul>
          </div>

          {/* Experiences & Brand */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6B27C] block font-light">
              Atelier
            </span>
            <ul className="space-y-2 text-xs text-[#94A3B8] font-light">
              <li>
                <button onClick={() => navigateTo('constellations')} className="hover:text-white transition-colors">
                  Discover Your Sky
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('story')} className="hover:text-white transition-colors">
                  Our Story &amp; Origin
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('journal')} className="hover:text-white transition-colors">
                  The Celestial Journal
                </button>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); showToast('Private atelier salon: Paris, Place Vendôme & Geneva'); }} className="hover:text-white transition-colors">
                  Private Salon
                </a>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="col-span-2 md:col-span-3 space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#D6B27C] block font-light">
              Client Concierge
            </span>
            <ul className="space-y-2 text-xs text-[#94A3B8] font-light">
              <li>
                <span className="text-[#64748B]">Complimentary Armored Courier Delivery</span>
              </li>
              <li>
                <span className="text-[#64748B]">30-Day Solstice Exchange Privilege</span>
              </li>
              <li>
                <span className="text-[#64748B]">Lifetime Diamond &amp; Pearl Warranty</span>
              </li>
              <li>
                <span className="text-[#64748B]">Bespoke Astrometric Engraving</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Baseline Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B] font-light">
          <p>© {new Date().getFullYear()} Célune Haute Joaillerie. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); showToast('Privacy Policy: All client astrometric charts remain encrypted and private.'); }} className="hover:text-[#94A3B8]">Privacy</a>
            <span>·</span>
            <a href="#terms" onClick={(e) => { e.preventDefault(); showToast('Terms of Atelier Service: Ethical metals & Kimberley Process certified diamonds.'); }} className="hover:text-[#94A3B8]">Terms</a>
            <span>·</span>
            <a href="#shipping" onClick={(e) => { e.preventDefault(); showToast('Worldwide armored insured shipping provided complimentary.'); }} className="hover:text-[#94A3B8]">Shipping</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
