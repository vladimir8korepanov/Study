import { Role } from "@/types";

//описание ролей в системе RBAC
export const ROLES: Record<Role, string> = {
  admin: "Администратоp",
  moderator: "Модератор",
  user: "Пользователь",
};

//настройка приоритетов полей, больше знеачение = больше прав
export const ROLE_PRIORITIES: Record<Role, number> = {
  admin: 100,
  moderator: 75,
  user: 50,
};

//проверка наличия роли у пользователя
export const hasRole = (
  userRoles: Role[],
  requiredRole: Role | Role[],
): boolean => {
  if (Array.isArray(requiredRole)) {
    return requiredRole.some((role) => userRoles.includes(role));
  }
  return userRoles.includes(requiredRole);
};

//получение максимального приоритета роли пользователя
export const getMaxRolePriority = (userRoles: Role[]): number => {
  return Math.max(...userRoles.map((role) => ROLE_PRIORITIES[role]));
};

//проверка имеет ли поль-тель роль приоритетом выше или равным указанной роли
export const hasRoleAtLeast = (
  userRoles: Role[],
  minimunRole: Role,
): boolean => {
  const userMaxPriority = getMaxRolePriority(userRoles);
  return userMaxPriority >= ROLE_PRIORITIES[minimunRole];
};

