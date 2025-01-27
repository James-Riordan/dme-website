<script lang="ts">
	import { onMount } from 'svelte';
	import ShoppingCartIcon from './ShoppingCartIcon.svelte'; // Import the cart component

	let isDarkTheme = false;

	// Initialize theme on mount
	onMount(() => {
		const savedTheme = localStorage.getItem('theme') || 'light';
		isDarkTheme = savedTheme === 'dark';
		document.documentElement.classList.toggle('dark', isDarkTheme);
	});

	function toggleTheme() {
		isDarkTheme = !isDarkTheme;
		const newTheme = isDarkTheme ? 'dark' : 'light';

		// Apply the theme to the document
		document.documentElement.classList.toggle('dark', isDarkTheme);

		// Save the theme in localStorage
		localStorage.setItem('theme', newTheme);
	}

	let showMenu = false;

	function toggleNavbar() {
		showMenu = !showMenu;
	}

	let cartCount = 0; // Initially, there are no items in the cart
</script>

<div>
	<nav class="container mx-auto px-6 py-8 md:flex md:items-center md:justify-between">
		<div class="flex items-center justify-between">
			<a class="text-xl font-bold text-red-500 hover:text-blue-400 md:text-2xl" href="/">DME</a>

			<!-- Mobile menu button -->
			<button
				on:click={toggleNavbar}
				class="text-black-400 hover:text-black-400 focus:text-black-400 focus:outline-none md:hidden"
				aria-label="Toggle navigation menu"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-6 w-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
		</div>

		<div>
			<!-- Enhanced Theme Toggle Button -->
			<div
				class="relative inline-flex cursor-pointer items-center"
				role="switch"
				aria-checked={isDarkTheme}
				tabindex="0"
				on:click={toggleTheme}
				on:keydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						toggleTheme();
					}
				}}
			>
				<!-- Background -->
				<div
					class="h-8 w-14 flex-shrink-0 rounded-full bg-gray-300 transition-colors duration-300 dark:bg-gray-700"
				></div>

				<!-- Circle -->
				<div
					class="absolute left-0.5 top-0.5 h-7 w-7 transform rounded-full bg-white shadow-md transition-transform duration-300"
					class:translate-x-full={isDarkTheme}
				></div>

				<!-- Labels -->
				<div class="absolute inset-0 flex items-center justify-between px-2 text-xs font-medium">
					<span class="text-gray-500 dark:text-gray-400"></span>
					<span class="text-gray-500 dark:text-gray-400"></span>
				</div>
			</div>
		</div>

		<!-- Mobile Menu -->
		<div
			class="mt-8 flex-col space-y-4 md:mt-0 md:flex md:flex-row md:items-center md:space-x-10 md:space-y-0 {showMenu
				? 'flex'
				: 'hidden'}"
		>
			<a class="text-black-400 hover:text-blue-400" href="/sellyourcontent">Sell your content!</a>
			<a class="text-black-400 hover:text-blue-400" href="/contact">Contact US</a>

			<!-- Shopping Cart Icon -->
			<ShoppingCartIcon count={cartCount} />
		</div>
	</nav>
</div>
