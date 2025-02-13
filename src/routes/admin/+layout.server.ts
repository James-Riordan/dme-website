import { redirect, type RequestEvent } from '@sveltejs/kit';
import { validateSessionToken } from '$lib/server/auth';

export async function load(event: RequestEvent) {
	const session = event.cookies.get('auth-session');
	if (!session) throw redirect(303, '/login');

	const { user, isAdmin } = await validateSessionToken(session) ?? {};
	if (!user || !isAdmin) throw redirect(303, '/dashboard'); // ✅ Redirect non-admins

	return { user, isAdmin };
}
