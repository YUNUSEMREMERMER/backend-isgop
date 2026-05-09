import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import { UserRoleValue } from "./user-role";

type AccessTokenPayload = {
  sub: string;
  role: UserRoleValue;
};

export const signAccessToken = (payload: AccessTokenPayload) => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.jwtSecret) as AccessTokenPayload;
};
