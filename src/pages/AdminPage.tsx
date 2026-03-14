import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/admin";
import Avatar from "../components/ui/Avatar";
import { RoleBadge, VerifiedBadge } from "../components/ui/Badge";
import { Loader2, Users, AlertCircle } from "lucide-react";

export default function AdminPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-users"],
    queryFn: getAllUsers,
    staleTime: 30_000,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-brand-navy">User Management</h1>
        {data && (
          <span className="text-sm text-gray-400 font-medium">
            {data.length} user{data.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {isLoading && (
        <div className="flex justify-center py-20">
          <Loader2 size={32} className="animate-spin text-brand-orange" />
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center gap-3 text-red-600">
          <AlertCircle size={20} />
          <span className="text-sm font-medium">
            Failed to load users. You may not have admin access.
          </span>
        </div>
      )}

      {data?.length === 0 && (
        <div className="flex flex-col items-center py-20 text-gray-300">
          <Users size={40} />
          <p className="mt-3 text-sm">No users found.</p>
        </div>
      )}

      {/* Desktop table */}
      {data && data.length > 0 && (
        <>
          <div className="hidden sm:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold text-gray-500">User</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-500">Mobile</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-500">Role</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-500">Status</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-500">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.map((u, i) => (
                  <tr key={i} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={u.name} src={u.profile_pic} size="sm" />
                        <div>
                          <p className="font-semibold text-brand-navy">{u.name}</p>
                          <p className="text-gray-400 text-xs">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{u.mob_no}</td>
                    <td className="px-6 py-4">
                      <RoleBadge role={u.role} />
                    </td>
                    <td className="px-6 py-4">
                      <VerifiedBadge verified={u.is_verified} />
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">
                      {u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden space-y-3">
            {data.map((u, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar name={u.name} src={u.profile_pic} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-brand-navy truncate">{u.name}</p>
                    <p className="text-xs text-gray-400 truncate">{u.email}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <RoleBadge role={u.role} />
                  <VerifiedBadge verified={u.is_verified} />
                </div>
                <p className="text-xs text-gray-400 mt-2">📱 {u.mob_no}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}