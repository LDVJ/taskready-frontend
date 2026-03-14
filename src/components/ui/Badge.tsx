import clsx from "clsx";
import { Role } from "../../types";

// Mapping colors to roles for a consistent UI
const roleColors: Record<Role, string> = {
  admin: "bg-purple-100 text-purple-700 ring-purple-200",
  user: "bg-blue-100 text-blue-700 ring-blue-200",
  // Note: Ensure 'tasker' and 'member' are added to your Role type in types/index.ts
  // if you plan to use these specifically.
  tasker: "bg-amber-100 text-amber-700 ring-amber-200",
  member: "bg-green-100 text-green-700 ring-green-200",
};

/**
 * A pill-shaped badge to display user roles with distinct colors.
 */
export function RoleBadge({ role }: { role: Role }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1",
        roleColors[role] || "bg-gray-100 text-gray-700 ring-gray-200"
      )}
    >
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
}

/**
 * A status badge to show if a user's email/profile is verified.
 */
export function VerifiedBadge({ verified }: { verified?: boolean }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1",
        verified 
          ? "bg-green-100 text-green-700 ring-green-200" 
          : "bg-gray-100 text-gray-500 ring-gray-200"
      )}
    >
      {verified ? "✓ Verified" : "Unverified"}
    </span>
  );
}