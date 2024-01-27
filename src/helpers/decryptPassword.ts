import { constants, privateDecrypt } from "crypto";

export const decryptPassword = (
  passwordHash: string,
  privateKey: string,
): string => {
  try {
    return privateDecrypt(
      { key: privateKey, padding: constants.RSA_PKCS1_OAEP_PADDING },
      Buffer.from(passwordHash, "base64"),
    ).toString("utf-8");
  } catch (error) {
    console.log("error::", error);

    return passwordHash;
  }
};
