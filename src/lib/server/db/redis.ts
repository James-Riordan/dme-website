import Redis from 'ioredis';
import { env } from '$env/dynamic/private';

if (!env.VALKEY_URL || !env.VALKEY_PORT) {
	throw new Error('Missing VALKEY configuration in environment variables');
}

export const redis = new Redis(Number(env.VALKEY_PORT), env.VALKEY_URL, {
	lazyConnect: true, // Avoid connecting on import
	reconnectOnError: () => 1, // Auto-reconnect on errors
	enableOfflineQueue: true, // Queue commands while reconnecting
});

redis.on('connect', () => console.log('✅ Connected to Redis (Valkey)'));
redis.on('error', (err) => console.error('❌ Redis connection error:', err));
