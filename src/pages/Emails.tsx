
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
  Plus
} from "lucide-react";
import { useSiteContext } from "@/contexts/SiteContext";

const Emails = () => {
  const { currentSite } = useSiteContext();

  const emailStats = [
    {
      title: "Emails Enviados",
      value: "1,284",
      change: "+5%",
      icon: Send,
      color: "text-blue-600",
    },
    {
      title: "Taxa de Abertura",
      value: "68%",
      change: "+2%",
      icon: Mail,
      color: "text-green-600",
    },
    {
      title: "Taxa de Clique",
      value: "12%",
      change: "+1%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Emails Agendados",
      value: "23",
      change: "0%",
      icon: Clock,
      color: "text-orange-600",
    },
  ];

  const recentEmails = [
    {
      id: "1",
      subject: "Bem-vindo ao nosso site!",
      recipients: 45,
      status: "sent",
      openRate: 72,
      clickRate: 15,
      sentAt: "2024-01-21 10:30",
    },
    {
      id: "2",
      subject: "Newsletter semanal",
      recipients: 234,
      status: "sent", 
      openRate: 65,
      clickRate: 8,
      sentAt: "2024-01-20 09:00",
    },
    {
      id: "3",
      subject: "Recuperação de password",
      recipients: 12,
      status: "sent",
      openRate: 89,
      clickRate: 45,
      sentAt: "2024-01-20 14:15",
    },
    {
      id: "4",
      subject: "Promoção especial",
      recipients: 156,
      status: "scheduled",
      openRate: 0,
      clickRate: 0,
      sentAt: "2024-01-22 16:00",
    },
  ];

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
    {
      id: "4",
      name: "Email de Reativação",
      trigger: "30 dias sem login",
      status: "inactive",
      sent: 0,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Automação de Emails</h1>
          <p className="text-gray-600 mt-1">Gerir emails do {currentSite.name}</p>
        </div>
        <Button className="flex items-center gap-2">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Emails */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Emails Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentEmails.map((email) => (
              <div key={email.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{email.subject}</h4>
                  <Badge variant={
                    email.status === 'sent' ? 'default' : 
                    email.status === 'scheduled' ? 'secondary' : 'destructive'
                  }>
                    {email.status === 'sent' ? 'Enviado' : 
                     email.status === 'scheduled' ? 'Agendado' : 'Falhou'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{email.recipients} destinatários</span>
                  <span>{email.sentAt}</span>
                </div>

                {email.status === 'sent' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Taxa de abertura</span>
                      <span>{email.openRate}%</span>
                    </div>
                    <Progress value={email.openRate} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Taxa de clique</span>
                      <span>{email.clickRate}%</span>
                    </div>
                    <Progress value={email.clickRate} className="h-2" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

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
                  {rule.status === 'active' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-gray-400" />
                  )}
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
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Nova Automação
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Emails;
