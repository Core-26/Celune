import React from 'react';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist, openProductDetail, addToCart } = useShop();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group relative flex flex-col justify-between bg-[#0B101E]/40 border border-white/[0.08] hover:border-[#D6B27C]/40 transition-all duration-500 overflow-hidden">
      
      {/* Top Media Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#070B14]">
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            wishlisted
              ? 'bg-[#D6B27C] text-[#070B14]'
              : 'bg-[#070B14]/60 text-[#CBD5E1] hover:text-white hover:bg-[#070B14]/90 backdrop-blur-sm'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
        </button>

        {/* Status / Signature indicator */}
        {product.isSignature && (
          <div className="absolute top-3 left-3 z-10 text-[9px] tracking-[0.2em] uppercase text-[#D6B27C] bg-[#070B14]/80 px-2 py-0.5 border border-[#D6B27C]/30 backdrop-blur-sm">
            Signature
          </div>
        )}

        {/* Product Image */}
        <div
          onClick={() => openProductDetail(product)}
          className="w-full h-full cursor-pointer relative"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106 filter brightness-95 group-hover:brightness-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B101E]/80 via-transparent to-transparent opacity-60" />
        </div>

        {/* Quick Action Overlay (Reveals on Hover) */}
        <div className="absolute inset-x-3 bottom-3 z-20 flex items-center gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => openProductDetail(product)}
            className="flex-1 py-2 bg-[#070B14]/90 hover:bg-[#070B14] text-[#F8F9FA] hover:text-[#D6B27C] border border-white/20 hover:border-[#D6B27C] text-[11px] tracking-[0.16em] uppercase flex items-center justify-center gap-1.5 backdrop-blur-md transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          
          <button
            onClick={() => addToCart(product)}
            className="p-2 bg-[#D6B27C] hover:bg-[#E5C79A] text-[#070B14] flex items-center justify-center transition-colors"
            aria-label="Add to cart"
            title="Add to shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metadata & Description */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Zero-Pill Clean Unboxed Metadata */}
          <div className="flex items-center gap-2 text-[11px] text-[#94A3B8] font-light mb-1.5 tracking-wider">
            <span>{product.constellation}</span>
            <span aria-hidden="true" className="text-[#64748B]">·</span>
            <span>{product.moonPhase}</span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => openProductDetail(product)}
            className="font-serif text-lg sm:text-xl text-[#F8F9FA] font-light tracking-wide group-hover:text-[#D6B27C] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-[12px] text-[#64748B] font-light line-clamp-1 mt-1">
            {product.materials}
          </p>
        </div>

        {/* Price & Action Bar */}
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
          <span className="font-mono text-sm tracking-wider text-[#F8F9FA] tabular-nums font-normal">
            ${product.price.toLocaleString()}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="text-[11px] tracking-[0.18em] uppercase text-[#D6B27C] hover:text-[#F8F9FA] font-medium transition-colors"
          >
            Add to Bag
          </button>
        </div>

      </div>
    </div>
  );
};
