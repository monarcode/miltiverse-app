import { TProductCardProps } from './shared';

export interface WishlistItem extends TProductCardProps {}

export interface WishlistStore {
  items: WishlistItem[];
  toggleItem: (item: WishlistItem) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
}
