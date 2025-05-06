"use client";

import React from "react";
import { Permission } from "@/lib/rbac/permissions";
import { usePermission } from "@/hooks/usePermission";

interface PermissionGuardProps {
  permission: Permission | Permission[];
  children: React.ReactNode;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  children,
}) => {
  const { hasPermission } = usePermission();

  if (!hasPermission(permission)) {
    return null;
  }

  return <>{children}</>;
};

export default PermissionGuard;