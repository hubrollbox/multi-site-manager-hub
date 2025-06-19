
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface Activity {
  type: string;
  message: string;
  time: string;
  status: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
  onViewAll: () => void;
}

const RecentActivities = ({ activities, onViewAll }: RecentActivitiesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Atividade Recente
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
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
        <Button onClick={onViewAll} variant="outline" className="w-full">
          Ver Todas as Atividades
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
