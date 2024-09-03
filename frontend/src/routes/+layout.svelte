<script context="module">
	import { checkAuth } from '$lib/stores/authStores';

	export async function load() {
		await checkAuth();
		return {};
	}
</script>

<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.css'; // Assuming you have a global CSS file

	import { user } from '$lib/stores/authStores';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	$: if ($page.url.pathname.startsWith('/protected') && !$user) {
		goto('/auth/login');
	}
</script>

<NavBar />

<main>
	<slot />
</main>

<footer>
	<!-- Footer content -->
</footer>
