<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import ShoppingCartIcon from './ShoppingCartIcon.svelte';

	let isDarkTheme = false;
	let showMenu = false;
	let isAdmin = false;
	let isAuthenticated = false;

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

	function toggleNavbar() {
		showMenu = !showMenu;
	}

	// Reactive User Auth Check
	$: isAdmin = $page.data?.isAdmin ?? false;
	$: isAuthenticated = !!$page.data?.user;
</script>

<nav class="container mx-auto px-6 py-8 flex items-center justify-between">
	<!-- Logo -->
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

	<!-- Desktop Menu -->
	<div class="hidden md:flex items-center space-x-10">
		<a class="text-black-400 hover:text-blue-400" href="/sellyourcontent">Sell your content!</a>
		<a class="text-black-400 hover:text-blue-400" href="/contact">Contact Us</a>

		<!-- Admin Portal Button (Only if user is admin) -->
		{#if isAdmin}
			<a class="text-red-500 font-semibold hover:text-blue-400" href="/admin">Admin Portal</a>
		{/if}

		<!-- Auth Button (Login or Dashboard) -->
		{#if isAuthenticated}
			<a class="text-black-400 hover:text-blue-400" href="/dashboard">Dashboard</a>
		{:else}
			<a class="text-black-400 hover:text-blue-400" href="/login">Login</a>
		{/if}

		<!-- Shopping Cart -->
		<ShoppingCartIcon />


		<!-- Dark Mode Toggle -->
		<button
			class="p-2 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors"
			aria-label="Toggle dark mode"
			on:click={toggleTheme}
		>
			{#if isDarkTheme}
				🌙 <!-- Moon icon for dark mode -->
			{:else}
				☀️ <!-- Sun icon for light mode -->
			{/if}
		</button>
	</div>
</nav>

<!-- Mobile Menu -->
<div class="md:hidden" class:translate-y-0={showMenu} class:translate-y-full={!showMenu}>
	<div class="flex flex-col space-y-4 mt-6">
		<a class="text-black-400 hover:text-blue-400" href="/sellyourcontent">Sell your content!</a>
		<a class="text-black-400 hover:text-blue-400" href="/contact">Contact Us</a>

		<!-- Admin Portal (Only if user is admin) -->
		{#if isAdmin}
			<a class="text-red-500 font-semibold hover:text-blue-400" href="/admin">Admin Portal</a>
		{/if}

		<!-- Auth Button (Login or Dashboard) -->
		{#if isAuthenticated}
			<a class="text-black-400 hover:text-blue-400" href="/dashboard">Dashboard</a>
		{:else}
			<a class="text-black-400 hover:text-blue-400" href="/login">Login</a>
		{/if}

		<!-- Shopping Cart -->
		<ShoppingCartIcon />

		<!-- Dark Mode Toggle -->
		<button
			class="p-2 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors"
			aria-label="Toggle dark mode"
			on:click={toggleTheme}
		>
			{#if isDarkTheme}
				🌙 Dark Mode
			{:else}
				☀️ Light Mode
			{/if}
		</button>
	</div>
</div>
