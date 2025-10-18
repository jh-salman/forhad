import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Cart item structure
 * @typedef {Object} CartItem
 * @property {string} id - Product ID
 * @property {string} sku - Product SKU
 * @property {string} name - Product name
 * @property {number} price - Product price
 * @property {string} image - Product image URL
 * @property {number} quantity - Quantity in cart
 */

/**
 * Cart store using Zustand with persistence
 */
export const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      items: [],
      couponCode: null,
      
      // Actions
      addItem: (product) => {
        const { id, sku, name, price, image } = product;
        const items = get().items;
        const existingItem = items.find(item => item.sku === sku);
        
        if (existingItem) {
          // Update quantity if item already exists
          set({
            items: items.map(item =>
              item.sku === sku
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          // Add new item
          set({
            items: [...items, { id, sku, name, price, image, quantity: 1 }]
          });
        }
      },
      
      removeItem: (sku) => {
        set({
          items: get().items.filter(item => item.sku !== sku)
        });
      },
      
      setQuantity: (sku, quantity) => {
        if (quantity <= 0) {
          get().removeItem(sku);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.sku === sku
              ? { ...item, quantity }
              : item
          )
        });
      },
      
      clear: () => {
        set({ items: [], couponCode: null });
      },
      
      setCouponCode: (code) => {
        set({ couponCode: code });
      },
      
      // Selectors
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getItemBySku: (sku) => {
        return get().items.find(item => item.sku === sku);
      },
      
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      isEmpty: () => {
        return get().items.length === 0;
      }
    }),
    {
      name: 'electro-mart-cart', // localStorage key
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode
      })
    }
  )
);

