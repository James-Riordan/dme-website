import type { Cookies } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { users, sessions } from '$lib/server/db/schema';
import { bcryptHash, bcryptCompare } from '$lib/server/auth/bcrypt';
import { PASETO } from '$lib/server/auth/paseto';
import { redis } from '$lib/server/db/redis';

const DAY_IN_MS = 1000 * 60 * 60 * 24;
const SESSION_EXPIRY_MS = DAY_IN_MS * 30; // 30 days

export const sessionCookieName = 'auth-session';

/**
 * Create a new user with hashed password
 */
export async function createUser(email: string, username: string, password: string) {
	const hashedPassword = await bcryptHash(password);
	const newUser = {
		id: crypto.randomUUID(),
		email,
		username,
		passwordHash: hashedPassword,
		isAdmin: false // Default to non-admin
	};

	try {
		const [user] = await db.insert(users).values(newUser).returning();
		return user;
	} catch (e) {
		throw new Error('User already exists');
	}
}

/**
 * Authenticate user and return session token
 */
export async function authenticateUser(email: string, password: string) {
	const [user] = await db
		.select({
			id: users.id,
			email: users.email,
			passwordHash: users.passwordHash,
			isAdmin: users.isAdmin // ✅ Include admin flag
		})
		.from(users)
		.where(eq(users.email, email))
		.limit(1);

	if (!user || !user.passwordHash || !(await bcryptCompare(password, user.passwordHash))) {
		throw new Error('Invalid credentials');
	}

	const token = await PASETO.sign({ userId: user.id, isAdmin: user.isAdmin }); // ✅ Include `isAdmin` in PASETO token
	await redis.set(token, 'valid', 'EX', SESSION_EXPIRY_MS / 1000);

	return { token, user };
}

/**
 * Validate session token and return user data
 */
export async function validateSessionToken(token: string) {
	const isValid = await redis.get(token);
	if (!isValid) return null;

	try {
		const payload = await PASETO.verify(token);
		const [user] = await db
			.select({
				id: users.id,
				email: users.email,

				isAdmin: users.isAdmin
			})
			.from(users)
			.where(eq(users.id, payload.userId as string))
			.limit(1);

		if (!user) return null;

		return { user, isAdmin: payload.isAdmin }; // ✅ Include admin flag
	} catch {
		return null;
	}
}

/**
 * Set session token in cookies
 */
export function setSessionTokenCookie(cookies: Cookies, token: string, expiresAt: Date) {
	cookies.set(sessionCookieName, token, { expires: expiresAt, path: '/' });
}

/**
 * Delete session token from cookies
 */
export function deleteSessionTokenCookie(cookies: Cookies) {
	cookies.delete(sessionCookieName, { path: '/' });
}
