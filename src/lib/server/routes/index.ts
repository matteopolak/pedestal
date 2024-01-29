import { router } from '$lib/server/trpc';

import post from './post';

export const app = router({
	post,
});

export default app;
export type Router = typeof app;
