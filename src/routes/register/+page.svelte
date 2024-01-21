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
		name="name"
		placeholder="Name"
		required
		maxlength={255}
	/>

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
		class="input input-bordered"
		placeholder="Password"
		required
		maxlength={255}
	/>

	<button type="submit">
		Sign up
	</button>

	<div class="divider" />
</form>

