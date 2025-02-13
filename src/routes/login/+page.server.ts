import { error, redirect, type Actions } from '@sveltejs/kit';
import { authenticateUser, setSessionTokenCookie } from '$lib/server/auth';

export const actions: Actions = {
	login: async ({ request, cookies }) => { // ✅ Destructure correctly
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			throw error(400, 'Missing email or password');
		}

		try {
			const { token, user } = await authenticateUser(email, password);
			setSessionTokenCookie(cookies, token, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)); // ✅ FIXED: Pass `cookies` directly
			return { success: true, user };
		} catch {
			throw error(401, 'Invalid credentials');
		}
	},

	logout: async ({ cookies }) => { // ✅ Destructure correctly
		cookies.delete('auth-session', { path: '/' });
		throw redirect(303, '/');
	},
};
