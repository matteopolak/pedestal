// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
	}

	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = {
			name: string;
			username: string;
			thumbnail: string | null;
		};
		type DatabaseSessionAttributes = Record<string, never>;
	}
}

export { };
