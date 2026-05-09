import { UserRoleValue } from "../utils/user-role";

export type RegisterInput = {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: UserRoleValue;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: UserRoleValue;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  user: AuthUser;
  accessToken: string;
};
