<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { searchTerm } from '$stores/searchStore'; // Import the global searchTerm store
	import gridData from './gridData.json'; // Import the grid data
	import { addToCart } from '$stores/cartStore'; // Import the addToCart function
	import type { CartItem } from '$stores/cartStore'; // Import the CartItem type
  
	// Create stores for pagination
	let itemsPerPage = writable(8);
	let currentPage = writable(1);
  
	// Delayed loading for visual effect
	let delayedItems: CartItem[] = [];
	let currentPageItems: CartItem[] = [];
  
	// Update itemsPerPage based on screen size
	const updateItemsPerPage = () => {
	  if (window.matchMedia('(min-width: 1536px)').matches) {
		itemsPerPage.set(24);
	  } else if (window.matchMedia('(min-width: 1280px)').matches) {
		itemsPerPage.set(20);
	  } else if (window.matchMedia('(min-width: 1024px)').matches) {
		itemsPerPage.set(16);
	  } else if (window.matchMedia('(min-width: 768px)').matches) {
		itemsPerPage.set(12);
	  } else {
		itemsPerPage.set(8);
	  }
	};
  
	// Mount lifecycle hook
	onMount(() => {
	  // Initialize items per page
	  updateItemsPerPage();
  
	  // Listen for screen size changes
	  window.addEventListener('resize', updateItemsPerPage);
  
	  // Simulate the loading of grid items
	  gridData.forEach((item, index) => {
		setTimeout(() => {
		  delayedItems = [...delayedItems, item];
		}, index * 30);
	  });
	});
  
	// Filtered items based on search term
	$: filteredItems = delayedItems.filter(item => {
	  const term = $searchTerm.toLowerCase();
	  if (!term) return true;
	  return item.title.toLowerCase().includes(term) || item.description.toLowerCase().includes(term);
	});
  
	// Current page items
	$: currentPageItems = filteredItems.slice(
	  ($currentPage - 1) * $itemsPerPage,
	  $currentPage * $itemsPerPage
	);
  
	// Pagination controls
	const nextPage = () => currentPage.update(n => n + 1);
	const prevPage = () => currentPage.update(n => n - 1);
  
	// Disable next button if no more items
	$: nextButtonDisabled = $currentPage * $itemsPerPage >= filteredItems.length;
  
	// Adjust current page when screen size or filtered items change
	$: {
	  const totalPages = Math.ceil(filteredItems.length / $itemsPerPage);
	  if ($currentPage > totalPages) {
		currentPage.set(totalPages);
	  } else if ($currentPage < 1) {
		currentPage.set(1);
	  }
	};
  
	// Handle adding items to the cart
	function handleAddToCart(item: CartItem) {
	  addToCart(item);
	}
  </script>
  
  <div class="p-8">
	<section
	  id="Projects"
	  class="mx-auto grid w-full grid-cols-1 justify-center justify-items-center gap-x-6 gap-y-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
	>
	  {#each currentPageItems as item (item.title)}
		<article
		  class="group relative mx-auto mt-24 flex aspect-[3/2] w-full flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40"
		  transition:fade={{ delay: 100 }}
		>
		  <!-- Item Image -->
		  <img
			src={item.imageURL}
			alt={item.title}
			class="absolute inset-0 h-full w-full object-cover"
		  />
		  <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30"></div>
  
		  <!-- Item Title and Description -->
		  <h3 class="z-10 mt-3 text-3xl font-bold text-white">{item.title}</h3>
		  <div class="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
			{item.description}
		  </div>
  
		  <!-- Add to Cart Button -->
		  <button
			class="z-10 mt-4 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-80 transition-opacity outline-1 outline-white"
			on:click={() => handleAddToCart(item)}
		  >
			Add to Cart
		  </button>
		</article>
	  {/each}
	</section>
  
	<!-- Pagination Controls -->
	<div class="flex justify-center mt-4">
	  <button on:click={prevPage} disabled={$currentPage === 1} class="p-2 bg-gray-300 rounded-md mr-2">
		Prev
	  </button>
	  <span class="self-center">Page {$currentPage}</span>
	  <button
		on:click={nextPage}
		disabled={nextButtonDisabled}
		class="p-2 bg-gray-300 rounded-md ml-2"
		class:opacity-50={nextButtonDisabled}
		class:cursor-not-allowed={nextButtonDisabled}
	  >
		Next
	  </button>
	</div>
  </div>
  