import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { CartItem, CartStore } from '~/types/cart';

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartedItems: [],
      addToCart: (item: CartItem) => {
        set((state) => ({
          cartedItems: [...state.cartedItems, item],
        }));
      },
      removeFromCart: (item: CartItem) => {
        set((state) => ({
          cartedItems: state.cartedItems.filter((cartItem) => cartItem.id !== item.id),
        }));
      },
      updateCart: (item: CartItem, action: 'increment' | 'decrement') => {
        set((state) => ({
          cartedItems: state.cartedItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              const newQuantity =
                action === 'increment'
                  ? (cartItem.quantity || 1) + 1
                  : Math.max((cartItem.quantity || 1) - 1, 1); // Minimum quantity should be 1

              return { ...cartItem, quantity: newQuantity };
            }
            return cartItem;
          }),
        }));
      },
      clearCart: () => {
        set(() => ({
          cartedItems: [],
        }));
      },
      getCartItemCount: () => get().cartedItems.length,
      getCartTotalCost: () =>
        get().cartedItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0),
      isItemInCart: (itemId: string) =>
        get().cartedItems.some((cartItem) => cartItem.id === itemId),
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useCartStore;
