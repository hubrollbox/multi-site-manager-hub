
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  due_date?: string;
  created_at: string;
}

interface ProjectPendingTasksProps {
  pendingTasksCount: number;
}

export const ProjectPendingTasks = ({ pendingTasksCount }: ProjectPendingTasksProps) => {
  if (pendingTasksCount === 0) {
    return <span className="text-gray-500">-</span>;
  }

  return (
    <div className="flex items-center gap-1">
      <Clock className="h-4 w-4 text-orange-500" />
      <Badge variant="outline" className="text-orange-600 border-orange-200">
        {pendingTasksCount} pendente{pendingTasksCount !== 1 ? 's' : ''}
      </Badge>
    </div>
  );
};
