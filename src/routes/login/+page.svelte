<script lang="ts">
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let errorMessage = '';
	let isLoading = false;

	async function handleLogin() {
		isLoading = true;
		errorMessage = '';

		const res = await fetch('/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		const data = await res.json();
		isLoading = false;

		if (res.ok) {
			goto('/dashboard'); // Redirect to dashboard on success
		} else {
			errorMessage = data.message || 'Login failed';
		}
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-md bg-white p-8 rounded shadow-md">
		<h2 class="text-2xl font-semibold text-gray-700 mb-4 text-center">Login</h2>

		{#if errorMessage}
			<p class="mb-4 text-red-500 text-sm">{errorMessage}</p>
		{/if}

		<form on:submit|preventDefault={handleLogin}>
			<div class="mb-4">
				<label for="email" class="block text-gray-600 text-sm font-medium mb-2">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					class="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-200"
					placeholder="Enter your email"
					required
				/>
			</div>

			<div class="mb-4">
				<label for="password" class="block text-gray-600 text-sm font-medium mb-2">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					class="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-200"
					placeholder="Enter your password"
					required
				/>
			</div>

			<button
				type="submit"
				class="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 transition"
				disabled={isLoading}
			>
				{isLoading ? 'Logging in...' : 'Login'}
			</button>
		</form>

		<p class="text-sm text-gray-500 mt-4 text-center">
			Don't have an account? <a href="/register" class="text-blue-500">Sign up</a>
		</p>
	</div>
</div>
