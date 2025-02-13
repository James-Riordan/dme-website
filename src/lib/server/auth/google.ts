import { OAuth2Client } from 'google-auth-library';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { setSessionTokenCookie } from '$lib/server/auth';
import { PASETO } from './paseto';
import type { RequestEvent } from '@sveltejs/kit';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = 'http://localhost:5173/auth/google/callback'; // TODO dynamic URL

const oauthClient = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI);

export async function handleGoogleAuth(code: string, event: RequestEvent) {
	const { tokens } = await oauthClient.getToken(code);
	oauthClient.setCredentials(tokens);

	const ticket = await oauthClient.verifyIdToken({
		idToken: tokens.id_token!,
		audience: GOOGLE_CLIENT_ID,
	});

	const payload = ticket.getPayload();
	if (!payload) throw new Error('Google login failed');

	const googleId = payload.sub ?? crypto.randomUUID(); // Ensure googleId is always set
	const email = payload.email ?? 'unknown@example.com'; // Provide fallback email

	// Generate a username: use Google's `name`, or fallback to email prefix, or fallback to googleId substring
	const username = payload.name
		?? email.split('@')[0] // Use first part of email if name is missing
		?? `user_${googleId.slice(0, 8)}`; // Fallback to `user_abcdef12`

	let [user] = await db.select().from(users).where(eq(users.googleId, googleId)).limit(1);

	if (!user) {
		[user] = await db
			.insert(users)
			.values({
				id: crypto.randomUUID(),
				email,
				googleId,
				username, // ✅ Now including username
			})
			.returning();
	}

	const token = await PASETO.sign({ userId: googleId });
	setSessionTokenCookie(event, token, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

	return user;
}
