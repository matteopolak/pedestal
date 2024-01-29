<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	
	import { trpc } from '$lib/client';

	const randomPost = createQuery({
		queryKey: ['randomPost'],
		queryFn: () => trpc.post.random.query(),
	});

	async function createPost() {
		await trpc.post.create.mutate({ title, description });
	}

	let title = '';
	let description = '';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if $randomPost.isLoading}
	Loading random post...
{:else if $randomPost.isError}
	Error: {$randomPost.error.message}
{:else}
	{JSON.stringify($randomPost.data, null, 2)}
{/if}

<form on:submit|preventDefault={createPost}>
	<input type="text" placeholder="Post title" bind:value={title} />
	<textarea placeholder="Post description" bind:value={description} />

	<button>
		Submit
	</button>
</form>
