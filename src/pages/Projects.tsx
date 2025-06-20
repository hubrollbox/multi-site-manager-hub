
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDeleteProject } from "@/hooks/useProjects";
import { useProjectsWithPendingTasks, ProjectWithTasks } from "@/hooks/useProjectTasks";
import { CreateProjectDialog } from "@/components/CreateProjectDialog";
import { EditProjectDialog } from "@/components/EditProjectDialog";
import { ProjectStats } from "@/components/projects/ProjectStats";
import { ProjectTable } from "@/components/projects/ProjectTable";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProject, setEditingProject] = useState<ProjectWithTasks | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const { data: projects = [], isLoading, error } = useProjectsWithPendingTasks();
  const deleteProjectMutation = useDeleteProject();

  const handleEditProject = (project: ProjectWithTasks) => {
    setEditingProject(project);
    setEditDialogOpen(true);
  };

  const handleRemoveProject = async (project: ProjectWithTasks) => {
    if (confirm(`Tem certeza que deseja remover o projeto ${project.name}?`)) {
      await deleteProjectMutation.mutateAsync(project.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Erro ao carregar projetos</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Projetos</h1>
          <p className="text-gray-600 mt-1">Gerir todos os seus projetos</p>
        </div>
        <CreateProjectDialog />
      </div>

      <ProjectStats projects={projects} />

      <ProjectTable 
        projects={projects}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onEditProject={handleEditProject}
        onRemoveProject={handleRemoveProject}
        isDeletingProject={deleteProjectMutation.isPending}
      />

      <EditProjectDialog 
        project={editingProject}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </div>
  );
};

export default Projects;
