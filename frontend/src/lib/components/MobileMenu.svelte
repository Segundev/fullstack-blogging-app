<script>
	export let isOpen = false;
	export let items = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<div class:hidden={!isOpen} class="md:hidden" id="mobile-menu">
	<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
		{#each items as item}
			<a
				href={item.href}
				class="text-gray-800 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium"
				aria-current={item.href === '/' ? 'page' : undefined}
			>
				{item.label}
			</a>
		{/each}
	</div>
</div>
