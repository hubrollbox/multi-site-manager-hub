
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSiteContext } from "@/contexts/SiteContext";

export const SiteSelector = () => {
  const { currentSite, sites, setCurrentSite } = useSiteContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-[200px] justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${currentSite.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
            {currentSite.name}
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] bg-white">
        {sites.map((site) => (
          <DropdownMenuItem
            key={site.id}
            onClick={() => setCurrentSite(site)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${site.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
              {site.name}
            </div>
            {currentSite.id === site.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
