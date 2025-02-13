import { validateSessionToken } from '$lib/server/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('auth-session');
	const session = token ? await validateSessionToken(token) : null;

	return {
		user: session?.user ?? null // ✅ Ensure `user` is always returned
	};
};
