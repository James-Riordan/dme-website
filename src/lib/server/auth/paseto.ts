import { generateKeys, encrypt, decrypt } from "paseto-ts/v4";

// Generate a local key in PASERK format
const localKey = generateKeys("local", { format: "paserk" });

export const PASETO = {
  sign: async (data: Record<string, unknown>) => {
    return encrypt(localKey, data, { addExp: true, addIat: true }); // Adds issued-at (iat) and expiration (exp)
  },

  verify: async (token: string) => {
    try {
      const { payload } = decrypt(localKey, token, { validatePayload: true });
      return payload;
    } catch (err) {
      console.error("PASETO verification failed:", err);
      throw new Error("Invalid or expired token");
    }
  }
};
