<script>
	import { onMount } from 'svelte';
	import Logo from '$lib/components/Logo.svelte';
	import DesktopMenu from '$lib/components/DesktopMenu.svelte';
	import MobileMenu from '$lib/components/MobileMenu.svelte';
	import AuthButtons from '$lib/components/AuthButtons.svelte';

	let isMenuOpen = false;
	let isScrolled = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function handleClickOutside(event) {
		if (isMenuOpen && !event.target.closest('nav')) {
			isMenuOpen = false;
		}
	}

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
			<div class="flex-shrink-0">
				<Logo />
			</div>

			<DesktopMenu />

			<div class="hidden md:block">
				<AuthButtons />
			</div>

			<div class="md:hidden">
				<button
					on:click={toggleMenu}
					type="button"
					class="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
					aria-controls="mobile-menu"
					aria-expanded={isMenuOpen}
				>
					<span class="sr-only">Open main menu</span>
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

	<MobileMenu isOpen={isMenuOpen} />

	{#if isMenuOpen}
		<div class="md:hidden pt-4 pb-3 border-t border-gray-200">
			<AuthButtons isMobile={true} />
		</div>
	{/if}
</nav>
