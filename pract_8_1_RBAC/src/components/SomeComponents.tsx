import { usePermission } from "@/hooks/usePermission";

const SomeComponent = () => {
  const { hasPermission } = usePermission();
  const canEdit = hasPermission({ action: "create", resource: "post" });

  return <div>{canEdit && <button>Edit User</button>}</div>;
};

export default SomeComponent;
