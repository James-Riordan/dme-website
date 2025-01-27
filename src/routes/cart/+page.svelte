<script lang="ts">
    import { cart, removeFromCart, clearCart } from '$stores/cartStore';
    import type { CartItem } from '$stores/cartStore'; // Import the CartItem type
    import { onDestroy } from 'svelte';
  
    // Define cartItems as an array of CartItem
    let cartItems: CartItem[] = [];
  
    // Subscribe to the cart store
    const unsubscribe = cart.subscribe((items: CartItem[]) => {
      cartItems = items;
    });
  
    // Clean up the subscription
    onDestroy(() => {
      unsubscribe();
    });
  
    // Function to remove an item by title
    function handleRemoveItem(itemTitle: string): void {
      removeFromCart(itemTitle);
    }
  
    // Function to clear the cart
    function handleClearCart(): void {
      clearCart();
    }
  </script>
  
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Shopping Cart</h1>
  
    {#if cartItems.length === 0}
      <p class="text-gray-700">Your cart is empty.</p>
    {:else}
      <ul class="space-y-6">
        {#each cartItems as item (item.title)}
          <li class="flex items-center justify-between border-b pb-4">
            <div class="flex items-center space-x-4">
              <img src={item.imageURL} alt={item.title} class="w-16 h-16 object-cover rounded" />
              <div>
                <h2 class="text-lg font-semibold">{item.title}</h2>
                <p class="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <p class="text-lg font-semibold">${item.price || 'N/A'}</p>
              <button
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                on:click={() => handleRemoveItem(item.title)}
              >
                Remove
              </button>
            </div>
          </li>
        {/each}
      </ul>
  
      <div class="mt-8 flex justify-end space-x-4">
        <button
          class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          on:click={handleClearCart}
        >
          Clear Cart
        </button>
      </div>
    {/if}
  </div>
  