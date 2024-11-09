import { create } from 'zustand'

interface CartStore {
  cartCount: number
  setCartCount: (count: number) => void
}

const getInitialCartCount = () => {
  if (typeof window !== 'undefined') {
    const storedCount = localStorage.getItem('cartCount');
    return storedCount ? parseInt(storedCount, 10) : 0;
  }
  return 0;
};

export const useCartStore = create<CartStore>((set) => ({
  cartCount: getInitialCartCount(),
  setCartCount: (count) => {
    set({ cartCount: count });
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartCount', count.toString());
    }
  },
})); 