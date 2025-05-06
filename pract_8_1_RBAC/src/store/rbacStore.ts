import { create } from "zustand";
import { Permission } from "@/lib/rbac/permissions";
import { Role } from "@/types";

interface RBACState {
  userPermissions: Permission[];
  userRoles: Role[];
  hasPermission: (permission: Permission | Permission[]) => boolean;
  hasRole: (role: Role | Role[]) => boolean;
  hasRoleAtLeast: (minimumRole: Role) => boolean;
  getUserPermissions: () => Permission[];
  getUserRoles: () => Role[];
}

const useRBACStore = create<RBACState>((set, get) => ({
  userPermissions: [],
  userRoles: [],
  hasPermission: (permission: Permission | Permission[]) => {
    const state = get();
    const permissions = Array.isArray(permission) ? permission : [permission];
    return permissions.every((p) =>
      state.userPermissions.some(
        (up) => up.action === p.action && up.resource === p.resource
      )
    );
  },
  hasRole: (role: Role | Role[]) => {
    const state = get();
    const roles = Array.isArray(role) ? role : [role];
    return roles.some((r) => state.userRoles.includes(r));
  },
  hasRoleAtLeast: (minimumRole: Role) => {
    const state = get();
    const roleHierarchy: Record<Role, number> = {
      admin: 3,
      moderator: 2,
      user: 1,
    };
    const userRole = state.userRoles[0] || "user";
    return roleHierarchy[userRole] >= roleHierarchy[minimumRole];
  },
  getUserPermissions: () => get().userPermissions,
  getUserRoles: () => get().userRoles,
}));

export default useRBACStore;
