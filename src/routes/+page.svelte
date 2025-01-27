<script lang="ts">
	import MainSearch from '$lib/components/ui/searchbars/main-search.svelte';
	import GridItems from '$lib/components/grid/grid-items.svelte';

	let dropdownOptions = ['All Categories', 'Vector Files', 'Short Videos'];

	// Simulate loading dropdown options from backend (PostgreSQL or Elasticsearch)
	// import { onMount } from 'svelte';

	// onMount(async () => {
	// 	// Example API call to fetch dropdown options
	// 	const response = await fetch('/api/categories');
	// 	const data = await response.json();
	// 	dropdownOptions = data.categories;
	// });
</script>

<div class="w-screen h-[20rem] flex items-center justify-center bg-gray-200 dark:bg-gray-400 bg-opacity-50">
	<MainSearch {dropdownOptions} />
</div>
<div class="w-full h-full">
	<GridItems />
</div>

