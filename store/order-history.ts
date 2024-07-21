import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: any;
}

interface Order {
  id: string;
  date: Date;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

interface OrderHistoryStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
  clearOrderHistory: () => void;
  getAllItems: () => OrderItem[];
}

const useOrderHistoryStore = create<OrderHistoryStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        })),
      getOrderById: (orderId) => {
        const { orders } = get();
        return orders.find((order) => order.id === orderId);
      },
      clearOrderHistory: () => set({ orders: [] }),
      getAllItems: () => {
        const { orders } = get();
        return orders.reduce<OrderItem[]>((allItems, order) => {
          return [...allItems, ...order.items];
        }, []);
      },
    }),
    {
      name: 'order-history-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useOrderHistoryStore;
