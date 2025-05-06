export type Role = "admin" | "moderator" | "user";

import { Permission } from "@/lib/rbac/permissions";

export interface User {
  id: number;
  email: string;
  password?: string;
  name?: string;
  role: Role;
  permissions: Permission[];
}