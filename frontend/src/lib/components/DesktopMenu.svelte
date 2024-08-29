<script>
	export let items = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<div class="hidden md:block">
	<div class="ml-10 flex items-baseline space-x-4">
		{#each items as item}
			<a
				href={item.href}
				class="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-semibold"
				aria-current={item.href === '/' ? 'page' : undefined}
			>
				{item.label}
			</a>
		{/each}
	</div>
</div>
