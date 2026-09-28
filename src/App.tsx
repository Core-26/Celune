/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedCollections } from './components/FeaturedCollections';
import { SignatureCollection } from './components/SignatureCollection';
import { ConstellationExperience } from './components/ConstellationExperience';
import { TwoSkiesExperience } from './components/TwoSkiesExperience';
import { BondsSection } from './components/BondsSection';
import { BondBuilder } from './components/BondBuilder';
import { ShopCatalog } from './components/ShopCatalog';
import { OurStorySection } from './components/OurStorySection';
import { JournalSection } from './components/JournalSection';
import { Footer } from './components/Footer';

// Drawers & Modals
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { UserAccountModal } from './components/UserAccountModal';
import { QuizModal } from './components/QuizModal';
import { CeluneConciergeChat } from './components/CeluneConciergeChat';

const AppContent: React.FC = () => {
  const { activeView, toastMessage } = useShop();

  return (
    <div className="min-h-screen bg-[#070B14] text-[#E2E8F0] font-sans selection:bg-[#D6B27C]/30 selection:text-[#F8F9FA] relative flex flex-col justify-between">
      
      {/* Sticky Luxury Navbar */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <HeroSection />
            <FeaturedCollections />
            <SignatureCollection />
            <ConstellationExperience />
            <TwoSkiesExperience />
            <BondsSection />
            <BondBuilder />
            <OurStorySection />
            <JournalSection />
          </>
        )}

        {activeView === 'shop' && <ShopCatalog />}

        {activeView === 'collections' && (
          <div className="pt-20">
            <FeaturedCollections />
            <SignatureCollection />
          </div>
        )}

        {activeView === 'constellations' && (
          <div className="pt-16">
            <ConstellationExperience />
            <SignatureCollection />
          </div>
        )}

        {activeView === 'bonds' && (
          <div className="pt-16">
            <BondsSection />
            <BondBuilder />
          </div>
        )}

        {activeView === 'twoskies' && (
          <div className="pt-16">
            <TwoSkiesExperience />
          </div>
        )}

        {activeView === 'story' && <OurStorySection />}

        {activeView === 'journal' && <JournalSection />}
      </main>

      {/* Global Luxury Footer */}
      <Footer />

      {/* Drawers and Overlays */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <UserAccountModal />
      <QuizModal />

      {/* n8n Celestial Atelier Concierge Chat Widget */}
      <CeluneConciergeChat />

      {/* Subtle Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0B101E]/95 border border-[#D6B27C]/40 text-[#F8F9FA] text-xs px-5 py-3 shadow-2xl backdrop-blur-md animate-fadeIn flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6B27C]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
