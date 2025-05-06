"use client";

import { createContext, ReactNode, useContext } from "react";
import useRBACStore from "@/store/rbacStore"; // Исправлено: Импортируем useRBACStore
import { Permission } from "@/lib/rbac/permissions";
import { Role } from "@/types";

export interface RBACContextType {
  hasPermission: (permission: Permission | Permission[]) => boolean;
  hasRole: (role: Role | Role[]) => boolean;
  hasRoleAtLeast: (minimumRole: Role) => boolean;
  getUserPermissions: () => Permission[];
  getUserRoles: () => Role[];
}

const RBACContext = createContext<RBACContextType | null>(null);

export const useRBAC = (): RBACContextType => {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error("useRBAC must be used within RBACProvider");
  }
  return context;
};

export const RBACProvider = ({ children }: { children: ReactNode }) => {
  const {
    hasPermission,
    hasRole,
    hasRoleAtLeast,
    getUserPermissions,
    getUserRoles,
  } = useRBACStore();

  return (
    <RBACContext.Provider
      value={{
        hasPermission,
        hasRole,
        hasRoleAtLeast,
        getUserPermissions,
        getUserRoles,
      }}
    >
      {children}
    </RBACContext.Provider>
  );
};
