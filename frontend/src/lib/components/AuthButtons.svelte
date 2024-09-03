<script>
	import { goto } from '$app/navigation';

	export let isMobile = false;

	function navigateToLogin() {
		goto('/auth/login');
	}

	function navigateToSignup() {
		goto('/auth/signup');
	}
</script>

<div class={isMobile ? 'flex items-center px-5' : ''}>
	<button
		on:click={navigateToLogin}
		class="text-gray-900 text-sm font-semibold py-2 px-4 rounded mr-2 {isMobile ? 'w-full' : ''}"
		>Login</button
	>
	<button
		on:click={navigateToSignup}
		class=" text-gray-950 text-sm font-semibold py-2 px-4 rounded {isMobile ? 'w-full' : ''}"
		>Register</button
	>
</div>
