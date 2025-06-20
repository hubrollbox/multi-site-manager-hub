
import { Loader2, Users, Calendar, Github, Clock } from "lucide-react";
import { useProjectContext } from "@/contexts/ProjectContext";
import { useTasks } from "@/hooks/useTasks";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TrendingTopics from "@/components/TrendingTopics";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentActivities from "@/components/dashboard/RecentActivities";
import PendingTasks from "@/components/dashboard/PendingTasks";
import { PendingTasksByProject } from "@/components/dashboard/PendingTasksByProject";
import QuickActions from "@/components/dashboard/QuickActions";

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

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivities 
          activities={recentActivities} 
          onViewAll={handleViewAllActivities} 
        />

        <PendingTasks 
          tasks={pendingTasks}
          isLoading={tasksLoading}
          onViewAll={handleViewAllTasks}
        />

        <div className="lg:row-span-2">
          <TrendingTopics />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PendingTasksByProject />
        
        <QuickActions 
          onAddUser={handleAddUser}
          onSendEmail={handleSendEmail}
          onSchedulePost={handleSchedulePost}
          onNewDeploy={handleNewDeploy}
        />
      </div>
    </div>
  );
};

export default Dashboard;
