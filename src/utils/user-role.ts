import { UserRole as PrismaUserRole } from "@prisma/client";

export const userRoleValues = [
  "accounting",
  "operation",
  "expert",
  "worker",
  "admin",
  "unit_manager",
] as const;

export type UserRoleValue = (typeof userRoleValues)[number];
type PrismaUserRoleValue = (typeof PrismaUserRole)[keyof typeof PrismaUserRole];

const userRoleToPrismaMap: Record<UserRoleValue, PrismaUserRoleValue> = {
  accounting: PrismaUserRole.ACCOUNTING,
  operation: PrismaUserRole.OPERATION,
  expert: PrismaUserRole.EXPERT,
  worker: PrismaUserRole.WORKER,
  admin: PrismaUserRole.ADMIN,
  unit_manager: PrismaUserRole.UNIT_MANAGER,
};

const prismaRoleToUserRoleMap: Record<PrismaUserRoleValue, UserRoleValue> = {
  ACCOUNTING: "accounting",
  OPERATION: "operation",
  EXPERT: "expert",
  WORKER: "worker",
  ADMIN: "admin",
  UNIT_MANAGER: "unit_manager",
};

export const isUserRoleValue = (value: string): value is UserRoleValue => {
  return userRoleValues.includes(value as UserRoleValue);
};

export const toPrismaUserRole = (role: UserRoleValue) => {
  return userRoleToPrismaMap[role];
};

export const fromPrismaUserRole = (role: PrismaUserRoleValue) => {
  return prismaRoleToUserRoleMap[role];
};
