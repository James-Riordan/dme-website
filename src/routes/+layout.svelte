<script lang="ts">
	import '../app.css';
	import Navbar from "$lib/components/ui/navbars/main-navbar.svelte";

	let { children } = $props();
</script>

<Navbar />

{@render children()}
