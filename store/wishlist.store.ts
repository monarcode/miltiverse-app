import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { WishlistStore } from '~/types/wishlist';

const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return { items: state.items.filter((i) => i.id !== item.id) };
          } else {
            return { items: [...state.items, item] };
          }
        }),
      clearWishlist: () => set({ items: [] }),
      isInWishlist: (id) => get().items.some((item) => item.id === id),
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useWishlistStore;
