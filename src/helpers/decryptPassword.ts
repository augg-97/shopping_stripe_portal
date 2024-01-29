import { constants, privateDecrypt } from "crypto";

export const decryptPassword = (
  passwordHash: string,
  privateKey: string,
): string => {
  return privateDecrypt(
    { key: privateKey, padding: constants.RSA_PKCS1_OAEP_PADDING },
    Buffer.from(passwordHash, "base64"),
  ).toString("utf-8");
};
