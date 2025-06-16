
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Database,
  Plus, 
  Calendar,
  Clock,
  Filter,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useProjectContext } from "@/contexts/ProjectContext";
import { useState } from "react";

const Tasks = () => {
  const { currentProject } = useProjectContext();
  const [searchTerm, setSearchTerm] = useState("");

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Nenhum projeto selecionado</p>
      </div>
    );
  }

  const taskStats = [
    {
      title: "Tarefas Pendentes",
      value: "12",
      change: "+3",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Concluídas Hoje",
      value: "8",
      change: "+2",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Em Atraso",
      value: "2",
      change: "-1",
      icon: AlertCircle,
      color: "text-red-600",
    },
    {
      title: "Esta Semana",
      value: "18",
      change: "+5",
      icon: Calendar,
      color: "text-blue-600",
    },
  ];

  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Revisar conteúdo do blog",
      description: "Verificar e corrigir os últimos 3 artigos publicados",
      priority: "high",
      status: "pending",
      dueDate: "2024-01-22",
      tags: ["conteúdo", "blog"],
      assignee: "João Silva",
      createdAt: "2024-01-20",
      completed: false,
    },
    {
      id: "2",
      title: "Configurar automação de email", 
      description: "Implementar sequência de boas-vindas para novos utilizadores",
      priority: "medium",
      status: "in-progress",
      dueDate: "2024-01-24",
      tags: ["email", "automação"],
      assignee: "Maria Santos",
      createdAt: "2024-01-19",
      completed: false,
    },
    {
      id: "3",
      title: "Atualizar redes sociais",
      description: "Criar e agendar posts para a próxima semana",
      priority: "low",
      status: "pending",
      dueDate: "2024-01-26",
      tags: ["redes sociais", "marketing"],
      assignee: "Pedro Costa",
      createdAt: "2024-01-18",
      completed: false,
    },
    {
      id: "4",
      title: "Backup da base de dados",
      description: "Realizar backup completo e testar restauro",
      priority: "high", 
      status: "completed",
      dueDate: "2024-01-21",
      tags: ["backup", "segurança"],
      assignee: "Ana Ferreira",
      createdAt: "2024-01-15",
      completed: true,
    },
    {
      id: "5",
      title: "Atualização de segurança",
      description: "Aplicar patches de segurança no servidor",
      priority: "high",
      status: "overdue",
      dueDate: "2024-01-20",
      tags: ["segurança", "servidor"],
      assignee: "João Silva",
      createdAt: "2024-01-17",
      completed: false,
    },
  ]);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

  const handleCreateTask = () => {
    alert("Formulário para criar nova tarefa será implementado");
  };

  const handleEditTask = (task: any) => {
    alert(`Editar tarefa: ${task.title}`);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newCompleted = !task.completed;
        return {
          ...task,
          completed: newCompleted,
          status: newCompleted ? 'completed' : 'pending'
        };
      }
      return task;
    }));
  };

  const handleSyncToCalendar = (task: any) => {
    alert(`Sincronizar tarefa "${task.title}" com o calendário`);
  };

  const handleShowFilters = () => {
    alert("Filtros avançados serão implementados");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Tarefas</h1>
          <p className="text-gray-600 mt-1">Tarefas do {currentProject.name}</p>
        </div>
        <Button onClick={handleCreateTask} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Tarefa
        </Button>
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
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                {stat.change.startsWith('+') ? '↗' : '↘'} {stat.change} esta semana
              </div>
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
              <Button onClick={handleShowFilters} variant="outline" size="sm">
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
                  checked={task.completed}
                  onCheckedChange={() => handleToggleTask(task.id)}
                  className="mt-1" 
                />
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {task.title}
                      </h4>
                      <p className={`text-sm mt-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                        {task.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(task.priority)}>
                        {task.priority}
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
                      <span>👤 {task.assignee}</span>
                      <span>📅 {new Date(task.dueDate).toLocaleDateString('pt-PT')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-gray-100 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Criada em {new Date(task.createdAt).toLocaleDateString('pt-PT')}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button onClick={() => handleEditTask(task)} variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button onClick={() => handleSyncToCalendar(task)} variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        Sincronizar
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Tasks;
