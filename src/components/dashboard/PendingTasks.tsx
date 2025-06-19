
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Loader2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  due_date?: string;
  priority: string;
}

interface PendingTasksProps {
  tasks: Task[];
  isLoading: boolean;
  onViewAll: () => void;
}

const PendingTasks = ({ tasks, isLoading, onViewAll }: PendingTasksProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Tarefas Pendentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : tasks.length > 0 ? (
          tasks.slice(0, 3).map((task) => (
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
        <Button onClick={onViewAll} variant="outline" className="w-full">
          Ver Todas as Tarefas
        </Button>
      </CardContent>
    </Card>
  );
};

export default PendingTasks;
