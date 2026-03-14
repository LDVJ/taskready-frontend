import { Menu } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import Avatar from "../ui/Avatar";
import { RoleBadge } from "../ui/Badge";

interface Props {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: Props) {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-10 h-14 bg-white/80 backdrop-blur border-b border-gray-100 flex items-center px-4 gap-4">
      {/* Mobile Menu Toggle - only visible on small screens */}
      <button
        className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
        onClick={onMenuClick}
      >
        <Menu size={20} />
      </button>

      {/* Spacer to push content to the right */}
      <div className="flex-1" />

      {/* User Information Area */}
      <div className="flex items-center gap-3">
        {user?.role && <RoleBadge role={user.role} />}
        <Avatar 
          name={user?.name ?? "U"} 
          src={user?.profile_pic} 
          size="sm" 
        />
      </div>
    </header>
  );
}