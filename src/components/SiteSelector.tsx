
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useProjectContext } from "@/contexts/ProjectContext";
import { Globe, MonitorSpeaker, Store, ShoppingCart } from "lucide-react";

const SiteSelector = () => {
  const { currentProject, projects, setCurrentProject } = useProjectContext();

  if (!currentProject || projects.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Store className="h-4 w-4" />
        Nenhum projeto
      </div>
    );
  }

  const getProjectIcon = (projectType: string, projectName: string) => {
    // Simple logic to determine site type based on name or type
    const name = projectName.toLowerCase();
    if (name.includes('loja') || name.includes('shop') || name.includes('store')) {
      return ShoppingCart;
    }
    return projectType === 'online' ? Globe : MonitorSpeaker;
  };

  const getProjectTypeLabel = (project: any) => {
    const name = project.name.toLowerCase();
    if (name.includes('loja') || name.includes('shop') || name.includes('store')) {
      return 'Loja Online';
    }
    if (name.includes('blog')) {
      return 'Blog';
    }
    if (name.includes('admin') || name.includes('dashboard')) {
      return 'Painel Admin';
    }
    return project.project_type === 'online' ? 'Site Principal' : 'Site Local';
  };

  const handleProjectChange = (projectId: string) => {
    const selectedProject = projects.find(p => p.id === projectId);
    if (selectedProject) {
      setCurrentProject(selectedProject);
    }
  };

  const ProjectIcon = getProjectIcon(currentProject.project_type, currentProject.name);

  return (
    <div className="flex items-center gap-2">
      <Select value={currentProject.id} onValueChange={handleProjectChange}>
        <SelectTrigger className="w-48">
          <SelectValue>
            <div className="flex items-center gap-2">
              <ProjectIcon className="h-4 w-4" />
              <span className="truncate">{currentProject.name}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => {
            const Icon = getProjectIcon(project.project_type, project.name);
            return (
              <SelectItem key={project.id} value={project.id}>
                <div className="flex items-center gap-2 w-full">
                  <Icon className="h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{project.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {getProjectTypeLabel(project)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {project.project_type === 'online' ? 'Online' : 'Local'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SiteSelector;
