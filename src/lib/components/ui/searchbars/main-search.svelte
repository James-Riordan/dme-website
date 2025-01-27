<script lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { debounce } from 'lodash-es';
	import { searchTerm } from '$stores/searchStore'; // Import the global store

	// Reactive state for dropdown visibility
	let isDropdownVisible = writable(false);

	// Dropdown options
	export let dropdownOptions: string[] = [];

	// State for the currently selected category
	let selectedCategory = writable('All Categories');

	// Track user input to trigger immediate search when a single letter is typed
	let currentInput = writable('');

	// Function to handle search and send updates to grid-items component
	function handleSearch(newSearchTerm: string) {
		searchTerm.set(newSearchTerm);
	}

	// Handle keyup for spacebar and enter
	function handleKeyUp(event: KeyboardEvent) {
		if (event.key === ' ') {
			handleSearch($currentInput); // Trigger search on spacebar press
		} else if (event.key === 'Enter') {
			handleSearch($currentInput); // Trigger search on enter press
		}
	}

	// Debounced function to update the search term after 1 second of inactivity
	const debouncedHandleSearch = debounce((newSearchTerm: string) => {
		handleSearch(newSearchTerm);
	}, 50); // 1000 ms = 1 second

	// Function to update the search term and call debounced search
	function handleInputChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const value = input.value;
		currentInput.set(value); // Update local input store

		// Immediately trigger the search for the first input
		if (value.length === 0) {
			handleSearch(value); // Trigger search immediately on the first letter
		} else {
			// Debounced search for subsequent characters
			debouncedHandleSearch(value);
		}
	}

	// Close dropdown when clicking outside
	function handleClickOutside(event: MouseEvent) {
		const dropdown = document.getElementById('dropdown');
		const button = document.getElementById('dropdown-button');

		if (
			dropdown &&
			button &&
			!dropdown.contains(event.target as Node) &&
			!button.contains(event.target as Node)
		) {
			isDropdownVisible.set(false);
		}
	}

	function toggleDropdown() {
		isDropdownVisible.update((visible) => !visible);
	}

	function selectCategory(category: string) {
		selectedCategory.set(category);
		isDropdownVisible.set(false); // Close the dropdown after selection
	}

	// Add event listener for clicks on mount
	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<form class="relative mx-auto max-w-lg flex-grow">
	<div class="relative flex">
		<button
			id="dropdown-button"
			on:click|preventDefault={toggleDropdown}
			class="z-10 inline-flex flex-shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
			type="button"
		>
			{#if $selectedCategory}
				{$selectedCategory}
			{/if}
			<svg
				class="ms-2.5 h-2.5 w-2.5"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 10 6"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m1 1 4 4 4-4"
				/>
			</svg>
		</button>
		<!-- Dropdown Menu -->
		{#if $isDropdownVisible}
			<div
				id="dropdown"
				class="absolute left-0 top-full z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
			>
				<ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
					{#each dropdownOptions as option}
						<li>
							<button
								type="button"
								class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								on:click={() => selectCategory(option)}
							>
								{option}
							</button>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
		<div class="relative w-full">
			<input
				type="search"
				id="search-dropdown"
				class="z-20 block w-full rounded-e-lg border border-s-2 border-gray-300 border-s-gray-50 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:border-s-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
				placeholder="Enter search here..."
				required
				on:input={handleInputChange}
				on:keydown={handleKeyUp}
			/>
			<button
				type="submit"
				class="absolute end-0 top-0 h-full rounded-e-lg border border-blue-700 bg-blue-700 p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				<svg
					class="h-4 w-4"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 20"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
					/>
				</svg>
				<span class="sr-only">Search</span>
			</button>
		</div>
	</div>
</form>
