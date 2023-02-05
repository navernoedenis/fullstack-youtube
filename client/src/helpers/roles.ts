import { Role } from "types/user";

export function isAdminRole(roles: Role[]) {
  return roles.includes("Admin");
}

export function isRootRole(roles: Role[]) {
  return roles.includes("Root");
}

export function isAdminOrRoot(roles: Role[]) {
  const isAdmin = isAdminRole(roles);
  const isRoot = isRootRole(roles);
  return isAdmin || isRoot;
}
