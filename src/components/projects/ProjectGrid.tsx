
import { ProjectCard } from "./ProjectCard";
import { ProjectWithTasks } from "@/hooks/useProjectTasks";

interface ProjectGridProps {
  projects: ProjectWithTasks[];
  searchTerm: string;
  onEditProject: (project: ProjectWithTasks) => void;
  onRemoveProject: (project: ProjectWithTasks) => void;
  isDeletingProject: boolean;
}

export const ProjectGrid = ({ 
  projects, 
  searchTerm, 
  onEditProject, 
  onRemoveProject,
  isDeletingProject 
}: ProjectGridProps) => {
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (filteredProjects.length === 0 && searchTerm) {
    return (
      <div className="text-center py-12 text-gray-500">
        Nenhum projeto encontrado para "{searchTerm}"
      </div>
    );
  }

  if (filteredProjects.length === 0 && !searchTerm && projects.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Nenhum projeto criado ainda. Crie o seu primeiro projeto!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEditProject}
          onRemove={onRemoveProject}
          isDeleting={isDeletingProject}
        />
      ))}
    </div>
  );
};
