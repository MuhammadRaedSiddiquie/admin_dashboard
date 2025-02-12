
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProductItem {
    id: string;
    title: string;
    description: string;
    images: { _key: string; asset: { url: string } }[];
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    tags: string[];
    stock: number;
    brand: string;
    availabilityStatus: string;
}

interface ProductState {
  items: ProductItem[];
//   addItem: (item: ProductItem) => void;
//   removeItem: (productId: string) => void;
//   updateQuantity: (productId: string, delta: number) => void;
  syncProduct: (items:ProductItem[]) => void;
}

const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      items: [],
    //   addItem: (item) =>
    //     set((state) => {
    //       const existingItem = state.items.find(
    //         (i) => i.product._id === item.product._id
    //       );
    //       if (existingItem) {
    //         return {
    //           items: state.items.map((i) =>
    //             i.product._id === item.product._id
    //               ? { ...i, quantity: i.quantity + item.quantity }
    //               : i
    //           ),
    //         };
    //       }
    //       return { items: [...state.items, item] };
    //     }),
    //   removeItem: (productId) =>
    //     set((state) => ({
    //       items: state.items.filter((i) => i.product._id !== productId),
    //     })),
    //   updateQuantity: (productId, delta) =>
    //     set((state) => ({
    //       items: state.items.map((i) =>
    //         i.product._id === productId
    //           ? { ...i, quantity: i.quantity + delta }
    //           : i
    //       ),
    //     })),
        syncProduct: (items) => set({ items }),
    }),
    {
      name: 'product-storage', // Unique name for localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);

export default useProductStore;