import React from "react";
import { Role } from "@/types";
import { usePermission } from "@/hooks/usePermission";

interface RoleGuardProps {
  role: Role | Role[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
  requireAll?: boolean;
}

const RoleGuard: React.FC<RoleGuardProps> = ({
  role,
  fallback = null,
  children,
  requireAll = false,
}) => {
  const { hasRole, loading } = usePermission();
  if (loading) {
    return null;
  }

  let hasAccess = false;

  if (Array.isArray(role) && requireAll) {
    hasAccess = role.every((r) => hasRole(r));
  } else {
    hasAccess = hasRole(role);
  }

  if (hasAccess) {
    return <>{children}</>;
  }
  return <>{fallback}</>;
};

export default RoleGuard;
