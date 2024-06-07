import { BEARER_TOKEN_PREFIX } from "./constant";

export const extractToken = (bearerToken: string) => {
  const isBearerToken = bearerToken.startsWith(BEARER_TOKEN_PREFIX);

  if (!isBearerToken) {
    return "";
  }

  const token = bearerToken.replace(BEARER_TOKEN_PREFIX, "");

  return token;
};
