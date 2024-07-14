export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: any;
  quantity: number;
  desciption: string;
};

export type CartState = {
  cartedItems: CartItem[];
};

export type CartActions = {
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  updateCart: (item: CartItem, action: 'increment' | 'decrement') => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  isItemInCart: (itemId: string) => boolean;
  getCartTotalCost: () => number;
};

export type CartStore = CartState & CartActions;
