import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const bcryptHash = async (password: string) => {
	return await bcrypt.hash(password, SALT_ROUNDS);
};

export const bcryptCompare = async (password: string, hash: string) => {
	return await bcrypt.compare(password, hash);
};
