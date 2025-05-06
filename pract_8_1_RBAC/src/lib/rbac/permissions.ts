export type Action = "read" | "write" | "create" | "delete";
export type Resource = "dashboard" | "post" | "posts" | "user" | "settings" | "admin";

export interface Permission {
  action: Action;
  resource: Resource;
}

export const permissions: Record<string, Permission[]> = {
  admin: [
    { action: "read", resource: "dashboard" },
    { action: "write", resource: "dashboard" },
    { action: "create", resource: "post" },
    { action: "delete", resource: "post" },
    { action: "write", resource: "admin" },
  ],
  moderator: [
    { action: "read", resource: "dashboard" },
    { action: "write", resource: "posts" },
    { action: "create", resource: "posts" },
  ],
  user: [
    { action: "read", resource: "dashboard" },
    { action: "read", resource: "post" },
  ],
};
