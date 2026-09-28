import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, SharedSkyData, UserConstellation, Order, MetalFinish } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  activeView: string;
  setActiveView: (view: string) => void;
  activeCollectionFilter: string;
  setActiveCollectionFilter: (filter: string) => void;
  
  cartItems: CartItem[];
  addToCart: (product: Product, metal?: MetalFinish, size?: string, quantity?: number, customMeta?: Partial<CartItem>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;

  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  activeProductModal: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;

  // Celestial Archive
  savedConstellation: UserConstellation | null;
  saveUserConstellation: (constellation: UserConstellation) => void;
  savedSharedSkies: SharedSkyData[];
  saveSharedSky: (sky: SharedSkyData) => void;
  removeSharedSky: (id: string) => void;

  // Orders
  orders: Order[];
  placeOrder: (details: Order['shippingDetails'], discountPercent?: number) => Order;

  // User Profile
  user: {
    name: string;
    email: string;
    memberSince: string;
    tier: string;
  };
  updateUserProfile: (name: string, email: string) => void;

  // Search & Navigation helpers
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Feedback toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<string>('home');
  const [activeCollectionFilter, setActiveCollectionFilter] = useState<string>('all');
  
  // Cart
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('celune_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('celune_wishlist');
      return saved ? JSON.parse(saved) : ['cel-orion-crescent', 'cel-leo-moon-ring'];
    } catch {
      return ['cel-orion-crescent', 'cel-leo-moon-ring'];
    }
  });

  // Modals & Drawers
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // User Profile
  const [user, setUser] = useState({
    name: 'Eleanor Vance',
    email: 'eleanor.celestial@example.com',
    memberSince: 'Autumn 2024',
    tier: 'Haute Atelier Patron'
  });

  // Celestial Archive
  const [savedConstellation, setSavedConstellation] = useState<UserConstellation | null>(() => {
    try {
      const saved = localStorage.getItem('celune_user_constellation');
      return saved ? JSON.parse(saved) : {
        name: 'Eleanor',
        dob: '1996-10-24',
        constellation: 'Scorpio',
        moonPhase: 'Waxing Gibbous',
        symbolism: 'Profound mysteries, deep emotional currents, an ember glowing beneath black water.',
        dateCalculated: '2024-10-24'
      };
    } catch {
      return null;
    }
  });

  const [savedSharedSkies, setSavedSharedSkies] = useState<SharedSkyData[]>(() => {
    try {
      const saved = localStorage.getItem('celune_shared_skies');
      return saved ? JSON.parse(saved) : [
        {
          id: 'sky-sample-1',
          timestamp: Date.now() - 86400000 * 3,
          personOne: {
            name: 'Eleanor',
            dob: '1996-10-24',
            constellation: 'Scorpio',
            moonPhase: 'Waxing Gibbous'
          },
          personTwo: {
            name: 'Julian',
            dob: '1994-06-12',
            constellation: 'Gemini',
            moonPhase: 'Waxing Crescent'
          },
          sharedMoon: 'Waxing Crescent',
          poeticStory: 'Beneath the silver canopy of the Waxing Crescent, the sky traces an unbroken arc between Eleanor’s constellation of Scorpio and Julian’s constellation of Gemini. One carries the quiet resonance of water while the other anchors the clarity of air, joined at the center by the constant presence of the moon they share.',
          recommendedSet: {
            pieceOneId: 'cel-orion-crescent',
            pieceTwoId: 'cel-gemini-bracelet',
            setName: 'The Shared Moon Set'
          }
        }
      ];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('celune_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: 'CEL-7829-MOON',
          date: 'September 14, 2026',
          items: [
            {
              id: 'sample-item-1',
              productId: 'cel-orion-crescent',
              product: PRODUCTS[0],
              selectedMetal: '18k White Gold',
              selectedSize: '45cm (Classic)',
              quantity: 1
            }
          ],
          subtotal: 1850,
          discount: 0,
          shipping: 0,
          total: 1850,
          shippingDetails: {
            name: 'Eleanor Vance',
            email: 'eleanor.celestial@example.com',
            address: '742 Evergreen Terrace, Suite 4B',
            city: 'San Francisco',
            postalCode: '94102',
            country: 'United States'
          },
          status: 'Crafting in Atelier'
        }
      ];
    } catch {
      return [];
    }
  });

  // Synchronize localStorage
  useEffect(() => {
    try {
      localStorage.setItem('celune_cart', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('celune_wishlist', JSON.stringify(wishlistIds));
    } catch {}
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('celune_shared_skies', JSON.stringify(savedSharedSkies));
    } catch {}
  }, [savedSharedSkies]);

  useEffect(() => {
    try {
      localStorage.setItem('celune_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    if (savedConstellation) {
      try {
        localStorage.setItem('celune_user_constellation', JSON.stringify(savedConstellation));
      } catch {}
    }
  }, [savedConstellation]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  const addToCart = (
    product: Product,
    metal: MetalFinish = '18k White Gold',
    size?: string,
    quantity = 1,
    customMeta?: Partial<CartItem>
  ) => {
    const defaultSize = size || (product.sizes ? product.sizes[0] : undefined);
    const existingIndex = cartItems.findIndex(
      (item) => item.productId === product.id && item.selectedMetal === metal && item.selectedSize === defaultSize
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        product,
        selectedMetal: metal,
        selectedSize: defaultSize,
        quantity,
        ...customMeta
      };
      setCartItems((prev) => [newItem, ...prev]);
    }
    showToast(`Added ${product.name} to your private collection`);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCartItems([]);

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your saved constellations');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your celestial wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const openProductDetail = (product: Product) => setActiveProductModal(product);
  const closeProductDetail = () => setActiveProductModal(null);

  const saveUserConstellation = (c: UserConstellation) => {
    setSavedConstellation(c);
    showToast(`Archived ${c.constellation} to your Celestial Archive`);
  };

  const saveSharedSky = (sky: SharedSkyData) => {
    setSavedSharedSkies((prev) => [sky, ...prev.filter((s) => s.id !== sky.id)]);
    showToast('Your shared sky has been preserved in your Celestial Archive');
  };

  const removeSharedSky = (id: string) => {
    setSavedSharedSkies((prev) => prev.filter((s) => s.id !== id));
    showToast('Shared sky removed');
  };

  const placeOrder = (details: Order['shippingDetails'], discountPercent = 0): Order => {
    const subtotal = cartSubtotal;
    const discount = Math.round(subtotal * (discountPercent / 100));
    const shipping = 0; // Complimentary luxury courier delivery
    const total = subtotal - discount + shipping;

    const newOrder: Order = {
      id: `CEL-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: [...cartItems],
      subtotal,
      discount,
      shipping,
      total,
      shippingDetails: details,
      status: 'Confirmed'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateUserProfile = (name: string, email: string) => {
    setUser((prev) => ({ ...prev, name, email }));
    showToast('Profile updated');
  };

  return (
    <ShopContext.Provider
      value={{
        activeView,
        setActiveView,
        activeCollectionFilter,
        setActiveCollectionFilter,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        activeProductModal,
        openProductDetail,
        closeProductDetail,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isAccountOpen,
        setIsAccountOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isQuizOpen,
        setIsQuizOpen,
        savedConstellation,
        saveUserConstellation,
        savedSharedSkies,
        saveSharedSky,
        removeSharedSky,
        orders,
        placeOrder,
        user,
        updateUserProfile,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
