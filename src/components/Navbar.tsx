import React, { useState, useEffect } from 'react';
import { Search, Heart, User, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartCount,
    wishlistIds,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAccountOpen,
    searchQuery,
    setSearchQuery,
    setIsQuizOpen
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'collections', label: 'Collections' },
    { id: 'constellations', label: 'Constellations' },
    { id: 'bonds', label: 'Bonds' },
    { id: 'twoskies', label: 'Two Skies, One Moon' },
    { id: 'story', label: 'Our Story' },
    { id: 'journal', label: 'Journal' },
  ];

  const handleNavClick = (id: string) => {
    setActiveView(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#070B14]/90 backdrop-blur-md border-b border-white/[0.07] py-3.5 shadow-lg shadow-black/20'
            : 'bg-gradient-to-b from-[#070B14]/80 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Brand Wordmark */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleNavClick('home')}
                className="text-left group focus:outline-none"
              >
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-[#F8F9FA] font-light transition-opacity duration-300 group-hover:text-[#D6B27C]">
                  CÉLUNE
                </span>
              </button>
            </div>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-xs tracking-[0.16em] uppercase transition-colors duration-300 py-1 ${
                    activeView === item.id
                      ? 'text-[#F8F9FA] font-medium'
                      : 'text-[#94A3B8] hover:text-[#F8F9FA]'
                  }`}
                >
                  {item.label}
                  {activeView === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D6B27C]" />
                  )}
                </button>
              ))}
            </nav>

            {/* Zone 3: Actions (Search, Wishlist, Account, Cart) */}
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Find Your Sky Quiz Quick Launch */}
              <button
                onClick={() => setIsQuizOpen(true)}
                className="hidden xl:inline-flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase text-[#D6B27C] hover:text-[#F8F9FA] transition-colors py-1.5 px-3 border border-[#D6B27C]/30 hover:border-[#D6B27C] rounded-sm"
              >
                <Sparkles className="w-3 h-3 text-[#D6B27C]" />
                <span>Piece Quiz</span>
              </button>

              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-[#CBD5E1] hover:text-[#F8F9FA] transition-colors p-1"
                aria-label="Search Catalog"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative text-[#CBD5E1] hover:text-[#F8F9FA] transition-colors p-1"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlistIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#D6B27C] text-[#070B14] rounded-full text-[9px] font-semibold flex items-center justify-center">
                    {wishlistIds.length}
                  </span>
                )}
              </button>

              {/* Account */}
              <button
                onClick={() => setIsAccountOpen(true)}
                className="text-[#CBD5E1] hover:text-[#F8F9FA] transition-colors p-1"
                aria-label="Account & Archive"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Cart Bag */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-[#CBD5E1] hover:text-[#F8F9FA] transition-colors p-1"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D6B27C] text-[#070B14] rounded-full text-[10px] font-semibold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-[#CBD5E1] hover:text-[#F8F9FA] p-1 ml-1"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Search Dropdown Strip */}
          {searchOpen && (
            <div className="pt-3 pb-2 border-t border-white/[0.08] mt-3 animate-fadeIn">
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search by constellation, moon phase, or jewelry piece (e.g. Orion, Pearl, Solitaire)..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activeView !== 'shop') setActiveView('shop');
                  }}
                  className="w-full bg-[#0D1322] border border-white/15 text-sm text-[#F8F9FA] placeholder:text-[#64748B] rounded-none py-2 px-4 pr-10 focus:outline-none focus:border-[#D6B27C] transition-colors font-light"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSearchOpen(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-[#F8F9FA]"
                >
                  ESC
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#070B14]/98 border-b border-white/10 px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-sm tracking-[0.16em] uppercase py-2 border-b border-white/[0.05] transition-colors ${
                    activeView === item.id ? 'text-[#D6B27C] font-medium' : 'text-[#CBD5E1]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsQuizOpen(true);
                }}
                className="text-left text-sm tracking-[0.16em] uppercase py-2 text-[#D6B27C] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Find Your Piece Quiz
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
