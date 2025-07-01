
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  FolderOpen, 
  CheckCircle, 
  Clock, 
  Users, 
  TrendingUp, 
  Calendar,
  Mail,
  Database
} from 'lucide-react';

export const DashboardOverview = () => {
  const stats = [
    {
      title: "Projetos Ativos",
      value: "12",
      change: "+2 este mês",
      trend: "up",
      icon: <FolderOpen className="h-4 w-4" />,
      color: "text-blue-600"
    },
    {
      title: "Tarefas Concluídas",
      value: "87",
      change: "+15 esta semana",
      trend: "up",
      icon: <CheckCircle className="h-4 w-4" />,
      color: "text-green-600"
    },
    {
      title: "Tarefas Pendentes",
      value: "23",
      change: "-5 desde ontem",
      trend: "down",
      icon: <Clock className="h-4 w-4" />,
      color: "text-orange-600"
    },
    {
      title: "Utilizadores Totais",
      value: "1,247",
      change: "+89 este mês",
      trend: "up",
      icon: <Users className="h-4 w-4" />,
      color: "text-purple-600"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Projeto criado",
      project: "Website E-commerce",
      time: "há 2 horas",
      type: "project"
    },
    {
      id: 2,
      action: "Tarefa concluída",
      project: "App Mobile",
      time: "há 3 horas",
      type: "task"
    },
    {
      id: 3,
      action: "Novo utilizador",
      project: "Portal Cliente",
      time: "há 5 horas",
      type: "user"
    },
    {
      id: 4,
      action: "Email enviado",
      project: "Newsletter",
      time: "há 1 dia",
      type: "email"
    }
  ];

  const projectProgress = [
    { name: "Website E-commerce", progress: 85, status: "Em andamento" },
    { name: "App Mobile", progress: 60, status: "Desenvolvimento" },
    { name: "Portal Cliente", progress: 95, status: "Teste" },
    { name: "Sistema CRM", progress: 30, status: "Planeamento" }
  ];

  return (
    <div className="space-y-6">
      {/* Estatísticas principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={stat.color}>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className={`h-3 w-3 ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`} />
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Progresso dos projetos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Progresso dos Projetos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projectProgress.map((project, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{project.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {project.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={project.progress} className="flex-1" />
                  <span className="text-sm text-muted-foreground min-w-[3rem]">
                    {project.progress}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Atividade recente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="p-2 rounded-full bg-primary/10">
                    {activity.type === 'project' && <FolderOpen className="h-4 w-4 text-primary" />}
                    {activity.type === 'task' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {activity.type === 'user' && <Users className="h-4 w-4 text-purple-600" />}
                    {activity.type === 'email' && <Mail className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {activity.project}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métricas adicionais */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Emails Enviados
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Bases de Dados
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Conectadas a projetos ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Conclusão
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">79%</div>
            <p className="text-xs text-muted-foreground">
              +7% em relação à semana passada
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
