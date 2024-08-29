<script>
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.css'; // Assuming you have a global CSS file
</script>

<NavBar />

<main>
	<slot />
</main>

<footer>
	<!-- Footer content -->
</footer>
