import { writable } from 'svelte/store';

export interface CartItem {
    id: string;
    title: string;
    description: string;
    imageURL: string;
    price?: number; // Optional property if you want to include price
  }

  // Define the type of the cart as an array of CartItem
  export const cart = writable<CartItem[]>([]);
  
  // Utility functions to manage the cart
  export const addToCart = (item: CartItem) => {
    cart.update((currentCart) => {
      // Check if the item already exists
      const exists = currentCart.some((i) => i.id === item.id);
  
      // If it exists, return the current cart without adding the item
      if (exists) return currentCart;
  
      // Otherwise, add the new item
      return [...currentCart, item];
    });
  };
  
  export const removeFromCart = (itemTitle: string) => {
    cart.update((currentCart) => currentCart.filter((item) => item.title !== itemTitle));
  };
  
  export const clearCart = () => {
    cart.set([]);
  };
  