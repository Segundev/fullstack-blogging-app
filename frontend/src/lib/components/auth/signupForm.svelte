<script lang="ts">
	import { signup, isLoading } from '$lib/stores/authStores';
	import {
		validateEmail,
		validatePassword,
		validateUsername,
		validateFullName
	} from '$lib/validation';

	export let onSuccess = () => {}; // Callback for successful signup

	let fullName = '';
	let username = '';
	let email = '';
	let password = '';

	interface Errors {
		fullName?: string;
		username?: string;
		email?: string;
		password?: string;
		form?: string;
	}

	let errors: Errors = {};

	async function handleSubmit() {
		errors = {};
		if (!validateFullName(fullName)) errors.fullName = 'Full name is required';
		if (!validateUsername(username))
			errors.username =
				'Username must be 3-20 characters long and contain only letters, numbers, and underscores';
		if (!validateEmail(email)) errors.email = 'Invalid email address';
		if (!validatePassword(password))
			errors.password = 'Password must be at least 8 characters long';

		if (Object.keys(errors).length === 0) {
			try {
				await signup({ fullName, username, email, password });
				onSuccess();
			} catch (error) {
				errors.form = error instanceof Error ? error.message : 'An unknown error occurred';
			}
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
	<div>
		<label for="fullName" class="block mb-2">Full Name</label>
		<input
			type="text"
			id="fullName"
			bind:value={fullName}
			class="w-full px-3 py-2 border rounded-md {errors.fullName ? 'border-red-500' : ''}"
		/>
		{#if errors.fullName}<p class="text-red-500 text-sm mt-1">{errors.fullName}</p>{/if}
	</div>
	<div>
		<label for="username" class="block mb-2">Username</label>
		<input
			type="text"
			id="username"
			bind:value={username}
			class="w-full px-3 py-2 border rounded-md {errors.username ? 'border-red-500' : ''}"
		/>
		{#if errors.username}<p class="text-red-500 text-sm mt-1">{errors.username}</p>{/if}
	</div>
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
		class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
		disabled={$isLoading}
	>
		{$isLoading ? 'Signing up...' : 'Sign Up'}
	</button>
	{#if errors.form}<p class="text-red-500 text-sm mt-2">{errors.form}</p>{/if}
</form>
