
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Mail, 
  Send, 
  Clock, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Plus,
  Inbox
} from "lucide-react";
import { useProjectContext } from "@/contexts/ProjectContext";
import { useState } from "react";
import { CreateEmailDialog } from "@/components/emails/CreateEmailDialog";

const Emails = () => {
  const { currentProject, projects } = useProjectContext();
  const [createEmailOpen, setCreateEmailOpen] = useState(false);

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Nenhum projeto selecionado</p>
      </div>
    );
  }

  // Email data baseado no projeto atual
  const getProjectEmailStats = (projectId: string) => {
    const baseStats = {
      sent: Math.floor(Math.random() * 1000) + 100,
      openRate: Math.floor(Math.random() * 30) + 50,
      clickRate: Math.floor(Math.random() * 15) + 5,
      scheduled: Math.floor(Math.random() * 20) + 5,
    };

    return [
      {
        title: "Emails Enviados",
        value: baseStats.sent.toString(),
        change: "+5%",
        icon: Send,
        color: "text-blue-600",
      },
      {
        title: "Taxa de Abertura",
        value: `${baseStats.openRate}%`,
        change: "+2%",
        icon: Mail,
        color: "text-green-600",
      },
      {
        title: "Taxa de Clique",
        value: `${baseStats.clickRate}%`,
        change: "+1%",
        icon: TrendingUp,
        color: "text-purple-600",
      },
      {
        title: "Emails Agendados",
        value: baseStats.scheduled.toString(),
        change: "0%",
        icon: Clock,
        color: "text-orange-600",
      },
    ];
  };

  // Caixas de email por projeto
  const getProjectEmailBoxes = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return [];

    const baseName = project.name.toLowerCase().replace(/\s+/g, '');
    return [
      {
        id: `${projectId}-inbox`,
        name: "Caixa de Entrada Principal",
        email: `info@${baseName}.com`,
        unread: Math.floor(Math.random() * 50) + 5,
        total: Math.floor(Math.random() * 200) + 100,
      },
      {
        id: `${projectId}-contact`,
        name: "Contacto",
        email: `contato@${baseName}.com`,
        unread: Math.floor(Math.random() * 30) + 2,
        total: Math.floor(Math.random() * 150) + 80,
      },
      {
        id: `${projectId}-support`,
        name: "Suporte",
        email: `suporte@${baseName}.com`,
        unread: Math.floor(Math.random() * 20) + 1,
        total: Math.floor(Math.random() * 100) + 50,
      },
    ];
  };

  const emailStats = getProjectEmailStats(currentProject.id);
  const emailBoxes = getProjectEmailBoxes(currentProject.id);

  const automationRules = [
    {
      id: "1",
      name: "Email de Boas-vindas",
      trigger: "Novo registo",
      status: "active",
      sent: 45,
    },
    {
      id: "2", 
      name: "Recuperação de Password",
      trigger: "Password esquecida",
      status: "active",
      sent: 12,
    },
    {
      id: "3",
      name: "Newsletter Semanal",
      trigger: "Todas as segundas-feiras",
      status: "active",
      sent: 234,
    },
  ];

  const handleCreateAutomation = () => {
    alert("Criador de automação de emails será implementado");
  };

  const handleToggleAutomation = (rule: any) => {
    const newStatus = rule.status === 'active' ? 'inactive' : 'active';
    alert(`Automação "${rule.name}" ${newStatus === 'active' ? 'ativada' : 'desativada'}`);
  };

  const handleViewEmailBox = (emailBox: any) => {
    alert(`Abrir caixa de email: ${emailBox.email}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Emails do Projeto</h1>
          <p className="text-gray-600 mt-1">Gerir emails do {currentProject.name}</p>
        </div>
        <Button onClick={() => setCreateEmailOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Email
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {emailStats.map((stat, index) => (
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

      {/* Email Boxes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Inbox className="h-5 w-5" />
            Caixas de Email do Projeto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {emailBoxes.map((emailBox) => (
            <div 
              key={emailBox.id} 
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => handleViewEmailBox(emailBox)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{emailBox.name}</h4>
                  <p className="text-sm text-gray-600">{emailBox.email}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    {emailBox.unread > 0 && (
                      <Badge variant="destructive">{emailBox.unread} não lidos</Badge>
                    )}
                    <span className="text-sm text-gray-500">{emailBox.total} total</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Automation Rules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Regras de Automação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {automationRules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <button onClick={() => handleToggleAutomation(rule)}>
                    {rule.status === 'active' ? (
                      <CheckCircle className="h-5 w-5 text-green-500 cursor-pointer hover:text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-500" />
                    )}
                  </button>
                  <div>
                    <p className="font-medium text-gray-900">{rule.name}</p>
                    <p className="text-sm text-gray-600">{rule.trigger}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{rule.sent} enviados</p>
                  <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                    {rule.status === 'active' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>
            ))}
            <Button onClick={handleCreateAutomation} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Nova Automação
            </Button>
          </CardContent>
        </Card>
      </div>

      <CreateEmailDialog 
        open={createEmailOpen}
        onOpenChange={setCreateEmailOpen}
      />
    </div>
  );
};

export default Emails;
