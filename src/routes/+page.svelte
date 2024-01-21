<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	
	import { trpc } from '$lib/client';

	const hello = createQuery({
		queryKey: ['hello'],
		queryFn: () => trpc.hello.query(),
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if $hello.isLoading}
	Loading...
{:else if $hello.isError}
	Error: {$hello.error.message}
{:else}
	{$hello.data}
{/if}
