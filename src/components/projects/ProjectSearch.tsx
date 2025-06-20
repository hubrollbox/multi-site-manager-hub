
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

interface ProjectSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const ProjectSearch = ({ searchTerm, onSearchChange }: ProjectSearchProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Procurar projetos..." 
          className="pl-10 w-64"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant="outline" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        Filtros
      </Button>
    </div>
  );
};
