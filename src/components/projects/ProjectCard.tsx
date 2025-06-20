
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, ExternalLink, Globe, MonitorSpeaker, Users, Database, Cloud, Calendar } from "lucide-react";
import { ProjectPendingTasks } from "./ProjectPendingTasks";
import { ProjectWithTasks } from "@/hooks/useProjectTasks";

interface ProjectCardProps {
  project: ProjectWithTasks;
  onEdit: (project: ProjectWithTasks) => void;
  onRemove: (project: ProjectWithTasks) => void;
  isDeleting: boolean;
}

export const ProjectCard = ({ project, onEdit, onRemove, isDeleting }: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'completed': return 'outline';
      case 'paused': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'completed': return 'Concluído';
      case 'paused': return 'Pausado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getProjectTypeIcon = (type: string) => {
    return type === 'online' ? Globe : MonitorSpeaker;
  };

  const getProjectUrl = (project: ProjectWithTasks) => {
    return project.project_type === 'online' ? project.online_url : project.local_url;
  };

  const ProjectTypeIcon = getProjectTypeIcon(project.project_type);
  const projectUrl = getProjectUrl(project);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <ProjectTypeIcon className="h-5 w-5 text-gray-500" />
            <div>
              <h3 className="font-semibold text-lg">{project.name}</h3>
              <Badge variant={project.project_type === 'online' ? 'default' : 'secondary'} className="mt-1">
                {project.project_type === 'online' ? 'Online' : 'Local'}
              </Badge>
            </div>
          </div>
          <Badge variant={getStatusColor(project.status)}>
            {getStatusText(project.status)}
          </Badge>
        </div>
        
        {project.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{project.description}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Project URLs */}
        {projectUrl && (
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-blue-500" />
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              className="h-auto p-0 text-blue-600 hover:text-blue-800"
            >
              <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                <span className="max-w-48 truncate">{projectUrl}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        )}

        {/* Repository */}
        {project.repository && (
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-purple-500" />
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              className="h-auto p-0 text-blue-600 hover:text-blue-800"
            >
              <a href={project.repository} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                <span className="text-sm">Repositório</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        )}

        {/* Storage Info */}
        {project.storage_url && (
          <div className="flex items-center gap-2">
            <Cloud className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">Arquivo na Cloud</span>
          </div>
        )}

        {/* Database Info */}
        {project.database_connected && (
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-600">
              BD Própria ({project.database_tables_count || 0} tabelas)
            </span>
          </div>
        )}

        {/* Stats Row */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-4">
            <ProjectPendingTasks pendingTasksCount={project.pending_tasks_count || 0} />
            
            <div className="flex items-center gap-1 text-gray-500">
              <Calendar className="h-4 w-4" />
              <span className="text-xs">
                {new Date(project.created_at).toLocaleDateString('pt-PT')}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => onEdit(project)} 
              variant="outline" 
              size="sm"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              onClick={() => onRemove(project)} 
              variant="outline" 
              size="sm" 
              className="text-red-600 hover:text-red-700"
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
