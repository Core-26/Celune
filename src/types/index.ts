export type JewelryCategory = 'all' | 'necklace' | 'bracelet' | 'ring' | 'earrings' | 'pendant' | 'bonds';
export type CollectionType = 'all' | 'moon' | 'water' | 'constellations' | 'bonds';
export type MetalFinish = '18k White Gold' | '18k Yellow Gold' | '18k Rose Gold' | 'Platinum 950';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  collection: 'moon' | 'water' | 'constellations' | 'bonds';
  category: 'necklace' | 'bracelet' | 'ring' | 'earrings' | 'pendant';
  constellation: string;
  moonPhase: string;
  price: number;
  originalPrice?: number;
  materials: string;
  availableMetals: MetalFinish[];
  dimensions: string;
  description: string;
  story: string;
  symbolism: string;
  image: string;
  secondaryImage?: string;
  isSignature?: boolean;
  isNew?: boolean;
  inStock: boolean;
  sizes?: string[];
  complementaryProductId?: string;
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  selectedMetal: MetalFinish;
  selectedSize?: string;
  quantity: number;
  isSharedSkySet?: boolean;
  sharedSkyNames?: [string, string];
  bondedWithTitle?: string;
}

export interface SharedSkyData {
  id: string;
  timestamp: number;
  personOne: {
    name: string;
    dob: string;
    constellation: string;
    moonPhase: string;
  };
  personTwo: {
    name: string;
    dob: string;
    constellation: string;
    moonPhase: string;
  };
  sharedMoon: string;
  poeticStory: string;
  recommendedSet: {
    pieceOneId: string;
    pieceTwoId: string;
    setName: string;
  };
}

export interface UserConstellation {
  name: string;
  dob: string;
  constellation: string;
  moonPhase: string;
  symbolism: string;
  dateCalculated: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  status: 'Confirmed' | 'Crafting in Atelier' | 'Shipped' | 'Delivered';
}
