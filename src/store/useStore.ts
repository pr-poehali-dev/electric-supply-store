import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

interface CartItem {
  product: Product;
  quantity: number;
}

interface Store {
  cart: CartItem[];
  favorites: number[];
  compare: number[];

  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;

  toggleFavorite: (id: number) => void;
  toggleCompare: (id: number) => void;

  cartTotal: () => number;
  cartCount: () => number;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      cart: [],
      favorites: [],
      compare: [],

      addToCart: (product) => {
        const existing = get().cart.find(i => i.product.id === product.id);
        if (existing) {
          set({ cart: get().cart.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) });
        } else {
          set({ cart: [...get().cart, { product, quantity: 1 }] });
        }
      },

      removeFromCart: (id) => set({ cart: get().cart.filter(i => i.product.id !== id) }),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
        } else {
          set({ cart: get().cart.map(i => i.product.id === id ? { ...i, quantity } : i) });
        }
      },

      clearCart: () => set({ cart: [] }),

      toggleFavorite: (id) => {
        const favs = get().favorites;
        set({ favorites: favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id] });
      },

      toggleCompare: (id) => {
        const cmp = get().compare;
        if (cmp.includes(id)) {
          set({ compare: cmp.filter(c => c !== id) });
        } else if (cmp.length < 4) {
          set({ compare: [...cmp, id] });
        }
      },

      cartTotal: () => get().cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      cartCount: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'electro-store' }
  )
);
