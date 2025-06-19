
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Mail, Calendar, Github } from "lucide-react";

interface QuickActionsProps {
  onAddUser: () => void;
  onSendEmail: () => void;
  onSchedulePost: () => void;
  onNewDeploy: () => void;
}

const QuickActions = ({ onAddUser, onSendEmail, onSchedulePost, onNewDeploy }: QuickActionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button onClick={onAddUser} className="h-20 flex-col gap-2">
            <Users className="h-6 w-6" />
            Adicionar Utilizador
          </Button>
          <Button onClick={onSendEmail} variant="outline" className="h-20 flex-col gap-2">
            <Mail className="h-6 w-6" />
            Enviar Email
          </Button>
          <Button onClick={onSchedulePost} variant="outline" className="h-20 flex-col gap-2">
            <Calendar className="h-6 w-6" />
            Agendar Post
          </Button>
          <Button onClick={onNewDeploy} variant="outline" className="h-20 flex-col gap-2">
            <Github className="h-6 w-6" />
            Novo Deploy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
