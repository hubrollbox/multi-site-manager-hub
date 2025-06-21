
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Users, Database, MoreVertical } from "lucide-react";
import { Project } from "@/hooks/useProjects";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
  pendingTasksCount?: number;
}

export const ProjectCard = ({ project, pendingTasksCount = 0 }: ProjectCardProps) => {
  const navigate = useNavigate();

  const handleViewProject = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold truncate">
          {project.name}
        </CardTitle>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">
          {project.description || "Sem descrição disponível"}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{pendingTasksCount} tarefas</span>
          </div>
          <div className="flex items-center gap-1">
            <Database className="h-4 w-4" />
            <span>{project.project_type}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
            {project.status === 'active' ? 'Ativo' : 'Inativo'}
          </Badge>
          
          <div className="flex items-center gap-2">
            {project.online_url && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.open(project.online_url, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
            <Button 
              variant="default" 
              size="sm"
              onClick={handleViewProject}
            >
              Ver Projeto
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
