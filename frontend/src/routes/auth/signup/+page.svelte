<script lang="ts">
	import SignupForm from '$lib/components/auth/signupForm.svelte';
	import { goto } from '$app/navigation';

	function handleSignupSuccess() {
		goto('/'); // Redirect to home page after successful signup
	}
</script>

<div class="max-w-md mx-auto mt-10">
	<h1 class="text-2xl font-bold mb-5">Sign Up</h1>
	<SignupForm onSuccess={handleSignupSuccess} />
	<p class="mt-4 text-center">
		Already have an account? <a href="/auth/login" class="text-blue-500 hover:underline">Login</a>
	</p>
</div>
