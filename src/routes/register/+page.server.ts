import { error, type Actions } from '@sveltejs/kit';
import { createUser } from '$lib/server/auth';

export const actions: Actions = {
	signup: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		if (!email || !username || !password) {
			throw error(400, 'All fields are required.');
		}

		try {
			const user = await createUser(email, username, password);
			return { success: true, user };
		} catch (e) {
			const err = e as Error;
			throw error(400, err.message || 'Failed to create account.');
		}
	}
};
