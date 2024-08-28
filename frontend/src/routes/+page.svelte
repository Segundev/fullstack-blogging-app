<script lang="ts">
	import { onMount } from 'svelte';

	let isMenuOpen = false;
	let isScrolled = false;

	// Toggle mobile menu
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	// Close mobile menu when clicking outside
	function handleClickOutside(event) {
		if (isMenuOpen && !event.target.closest('nav')) {
			isMenuOpen = false;
		}
	}

	// Add scroll event listener to change navbar style
	onMount(() => {
		window.addEventListener('scroll', () => {
			isScrolled = window.scrollY > 20;
		});
	});
</script>

<svelte:window on:click={handleClickOutside} />

<nav
	class="fixed w-full z-10 transition-all duration-300 {isScrolled
		? 'bg-white shadow-md'
		: 'bg-transparent'}"
	aria-label="Main navigation"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<div class="flex-shrink-0 flex items-center">
				<img src="$lib/images/icons/logo-icon.svg" alt="Blogflow Logo" class="h-8 w-auto mr-2" />
				<a href="/" class="text-base font-bold text-gray-800">
					<span>Blogflow</span>
				</a>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:block">
				<div class="ml-10 flex items-baseline space-x-4 font-semibold">
					<a
						href="/"
						class="nav-link text-gray-800 px-3 py-2 rounded-md text-sm relative"
						aria-current="page">Home</a
					>
					<a href="/about" class="nav-link text-gray-800 px-3 py-2 rounded-md text-sm relative"
						>About</a
					>
					<a href="/contact" class="nav-link text-gray-800 px-3 py-2 rounded-md text-sm relative"
						>Contact</a
					>
				</div>
			</div>

			<!-- Login and Register Buttons -->
			<div class="hidden md:block text-sm">
				<button class="text-gray-950 font-semibold py-2 px-4 rounded mr-2">Login</button>
				<button class="text-gray-950 font-semibold py-2 px-4 rounded">Register</button>
			</div>

			<!-- Mobile menu button -->
			<div class="md:hidden">
				<button
					on:click={toggleMenu}
					type="button"
					class="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
					aria-controls="mobile-menu"
					aria-expanded={isMenuOpen}
				>
					<span class="sr-only">Open main menu</span>
					<!-- Icon when menu is closed -->
					<svg
						class:hidden={isMenuOpen}
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
					<!-- Icon when menu is open -->
					<svg
						class:hidden={!isMenuOpen}
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu -->
	<div class:hidden={!isMenuOpen} class="md:hidden" id="mobile-menu">
		<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
			<a
				href="/"
				class="text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium"
				aria-current="page">Home</a
			>
			<a
				href="/about"
				class="text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium"
				>About</a
			>
			<a
				href="/contact"
				class="text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium"
				>Contact</a
			>
		</div>
		<div class="pt-4 pb-3 border-t border-gray-200">
			<div class="flex items-center px-5">
				<button
					class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 w-full"
					>Login</button
				>
				<button
					class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
					>Register</button
				>
			</div>
		</div>
	</div>
</nav>

<style lang="postcss">
	:global(html) {
		@apply bg-gray-50;
	}

	.nav-link {
		transition: color 0.3s ease;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background: linear-gradient(to right, #3b82f6, #10b981);
		transition: width 0.3s ease;
	}

	.nav-link:hover {
		color: #4b5563;
	}

	.nav-link:hover::after {
		width: 100%;
	}
</style>
