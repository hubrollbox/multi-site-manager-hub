
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, Clock, User, FileText, Mail } from 'lucide-react';

interface Notification {
  id: string;
  type: 'task' | 'user' | 'email' | 'project';
  title: string;
  description: string;
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'task',
      title: 'Nova tarefa atribuída',
      description: 'Você foi atribuído à tarefa "Implementar autenticação"',
      time: '2 min atrás',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'user',
      title: 'Novo utilizador registado',
      description: 'João Silva registou-se no projeto Website Empresa',
      time: '1h atrás',
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'email',
      title: 'Email enviado',
      description: 'Email de boas-vindas enviado para 5 utilizadores',
      time: '2h atrás',
      read: true,
      priority: 'low'
    },
    {
      id: '4',
      type: 'project',
      title: 'Projeto atualizado',
      description: 'O projeto "App Mobile" foi atualizado com novos requisitos',
      time: '3h atrás',
      read: true,
      priority: 'medium'
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'task': return <CheckCircle className="h-4 w-4" />;
      case 'user': return <User className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'project': return <FileText className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificações
          </CardTitle>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="bg-primary text-white">
              {unreadCount}
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Marcar todas como lidas
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            Sem notificações
          </p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                !notification.read 
                  ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  !notification.read ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium text-sm ${
                      !notification.read ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {notification.title}
                    </h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getPriorityColor(notification.priority)}`}
                    >
                      {notification.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {notification.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    {notification.time}
                  </div>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
