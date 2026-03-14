import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Users,
  LogOut,
  X,
  CheckSquare,
} from "lucide-react";
import clsx from "clsx";
import { useAuthStore } from "../../store/authStore";
// Since Sidebar is in the same folder as Avatar, we just use "./"
import Avatar from "../ui/Avatar"; 

interface Props {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { to: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { to: "/profile", icon: <User size={18} />, label: "My Profile" },
];

const adminItems = [
  { to: "/admin", icon: <Users size={18} />, label: "Users" },
];

export default function Sidebar({ open, onClose }: Props) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(
      "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
      isActive
        ? "bg-brand-orange text-white shadow-sm"
        : "text-slate-600 hover:bg-brand-orange/10 hover:text-brand-orange"
    );

  return (
    <>
      {/* Backdrop for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          "fixed top-0 left-0 z-30 h-full w-64 bg-white border-r border-gray-100 shadow-xl flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:shadow-none",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center">
              <CheckSquare size={16} className="text-white" />
            </div>
            <span className="font-extrabold text-brand-navy text-lg tracking-tight">
              TaskReady
            </span>
          </div>
          <button
            className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
            Main
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={linkClass}
              onClick={onClose}
            >
              {item.icon} {item.label}
            </NavLink>
          ))}

          {user?.role === "admin" && (
            <>
              <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-4 mb-2">
                Admin
              </p>
              {adminItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={linkClass}
                  onClick={onClose}
                >
                  {item.icon} {item.label}
                </NavLink>
              ))}
            </>
          )}
        </nav>

        {/* User footer */}
        <div className="px-3 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-brand-light mb-2">
            <Avatar name={user?.name ?? "U"} src={user?.profile_pic} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-brand-navy truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-400 truncate uppercase">
                {user?.role}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}