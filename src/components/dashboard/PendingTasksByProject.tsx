
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Clock, Loader2 } from "lucide-react";
import { usePendingTasksByProject } from "@/hooks/useProjectTasks";
import { useNavigate } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  due_date?: string;
  created_at: string;
}

interface ProjectWithPendingTasks {
  id: string;
  name: string;
  pending_tasks: Task[];
}

export const PendingTasksByProject = () => {
  const { data: projectsWithPendingTasks = [], isLoading } = usePendingTasksByProject();
  const navigate = useNavigate();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return priority;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5" />
          Tarefas Pendentes por Projeto
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : projectsWithPendingTasks.length > 0 ? (
          <div className="space-y-4">
            {projectsWithPendingTasks.slice(0, 3).map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  <Badge variant="outline" className="text-orange-600 border-orange-200">
                    <Clock className="h-3 w-3 mr-1" />
                    {project.pending_tasks.length} pendente{project.pending_tasks.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
                <div className="space-y-1">
                  {project.pending_tasks.slice(0, 2).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                      <span className="text-gray-700 truncate flex-1">{task.title}</span>
                      <Badge variant={getPriorityColor(task.priority)} className="ml-2">
                        {getPriorityText(task.priority)}
                      </Badge>
                    </div>
                  ))}
                  {project.pending_tasks.length > 2 && (
                    <p className="text-xs text-gray-500 text-center">
                      +{project.pending_tasks.length - 2} mais tarefa{project.pending_tasks.length - 2 !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            Nenhuma tarefa pendente
          </div>
        )}
        <Button onClick={() => navigate('/tasks')} variant="outline" className="w-full">
          Ver Todas as Tarefas
        </Button>
      </CardContent>
    </Card>
  );
};
