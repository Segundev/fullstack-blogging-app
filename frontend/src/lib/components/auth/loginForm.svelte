<script lang="ts">
	import { login, isLoading } from '$lib/stores/authStores';
	import { validateEmail, validatePassword } from '$lib/validation';

	type Errors = { [key: string]: string };

	export let onSuccess = () => {}; // Callback for successful login

	let email = '';
	let password = '';
	let errors: Errors = {};

	async function handleSubmit() {
		errors = {};
		if (!validateEmail(email)) errors.email = 'Invalid email address';
		if (!validatePassword(password))
			errors.password = 'Password must be at least 8 characters long';

		if (Object.keys(errors).length === 0) {
			try {
				await login(email, password);
				onSuccess();
			} catch (error) {
				errors.form = error instanceof Error ? error.message : 'An unknown error occurred';
			}
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
	<div>
		<label for="email" class="block mb-2">Email</label>
		<input
			type="email"
			id="email"
			bind:value={email}
			class="w-full px-3 py-2 border rounded-md {errors.email ? 'border-red-500' : ''}"
		/>
		{#if errors.email}<p class="text-red-500 text-sm mt-1">{errors.email}</p>{/if}
	</div>
	<div>
		<label for="password" class="block mb-2">Password</label>
		<input
			type="password"
			id="password"
			bind:value={password}
			class="w-full px-3 py-2 border rounded-md {errors.password ? 'border-red-500' : ''}"
		/>
		{#if errors.password}<p class="text-red-500 text-sm mt-1">{errors.password}</p>{/if}
	</div>
	<button
		type="submit"
		class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
		disabled={$isLoading}
	>
		{$isLoading ? 'Logging in...' : 'Login'}
	</button>
	{#if errors.form}<p class="text-red-500 text-sm mt-2">{errors.form}</p>{/if}
</form>
