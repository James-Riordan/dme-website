<script lang="ts">
	import { invalidate } from '$app/navigation';

	let email = '';
	let username = '';
	let password = '';
	let confirmPassword = '';
	let errorMessage = '';
	let successMessage = '';

	async function handleSignup() {
		errorMessage = '';
		successMessage = '';

		if (password !== confirmPassword) {
			errorMessage = 'Passwords do not match.';
			return;
		}

		const res = await fetch('/register', {
			method: 'POST',
			body: JSON.stringify({ email, username, password }),
			headers: { 'Content-Type': 'application/json' }
		});

		const data = await res.json();

		if (res.ok) {
			successMessage = 'Signup successful! Redirecting...';
			setTimeout(() => (window.location.href = '/login'), 2000);
		} else {
			errorMessage = data.error || 'Something went wrong.';
		}

		invalidate('register');
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
	<div class="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
		<h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Create an Account</h1>

		{#if errorMessage}
			<p class="text-red-500 mb-4">{errorMessage}</p>
		{/if}

		{#if successMessage}
			<p class="text-green-500 mb-4">{successMessage}</p>
		{/if}

		<form on:submit|preventDefault={handleSignup}>
			<div class="mb-4">
				<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					required
					class="mt-1 w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
				/>
			</div>

			<div class="mb-4">
				<label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
				<input
					type="text"
					id="username"
					bind:value={username}
					required
					class="mt-1 w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
				/>
			</div>

			<div class="mb-4">
				<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					required
					class="mt-1 w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
				/>
			</div>

			<div class="mb-4">
				<label for="confirm-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
				<input
					type="password"
					id="confirm-password"
					bind:value={confirmPassword}
					required
					class="mt-1 w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
				/>
			</div>

			<button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
				Sign Up
			</button>
		</form>

		<p class="mt-4 text-sm text-gray-600 dark:text-gray-300">
			Already have an account? <a href="/login" class="text-blue-500 hover:underline">Log in</a>
		</p>
	</div>
</div>
