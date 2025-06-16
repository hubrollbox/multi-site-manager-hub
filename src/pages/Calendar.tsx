
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Plus, Settings } from "lucide-react";
import { useSiteContext } from "@/contexts/SiteContext";

const Calendar = () => {
  const { currentSite } = useSiteContext();

  const upcomingEvents = [
    {
      id: "1",
      title: "Reunião de revisão de conteúdo",
      type: "meeting",
      date: "2024-01-22",
      time: "10:00",
      duration: "1h",
      attendees: ["João Silva", "Maria Santos"],
      linkedTask: "Revisar conteúdo do blog",
    },
    {
      id: "2",
      title: "Deploy da nova funcionalidade",
      type: "task",
      date: "2024-01-22", 
      time: "14:00",
      duration: "2h",
      attendees: ["Pedro Costa"],
      linkedTask: "Implementar nova funcionalidade",
    },
    {
      id: "3",
      title: "Webinar sobre marketing digital",
      type: "event",
      date: "2024-01-24",
      time: "16:00",
      duration: "1h30m",
      attendees: ["Equipa completa"],
      linkedTask: null,
    },
    {
      id: "4",
      title: "Backup semanal da base de dados",
      type: "maintenance",
      date: "2024-01-26",
      time: "02:00",
      duration: "30m",
      attendees: ["Sistema automático"],
      linkedTask: "Backup da base de dados",
    },
  ];

  const integrationStatus = {
    google: true,
    outlook: false,
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'task': return '

bg-green-500';
      case 'event': return 'bg-purple-500';
      case 'maintenance': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventTypeText = (type: string) => {
    switch (type) {
      case 'meeting': return 'Reunião';
      case 'task': return 'Tarefa';
      case 'event': return 'Evento';
      case 'maintenance': return 'Manutenção';
      default: return type;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integração com Calendário</h1>
          <p className="text-gray-600 mt-1">Sincronização de tarefas e eventos do {currentSite.name}</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Evento
        </Button>
      </div>

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Estado das Integrações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  G
                </div>
                <div>
                  <p className="font-medium">Google Calendar</p>
                  <p className="text-sm text-gray-600">
                    {integrationStatus.google ? 'Conectado' : 'Não conectado'}
                  </p>
                </div>
              </div>
              <Badge variant={integrationStatus.google ? 'default' : 'secondary'}>
                {integrationStatus.google ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  O
                </div>
                <div>
                  <p className="font-medium">Outlook Calendar</p>
                  <p className="text-sm text-gray-600">
                    {integrationStatus.outlook ? 'Conectado' : 'Não conectado'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={integrationStatus.outlook ? 'default' : 'secondary'}>
                  {integrationStatus.outlook ? 'Ativo' : 'Inativo'}
                </Badge>
                {!integrationStatus.outlook && (
                  <Button variant="outline" size="sm">
                    Conectar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Próximos Eventos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-3 h-3 rounded-full mt-2 ${getEventTypeColor(event.type)}`} />
                  <div>
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span>📅 {new Date(event.date).toLocaleDateString('pt-PT')}</span>
                      <span>🕐 {event.time}</span>
                      <span>⏱️ {event.duration}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline">
                  {getEventTypeText(event.type)}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    👥 {event.attendees.join(', ')}
                  </p>
                  {event.linkedTask && (
                    <p className="text-sm text-blue-600 mt-1">
                      🔗 Ligado à tarefa: {event.linkedTask}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm">
                    Ver no Calendário
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <CalendarIcon className="h-6 w-6" />
              Sincronizar Tarefas
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Clock className="h-6 w-6" />
              Agendar Reunião
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Settings className="h-6 w-6" />
              Configurar Integrações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;
