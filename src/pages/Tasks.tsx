
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Calendar,
  Clock,
  Filter,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Loader2
} from "lucide-react";
import { useProjectContext } from "@/contexts/ProjectContext";
import { useState } from "react";
import { useTasks, useUpdateTask, useDeleteTask } from "@/hooks/useTasks";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";
import { EditTaskDialog } from "@/components/EditTaskDialog";

const Tasks = () => {
  const { currentProject } = useProjectContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data: tasks = [], isLoading, error } = useTasks(currentProject?.id);
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Nenhum projeto selecionado</p>
      </div>
    );
  }

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
        <p className="text-red-500">Erro ao carregar tarefas</p>
      </div>
    );
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const overdueTasks = tasks.filter(task => task.status === 'overdue').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;

  const taskStats = [
    {
      title: "Tarefas Pendentes",
      value: pendingTasks.toString(),
      change: "+3",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Concluídas",
      value: completedTasks.toString(),
      change: "+2",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Em Atraso",
      value: overdueTasks.toString(),
      change: "-1",
      icon: AlertCircle,
      color: "text-red-600",
    },
    {
      title: "Em Progresso",
      value: inProgressTasks.toString(),
      change: "+5",
      icon: Calendar,
      color: "text-blue-600",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluída';
      case 'in-progress': return 'Em Progresso';
      case 'overdue': return 'Em Atraso';
      case 'pending': return 'Pendente';
      default: return status;
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

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setEditDialogOpen(true);
  };

  const handleToggleTask = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    await updateTaskMutation.mutateAsync({ id: taskId, status: newStatus });
  };

  const handleRemoveTask = async (task: any) => {
    if (confirm(`Tem certeza que deseja remover a tarefa "${task.title}"?`)) {
      await deleteTaskMutation.mutateAsync(task.id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Tarefas</h1>
          <p className="text-gray-600 mt-1">Tarefas do {currentProject.name}</p>
        </div>
        <CreateTaskDialog projectId={currentProject.id} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {taskStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Task Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Tarefas</CardTitle>
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Procurar tarefas..." 
                className="w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <Checkbox 
                  checked={task.status === 'completed'}
                  onCheckedChange={() => handleToggleTask(task.id, task.status)}
                  className="mt-1" 
                />
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className={`text-sm mt-1 ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                          {task.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(task.priority)}>
                        {getPriorityText(task.priority)}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(task.status)}
                      >
                        {getStatusText(task.status)}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      {task.due_date && (
                        <span>📅 {new Date(task.due_date).toLocaleDateString('pt-PT')}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Criada em {new Date(task.created_at).toLocaleDateString('pt-PT')}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button onClick={() => handleEditTask(task)} variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={() => handleRemoveTask(task)} 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        disabled={deleteTaskMutation.isPending}
                      >
                        {deleteTaskMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredTasks.length === 0 && searchTerm && (
            <div className="text-center py-8 text-gray-500">
              Nenhuma tarefa encontrada para "{searchTerm}"
            </div>
          )}

          {filteredTasks.length === 0 && !searchTerm && tasks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhuma tarefa criada ainda. Crie a sua primeira tarefa!
            </div>
          )}
        </CardContent>
      </Card>

      <EditTaskDialog 
        task={editingTask}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </div>
  );
};

export default Tasks;
