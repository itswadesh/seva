<script lang="ts">
	import { page } from '$app/state'
	import { ChevronRight, Home } from 'lucide-svelte'

	let { product }: { product?: Record<string, any> } = $props()

	let items = $state([])
	let isProductsPage = $derived(page.url?.pathname?.includes?.('products'))

	$effect(() => {
		let paths: any[] = page.url?.pathname
			?.split?.('/')
			?.filter?.(Boolean)
			?.map?.((p) => {
				return {
					name: p,
					isCategory: false
				}
			})
		let categories = []
		if (isProductsPage && paths?.length > 0 && product?.categories?.length) {
			paths = paths?.filter((p) => p.name !== 'products')
			categories = product?.categories?.map((c: any) => {
				return {
					name: c?.category?.name,
					isCategory: true,
					href: `${c?.category?.slug || c?.category?.name}`
				}
			})
			if (categories?.length) {
				paths = [...categories, ...paths]
			}
		}
		items = paths.map((path, index) => {
			let href = ''
			if (path?.isCategory) {
				href = `/${path?.href}`
			} else {
				href =
					'/' +
					paths
						?.map((p) => p?.name)
						?.slice(0, index + 1)
						.join('/')
			}

			const titleCaseLabel = path?.name
				?.toLowerCase()
				?.replace(/-/g, ' ') // Remove hyphens and replace with spaces
				?.replace(/\b\w/g, (char: any) => char?.toUpperCase()) // Convert to title case

			return {
				label: titleCaseLabel,
				href
			}
		})
	})
</script>

<nav class="flex" aria-label="Breadcrumb">
	<ol class="inline-flex items-center space-x-1 text-sm md:space-x-2">
		<li class="inline-flex items-center">
			<a href="/" class="inline-flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
				<Home class="mr-2 h-4 w-4" />
				Home
			</a>
		</li>

		<div class="hidden sm:inline-flex md:items-center md:space-x-2">
			{#each items as { label, href }, i}
				<li>
					<div class="flex items-center">
						<ChevronRight class="h-4 w-4 text-gray-400" />
						{#if href && i < items.length - 1}
							<a {href} class="ml-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white md:ml-2">
								{label}
							</a>
						{:else}
							<span class="ml-1 text-gray-600 dark:text-gray-300 md:ml-2">{label}</span>
						{/if}
					</div>
				</li>
			{/each}
		</div>

		<div class="flex sm:hidden">
			{#if items?.length > 1}
				<li>
					<div class="flex items-center">
						<ChevronRight class="h-4 w-4 text-gray-400" />
						<span class="ml-1 text-gray-600 dark:text-gray-300 md:ml-2">...</span>
						<ChevronRight class="h-4 w-4 text-gray-400" />
					</div>
				</li>
			{/if}
			<li>
				<div class="grid grid-cols-1">
					<a
						href={items?.[items?.length - 1]?.href}
						class="ml-1 truncate text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white md:ml-2"
					>
						{items?.[items?.length - 1]?.label}
					</a>
				</div>
			</li>
		</div>
	</ol>
</nav>
