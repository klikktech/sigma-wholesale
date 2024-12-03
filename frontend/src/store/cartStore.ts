import { create } from 'zustand'

interface CartStore {
  cartCount: number
  cartPrice: number
  setCartCount: (count: number, price: number) => void
}

const getInitialCartCount = () => {
  if (typeof window !== 'undefined') {
    const storedCount = localStorage.getItem('cartCount');
    return storedCount ? parseInt(storedCount, 10) : 0;
  }
  return 0;
};

const getInitialCartPrice = () => {
  if (typeof window !== 'undefined') {
    const storedPrice = localStorage.getItem('cartPrice');
    return storedPrice ? parseFloat(storedPrice) : 0;
  }
  return 0;
};

export const useCartStore = create<CartStore>((set) => ({
  cartCount: getInitialCartCount(),
  cartPrice: getInitialCartPrice(),
  setCartCount: (count, price) => {
    set({ cartCount: count, cartPrice: price });
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartCount', count.toString());
      localStorage.setItem('cartPrice', price.toString());
    }
  },
})); 