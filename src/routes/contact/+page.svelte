<script lang="ts">
	let name = '';
	let email = '';
	let message = '';

	function submitForm(event: Event) {
		event.preventDefault();
		// Replace with your backend endpoint or email service integration
		console.log({ name, email, message });
		alert('Thank you for reaching out! We will get back to you shortly.');
		name = '';
		email = '';
		message = '';
	}
</script>

<section class="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-12">
	<div class="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
		<h1 class="mb-6 text-center text-2xl font-bold text-gray-800">Contact Us</h1>
		<p class="mb-8 text-center text-gray-600">
			We'd love to hear from you! Fill out the form below and we'll get back to you as soon as
			possible.
		</p>
		<form on:submit|preventDefault={submitForm} class="space-y-6">
			<div>
				<label for="name" class="mb-1 block text-sm font-medium text-gray-700">Your Name</label>
				<input
					id="name"
					type="text"
					bind:value={name}
					placeholder="Enter your name"
					class="block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
					required
				/>
			</div>
			<div>
				<label for="email" class="mb-1 block text-sm font-medium text-gray-700">Your Email</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					placeholder="Enter your email"
					class="block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
					required
				/>
			</div>
			<div>
				<label for="message" class="mb-1 block text-sm font-medium text-gray-700"
					>Your Message</label
				>
				<textarea
					id="message"
					bind:value={message}
					placeholder="Write your message"
					rows="5"
					class="block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
					required
				></textarea>
			</div>
			<button
				type="submit"
				class="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
			>
				Send Message
			</button>
		</form>
	</div>
</section>
