
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, Calendar, Github, TrendingUp, Clock, Loader2 } from "lucide-react";
import { useProjectContext } from "@/contexts/ProjectContext";
import { useTasks } from "@/hooks/useTasks";
import { useNavigate } from "react-router-dom";
import TrendingTopics from "@/components/TrendingTopics";

const Dashboard = () => {
  const { currentProject, isLoading: projectsLoading } = useProjectContext();
  const { data: tasks = [], isLoading: tasksLoading } = useTasks(currentProject?.id);
  const navigate = useNavigate();

  if (projectsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Nenhum projeto encontrado</p>
          <Button onClick={() => navigate('/projects')}>
            Criar Primeiro Projeto
          </Button>
        </div>
      </div>
    );
  }

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const overdueTasks = tasks.filter(task => task.status === 'overdue');

  const stats = [
    {
      title: "Tarefas Pendentes",
      value: pendingTasks.length.toString(),
      change: "+12%",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Tarefas Concluídas",
      value: completedTasks.length.toString(),
      change: "+5%",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Em Progresso",
      value: inProgressTasks.length.toString(),
      change: "+18%",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Em Atraso",
      value: overdueTasks.length.toString(),
      change: "0%",
      icon: Github,
      color: "text-red-600",
    },
  ];

  const recentActivities = [
    {
      type: "task",
      message: `${tasks.length} tarefas no projeto ${currentProject.name}`,
      time: "há 5 min",
      status: "success",
    },
    {
      type: "project",
      message: `Projeto ${currentProject.name} atualizado`,
      time: "há 15 min", 
      status: "success",
    },
    {
      type: "task",
      message: `${completedTasks.length} tarefas concluídas`,
      time: "há 1 hora",
      status: "success",
    },
    {
      type: "database",
      message: `Base de dados conectada: ${currentProject.database?.tables || 0} tabelas`,
      time: "há 2 horas",
      status: "pending",
    },
  ];

  const handleViewAllActivities = () => {
    alert("Página de atividades detalhadas será implementada");
  };

  const handleViewAllTasks = () => {
    navigate("/tasks");
  };

  const handleAddUser = () => {
    navigate("/users");
  };

  const handleSendEmail = () => {
    navigate("/emails");
  };

  const handleSchedulePost = () => {
    navigate("/social");
  };

  const handleNewDeploy = () => {
    navigate("/deploy");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Bem-vindo ao painel de gestão do {currentProject.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
                <TrendingUp className="h-3 w-3" />
                {stat.change} este mês
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
            <Button onClick={handleViewAllActivities} variant="outline" className="w-full">
              Ver Todas as Atividades
            </Button>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Tarefas Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasksLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : pendingTasks.length > 0 ? (
              pendingTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{task.title}</p>
                    <p className="text-xs text-gray-500">
                      {task.due_date ? new Date(task.due_date).toLocaleDateString('pt-PT') : 'Sem prazo'}
                    </p>
                  </div>
                  <Badge variant={
                    task.priority === 'high' ? 'destructive' : 
                    task.priority === 'medium' ? 'default' : 'secondary'
                  }>
                    {task.priority === 'high' ? 'Alta' : 
                     task.priority === 'medium' ? 'Média' : 'Baixa'}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                Nenhuma tarefa pendente
              </div>
            )}
            <Button onClick={handleViewAllTasks} variant="outline" className="w-full">
              Ver Todas as Tarefas
            </Button>
          </CardContent>
        </Card>

        {/* Trending Topics Widget */}
        <div className="lg:row-span-2">
          <TrendingTopics />
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={handleAddUser} className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              Adicionar Utilizador
            </Button>
            <Button onClick={handleSendEmail} variant="outline" className="h-20 flex-col gap-2">
              <Mail className="h-6 w-6" />
              Enviar Email
            </Button>
            <Button onClick={handleSchedulePost} variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              Agendar Post
            </Button>
            <Button onClick={handleNewDeploy} variant="outline" className="h-20 flex-col gap-2">
              <Github className="h-6 w-6" />
              Novo Deploy
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
