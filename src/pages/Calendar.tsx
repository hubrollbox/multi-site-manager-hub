import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Plus, Settings } from "lucide-react";
import { useProjectContext } from "@/contexts/ProjectContext";
import { usePendingTasksByProject } from "@/hooks/useProjectTasks";

const Calendar = () => {
  const { projects } = useProjectContext();
  const { data: projectsWithPendingTasks = [] } = usePendingTasksByProject();

  // Generate calendar events from all projects and tasks
  const calendarEvents = [
    // Sample events from projects
    ...projects.slice(0, 3).map((project, index) => ({
      id: `project-${project.id}`,
      title: `Reunião de revisão - ${project.name}`,
      type: "meeting",
      date: new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: `${10 + index}:00`,
      duration: "1h",
      attendees: ["Equipa do projeto"],
      linkedTask: null,
      projectName: project.name,
      projectId: project.id,
    })),
    
    // Events from pending tasks
    ...projectsWithPendingTasks.flatMap(project =>
      project.pending_tasks.slice(0, 2).map(task => ({
        id: `task-${task.id}`,
        title: task.title,
        type: "task",
        date: task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : 
               new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: `${Math.floor(Math.random() * 8) + 9}:00`,
        duration: task.priority === 'high' ? '2h' : '1h',
        attendees: ["Responsável pela tarefa"],
        linkedTask: task.title,
        projectName: project.name,
        projectId: project.id,
      }))
    )
  ];

  const integrationStatus = {
    google: true,
    outlook: false,
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'task': return 'bg-green-500';
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

  const handleConnectOutlook = () => {
    alert("Funcionalidade de conexão com Outlook será implementada");
  };

  const handleCreateEvent = () => {
    alert("Formulário para criar novo evento será implementado");
  };

  const handleSyncTasks = () => {
    alert("Sincronização de tarefas será implementada");
  };

  const handleScheduleMeeting = () => {
    alert("Agendamento de reunião será implementada");
  };

  const handleConfigureIntegrations = () => {
    alert("Configuração de integrações será implementada");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendário Integrado</h1>
          <p className="text-gray-600 mt-1">Todos os eventos e tarefas de todos os projetos</p>
        </div>
        <Button onClick={handleCreateEvent} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Evento
        </Button>
      </div>

      {/* Project Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Resumo dos Projetos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{projects.length}</div>
              <div className="text-sm text-blue-600">Projetos Ativos</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {projectsWithPendingTasks.reduce((sum, p) => sum + p.pending_tasks.length, 0)}
              </div>
              <div className="text-sm text-green-600">Tarefas Pendentes</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{calendarEvents.length}</div>
              <div className="text-sm text-purple-600">Eventos Total</div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                  <Button onClick={handleConnectOutlook} variant="outline" size="sm">
                    Conectar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events from all projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Próximos Eventos - Todos os Projetos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {calendarEvents.map((event) => (
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
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {event.projectName}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {getEventTypeText(event.type)}
                      </Badge>
                    </div>
                  </div>
                </div>
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
                  <Button variant="outline" size="sm" onClick={() => alert(`Editar evento: ${event.title}`)}>
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => alert("Abrir no calendário externo")}>
                    Ver no Calendário
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {calendarEvents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhum evento encontrado</p>
              <p className="text-sm">Crie projetos e tarefas para ver eventos aqui</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={handleSyncTasks} variant="outline" className="h-20 flex-col gap-2">
              <CalendarIcon className="h-6 w-6" />
              Sincronizar Tarefas
            </Button>
            <Button onClick={handleScheduleMeeting} variant="outline" className="h-20 flex-col gap-2">
              <Clock className="h-6 w-6" />
              Agendar Reunião
            </Button>
            <Button onClick={handleConfigureIntegrations} variant="outline" className="h-20 flex-col gap-2">
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
