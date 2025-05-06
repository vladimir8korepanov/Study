import { useAuth } from "@/providers/AuthProvider";
import useRBACStore from "@/store/rbacStore";
import { Permission } from "@/lib/rbac/permissions";
import { Role } from "@/types";
import { useEffect } from "react";

export const usePermission = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { hasPermission: rbacHasPermission, hasRole: rbacHasRole } = useRBACStore();

  useEffect(() => {
    if (user && isAuthenticated) {
      useRBACStore.setState({
        userPermissions: user.permissions || [],
        userRoles: [user.role],
      });
    } else {
      useRBACStore.setState({ userPermissions: [], userRoles: [] });
    }
  }, [user, isAuthenticated]);

  const hasPermission = (permission: Permission | Permission[]) => {
    if (!user || !isAuthenticated) return false;
    return rbacHasPermission(permission);
  };

  const hasRole = (role: Role | Role[]) => {
    if (!user || !isAuthenticated) return false;
    return rbacHasRole(role);
  };

  return {
    hasPermission,
    hasRole,
    isAuthenticated,
    loading: authLoading,
  };
};