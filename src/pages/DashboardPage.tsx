import { useAuthStore } from "../store/authStore";
import { RoleBadge, VerifiedBadge } from "../components/ui/Badge";
import Avatar from "../components/ui/Avatar";
import { CheckSquare, Clock, TrendingUp, Users } from "lucide-react";

const stats = [
  {
    label: "Tasks Assigned",
    value: "—",
    icon: <CheckSquare size={20} />,
    color: "bg-orange-50 text-brand-orange",
  },
  {
    label: "In Progress",
    value: "—",
    icon: <Clock size={20} />,
    color: "bg-blue-50 text-blue-500",
  },
  {
    label: "Completed",
    value: "—",
    icon: <TrendingUp size={20} />,
    color: "bg-green-50 text-green-500",
  },
  {
    label: "Team Members",
    value: "—",
    icon: <Users size={20} />,
    color: "bg-purple-50 text-purple-500",
  },
];

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-brand-navy to-blue-800 rounded-2xl p-6 sm:p-8 text-white">
        <div className="flex items-center gap-4">
          <Avatar
            name={user?.name ?? "U"}
            src={user?.profile_pic}
            size="lg"
          />
          <div>
            <p className="text-blue-200 text-sm">Welcome back,</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              {user?.name || "User"}
            </h1>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {user?.role && <RoleBadge role={user.role} />}
              <VerifiedBadge verified={user?.is_verified} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}
            >
              {s.icon}
            </div>
            <div>
              <p className="text-2xl font-extrabold text-brand-navy">
                {s.value}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder activity */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="font-bold text-brand-navy mb-4">Recent Activity</h2>
        <div className="flex flex-col items-center justify-center py-10 text-gray-300">
          <CheckSquare size={40} />
          <p className="mt-3 text-sm">
            No tasks yet. More features coming soon!
          </p>
        </div>
      </div>
    </div>
  );
}