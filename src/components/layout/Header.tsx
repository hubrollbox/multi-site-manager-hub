
import { SidebarTrigger } from "@/components/ui/sidebar";
import SiteSelector from "@/components/SiteSelector";
import { Button } from "@/components/ui/button";
import { Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <SiteSelector />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => navigate('/profile')}>
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};
