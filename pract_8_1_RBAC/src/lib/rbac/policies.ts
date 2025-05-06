import { permissions, Permission } from "./permissions";
import { Role } from "@/types";

export function hasPermission(
  role: Role,
  permission: Permission | Permission[],
): boolean {
  const rolePermissions = permissions[role] || [];
  if (Array.isArray(permission)) {
    return permission.every((perm) =>
      rolePermissions.some(
        (p) => p.action === perm.action && p.resource === perm.resource,
      ),
    );
  }
  return rolePermissions.some(
    (perm) =>
      perm.action === permission.action &&
      perm.resource === permission.resource,
  );
}
