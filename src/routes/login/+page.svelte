<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form method="post">
	{#if form?.message}
		<div>{form.message}</div>
	{/if}

	<input
		type="text"
		name="username"
		placeholder="Username"
		required
		maxlength={39}
	/>

	<input
		type="password"
		name="password"
		placeholder="Password"
		required
		maxlength={255}
	/>

	<button type="submit">
		Log in
	</button>
</form>
