
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, ExternalLink, Globe, MonitorSpeaker, Loader2 } from "lucide-react";
import { Project } from "@/hooks/useProjects";

interface ProjectTableRowProps {
  project: Project;
  onEdit: (project: Project) => void;
  onRemove: (project: Project) => void;
  isDeleting: boolean;
}

export const ProjectTableRow = ({ project, onEdit, onRemove, isDeleting }: ProjectTableRowProps) => {
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

  const getProjectUrl = (project: Project) => {
    return project.project_type === 'online' ? project.online_url : project.local_url;
  };

  const ProjectTypeIcon = getProjectTypeIcon(project.project_type);
  const projectUrl = getProjectUrl(project);

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <ProjectTypeIcon className="h-4 w-4 text-gray-500" />
          {project.name}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={project.project_type === 'online' ? 'default' : 'secondary'}>
          {project.project_type === 'online' ? 'Online' : 'Local'}
        </Badge>
      </TableCell>
      <TableCell>
        {projectUrl ? (
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            className="h-auto p-0 text-blue-600 hover:text-blue-800"
          >
            <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <span className="max-w-32 truncate">{projectUrl}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        ) : (
          '-'
        )}
      </TableCell>
      <TableCell>
        <Badge variant={getStatusColor(project.status)}>
          {getStatusText(project.status)}
        </Badge>
      </TableCell>
      <TableCell>
        {project.repository ? (
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            className="h-auto p-0 text-blue-600 hover:text-blue-800"
          >
            <a href={project.repository} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        ) : (
          '-'
        )}
      </TableCell>
      <TableCell>
        {new Date(project.created_at).toLocaleDateString('pt-PT')}
      </TableCell>
      <TableCell>
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
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
