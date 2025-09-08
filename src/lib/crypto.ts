import { randomBytes, createCipheriv, createDecipheriv } from "node:crypto";

const ALGO = "aes-256-gcm";

function getKey(): Buffer {
  const base64 = process.env.ENCRYPTION_KEY;
  if (!base64) throw new Error("ENCRYPTION_KEY is not set");
  const key = Buffer.from(base64, "base64");
  if (key.length !== 32) throw new Error("ENCRYPTION_KEY must be 32 bytes (base64)");
  return key;
}

export type EncryptedPayload = {
  iv: string; // base64
  tag: string; // base64 auth tag
  ciphertext: string; // base64
};

export function encryptToJson(plainText: string): EncryptedPayload {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGO, getKey(), iv, { authTagLength: 16 });
  const ciphertext = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    ciphertext: ciphertext.toString("base64"),
  };
}

export function decryptFromJson(payload: EncryptedPayload): string {
  const iv = Buffer.from(payload.iv, "base64");
  const tag = Buffer.from(payload.tag, "base64");
  const decipher = createDecipheriv(ALGO, getKey(), iv, { authTagLength: 16 });
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(payload.ciphertext, "base64")),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}

export function encryptToBytes(plainText: string): Buffer {
  const { iv, tag, ciphertext } = encryptToJson(plainText);
  return Buffer.concat([
    Buffer.from(iv, "base64"),
    Buffer.from(tag, "base64"),
    Buffer.from(ciphertext, "base64"),
  ]);
}

export function decryptFromBytes(buffer: Buffer): string {
  const iv = buffer.subarray(0, 12);
  const tag = buffer.subarray(12, 28);
  const ciphertext = buffer.subarray(28);
  return decryptFromJson({ iv: iv.toString("base64"), tag: tag.toString("base64"), ciphertext: ciphertext.toString("base64") });
}

