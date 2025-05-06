import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Permission } from "@/lib/rbac/permissions";
import { Role } from "@/types";
import { usePermission } from "@/hooks/usePermission";

interface ProtectedRouteProps {
  children: React.ReactNode;
  permission?: Permission | Permission[];
  role?: Role | Role[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  permission,
  role,
  redirectTo = "/login",
}) => {
  const router = useRouter();
  const { hasPermission, hasRole, isAuthenticated, loading } = usePermission();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (permission && !hasPermission(permission)) {
        router.push("/403");
        return;
      }

      if (role && !hasRole(role)) {
        router.push("/403");
        return;
      }
    }
  }, [
    isAuthenticated,
    loading,
    permission,
    role,
    router,
    hasPermission,
    hasRole,
    redirectTo,
  ]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Загрузка</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;