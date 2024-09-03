<script lang="ts">
	import LoginForm from '$lib/components/auth/loginForm.svelte';
	import { goto } from '$app/navigation';

	function handleLoginSuccess() {
		goto('/'); // Redirect to home page after successful login
	}
</script>

<div class="max-w-md mx-auto mt-10">
	<h1 class="text-2xl font-bold mb-5">Login</h1>
	<LoginForm onSuccess={handleLoginSuccess} />
	<p class="mt-4 text-center">
		Don't have an account? <a href="/auth/signup" class="text-blue-500 hover:underline">Sign up</a>
	</p>
</div>
