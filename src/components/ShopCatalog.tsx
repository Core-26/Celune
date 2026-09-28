import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Search, X, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { JewelryCategory, CollectionType } from '../types';

export const ShopCatalog: React.FC = () => {
  const { activeCollectionFilter, setActiveCollectionFilter, searchQuery, setSearchQuery } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedConstellation, setSelectedConstellation] = useState<string>('all');
  const [selectedMoonPhase, setSelectedMoonPhase] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(4000);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Search term
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.constellation.toLowerCase().includes(q) ||
          p.moonPhase.toLowerCase().includes(q) ||
          p.materials.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Collection
      if (activeCollectionFilter !== 'all' && p.collection !== activeCollectionFilter) {
        return false;
      }

      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Constellation
      if (selectedConstellation !== 'all' && p.constellation !== selectedConstellation) {
        return false;
      }

      // Moon phase
      if (selectedMoonPhase !== 'all' && !p.moonPhase.toLowerCase().includes(selectedMoonPhase.toLowerCase())) {
        return false;
      }

      // Price
      if (p.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isSignature ? 1 : 0) - (a.isSignature ? 1 : 0);
    });
  }, [searchQuery, activeCollectionFilter, selectedCategory, selectedConstellation, selectedMoonPhase, maxPrice, sortBy]);

  const clearAllFilters = () => {
    setActiveCollectionFilter('all');
    setSelectedCategory('all');
    setSelectedConstellation('all');
    setSelectedMoonPhase('all');
    setMaxPrice(4000);
    setSearchQuery('');
  };

  return (
    <div className="py-28 sm:py-36 min-h-screen bg-[#070B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Page Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="text-xs tracking-[0.25em] uppercase text-[#D6B27C] font-light">
            Haute Joaillerie Catalog
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl font-light text-[#F8F9FA] tracking-wide">
            The Célune Collection
          </h1>
          <p className="text-sm text-[#94A3B8] font-light leading-relaxed">
            Every piece forged in sustainable 18k gold and platinum, calibrated to the astrometric patterns of the northern night.
          </p>
        </div>

        {/* Collection Pills & Filter Bar */}
        <div className="border-y border-white/[0.08] py-4 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Collection Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Creations' },
              { id: 'constellations', label: 'Constellations' },
              { id: 'moon', label: 'Moon' },
              { id: 'water', label: 'Water' },
              { id: 'bonds', label: 'Bonds' },
            ].map((col) => (
              <button
                key={col.id}
                onClick={() => setActiveCollectionFilter(col.id)}
                className={`text-xs tracking-wider uppercase px-4 py-2 whitespace-nowrap transition-colors ${
                  activeCollectionFilter === col.id
                    ? 'bg-[#F8F9FA] text-[#070B14] font-medium'
                    : 'text-[#94A3B8] hover:text-[#F8F9FA] border border-white/10'
                }`}
              >
                {col.label}
              </button>
            ))}
          </div>

          {/* Sort & Filter Toggle */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-[#CBD5E1] hover:text-[#D6B27C] border border-white/15 px-3 py-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Refine Filters</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#64748B] uppercase tracking-wider hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#0D1322] border border-white/15 text-xs text-[#CBD5E1] px-3 py-2 focus:outline-none focus:border-[#D6B27C]"
              >
                <option value="featured">Featured / Signature</option>
                <option value="newest">New Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Expandable Refinement Panel */}
        {isFilterDrawerOpen && (
          <div className="bg-[#0B101E]/90 border border-white/10 p-6 mb-12 animate-fadeIn grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Category Filter */}
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#D6B27C] block mb-2">Category</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#070B14] border border-white/15 text-xs text-[#CBD5E1] p-2 focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="necklace">Necklaces</option>
                <option value="bracelet">Bracelets</option>
                <option value="ring">Rings</option>
                <option value="pendant">Pendants</option>
                <option value="earrings">Earrings</option>
              </select>
            </div>

            {/* Constellation Filter */}
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#D6B27C] block mb-2">Constellation</span>
              <select
                value={selectedConstellation}
                onChange={(e) => setSelectedConstellation(e.target.value)}
                className="w-full bg-[#070B14] border border-white/15 text-xs text-[#CBD5E1] p-2 focus:outline-none"
              >
                <option value="all">All Constellations</option>
                <option value="Orion">Orion</option>
                <option value="Gemini">Gemini</option>
                <option value="Leo">Leo</option>
                <option value="Pisces">Pisces</option>
                <option value="Cassiopeia">Cassiopeia</option>
                <option value="Lyra">Lyra</option>
                <option value="Scorpio">Scorpio</option>
                <option value="Cancer">Cancer</option>
                <option value="Cygnus">Cygnus</option>
                <option value="UrsaMajor">Ursa Major</option>
              </select>
            </div>

            {/* Moon Phase */}
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#D6B27C] block mb-2">Moon Phase</span>
              <select
                value={selectedMoonPhase}
                onChange={(e) => setSelectedMoonPhase(e.target.value)}
                className="w-full bg-[#070B14] border border-white/15 text-xs text-[#CBD5E1] p-2 focus:outline-none"
              >
                <option value="all">All Phases</option>
                <option value="Crescent">Crescent</option>
                <option value="Full">Full Moon</option>
                <option value="New">New Moon</option>
                <option value="Quarter">Quarter</option>
                <option value="Gibbous">Gibbous</option>
              </select>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#D6B27C] mb-2">
                <span>Maximum Price</span>
                <span className="font-mono text-white">${maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1200"
                max="4000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#D6B27C] bg-white/10"
              />
              <div className="flex justify-between text-[10px] text-[#64748B] mt-1 font-mono">
                <span>$1,200</span>
                <span>$4,000</span>
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-4 flex items-center justify-between pt-4 border-t border-white/[0.08]">
              <span className="text-xs text-[#94A3B8]">
                Displaying {filteredProducts.length} of {PRODUCTS.length} creations
              </span>
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#D6B27C] hover:underline uppercase tracking-wider"
              >
                Reset All Filters
              </button>
            </div>

          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed border-white/15 p-12 space-y-4">
            <p className="font-serif text-2xl text-[#CBD5E1]">No celestial pieces match this exact alignment.</p>
            <p className="text-xs text-[#64748B]">Try expanding your price range or clearing constellation filters.</p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2.5 bg-[#F8F9FA] text-[#070B14] text-xs uppercase tracking-wider font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
