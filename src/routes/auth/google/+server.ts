import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { db } from '$lib/server/db/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { createSession } from '$lib/server/auth/session';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = 'http://localhost:5173/auth/google/callback';

const oauthClient = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI);

export async function GET({ url }) {
  const code = url.searchParams.get('code');
  if (!code) throw redirect(303, '/auth');

  const { tokens } = await oauthClient.getToken(code);
  oauthClient.setCredentials(tokens);

  const ticket = await oauthClient.verifyIdToken({ idToken: tokens.id_token!, audience: GOOGLE_CLIENT_ID });
  const payload = ticket.getPayload();
  if (!payload) throw redirect(303, '/auth');

  const googleId = payload.sub;
  const email = payload.email;

  const existingUser = await db.select().from(users).where(eq(users.googleId, googleId)).limit(1);

  if (!existingUser) {
    await db.insert(users).values({ id: crypto.randomUUID(), email, googleId });
  }

  const token = await PASETO.sign({ userId: googleId });
  return createSession(token);
}
