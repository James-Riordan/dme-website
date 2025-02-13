import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { authenticateUser, validateSessionToken, setSessionTokenCookie, deleteSessionTokenCookie } from '$lib/server/auth';
import { handleGoogleAuth } from '$lib/server/auth/google';

export const actions = {
  login: async (event: RequestEvent) => {
    const { request, cookies } = event;
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) throw error(400, 'Missing email or password');

    try {
      const { token, user } = await authenticateUser(email, password);
      setSessionTokenCookie(event, token, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
      return { success: true, user };
    } catch {
      throw error(401, 'Invalid credentials');
    }
  },

  logout: async (event: RequestEvent) => {
    deleteSessionTokenCookie(event);
    throw redirect(303, '/');
  },

  google: async (event: RequestEvent) => {
    const code = event.url.searchParams.get('code');
    if (!code) throw redirect(303, '/auth');

    await handleGoogleAuth(code, event);
    throw redirect(303, '/');
  },
};
