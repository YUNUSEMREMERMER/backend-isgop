import { UserRoleValue } from "../utils/user-role";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRoleValue;
      };
    }
  }
}

export {};
