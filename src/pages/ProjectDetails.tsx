
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, FileText, Calendar, Users, Database } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";
import { EditTaskDialog } from "@/components/EditTaskDialog";
import { useUpdateTask, useDeleteTask } from "@/hooks/useTasks";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const { data: tasks = [], isLoading: tasksLoading } = useTasks(projectId);
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();
  const [editingTask, setEditingTask] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const project = projects.find(p => p.id === projectId);

  if (projectsLoading || tasksLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Projeto não encontrado</p>
      </div>
    );
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implementar upload para Supabase Storage
      console.log('Uploading file:', file.name);
    }
  };

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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-gray-600 mt-1">{project.description || "Sem descrição"}</p>
        </div>
        <div className="flex items-center gap-2">
          <CreateTaskDialog projectId={project.id} />
        </div>
      </div>

      {/* Project Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tarefas Totais
            </CardTitle>
            <Calendar className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pendentes
            </CardTitle>
            <Calendar className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.filter(t => t.status === 'pending').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tipo
            </CardTitle>
            <Database className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">{project.project_type}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Estado
            </CardTitle>
            <Users className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
              {project.status === 'active' ? 'Ativo' : 'Inativo'}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Arquivo de Documentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Arraste ficheiros aqui ou clique para selecionar
                </span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              PDF, DOC, DOCX, XLS, XLSX até 10MB
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tarefas do Projeto</CardTitle>
            <Input 
              placeholder="Procurar tarefas..." 
              className="w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                    <div className="flex items-center gap-2">
                      <Button onClick={() => handleEditTask(task)} variant="outline" size="sm">
                        Editar
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
                          "Remover"
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

export default ProjectDetails;
