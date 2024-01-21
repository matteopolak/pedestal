<script lang="ts">
	import { onMount } from 'svelte';

	import { goto, invalidateAll } from '$app/navigation';

	onMount(async () => {
		await invalidateAll();
		goto('/');
	});
</script>
