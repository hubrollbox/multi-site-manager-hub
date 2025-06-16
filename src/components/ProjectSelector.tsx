
import { Check, ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProjectContext } from "@/contexts/ProjectContext";

export const ProjectSelector = () => {
  const { currentProject, projects, setCurrentProject } = useProjectContext();

  if (!currentProject) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-[250px] justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              currentProject.status === 'active' ? 'bg-green-500' : 
              currentProject.status === 'inactive' ? 'bg-yellow-500' : 'bg-gray-400'
            }`} />
            <div className="text-left">
              <div className="font-medium">{currentProject.name}</div>
              <div className="text-xs text-gray-500 truncate max-w-[180px]">
                {currentProject.description}
              </div>
            </div>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px] bg-white">
        {projects.map((project) => (
          <DropdownMenuItem
            key={project.id}
            onClick={() => setCurrentProject(project)}
            className="flex items-center justify-between cursor-pointer p-3"
          >
            <div className="flex items-center gap-2 flex-1">
              <div className={`w-2 h-2 rounded-full ${
                project.status === 'active' ? 'bg-green-500' : 
                project.status === 'inactive' ? 'bg-yellow-500' : 'bg-gray-400'
              }`} />
              <div className="text-left flex-1">
                <div className="font-medium">{project.name}</div>
                <div className="text-xs text-gray-500 truncate">
                  {project.description}
                </div>
              </div>
            </div>
            {currentProject.id === project.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          Novo Projeto
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
