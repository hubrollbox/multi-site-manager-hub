
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useProjectContext } from "@/contexts/ProjectContext";
import { useToast } from "@/hooks/use-toast";

interface CreateEmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateEmailDialog = ({ open, onOpenChange }: CreateEmailDialogProps) => {
  const { projects } = useProjectContext();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    project_id: '',
    email_account: '',
    to: '',
    subject: '',
    content: '',
    schedule_for: ''
  });

  // Mock email accounts for each project
  const getEmailAccounts = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return [];
    
    return [
      `info@${project.name.toLowerCase().replace(/\s+/g, '')}.com`,
      `contato@${project.name.toLowerCase().replace(/\s+/g, '')}.com`,
      `suporte@${project.name.toLowerCase().replace(/\s+/g, '')}.com`
    ];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.project_id || !formData.email_account || !formData.to || !formData.subject) return;

    // Simular envio
    toast({
      title: "Email criado com sucesso!",
      description: `Email ${formData.schedule_for ? 'agendado' : 'enviado'} de ${formData.email_account} para ${formData.to}`,
    });

    setFormData({
      project_id: '',
      email_account: '',
      to: '',
      subject: '',
      content: '',
      schedule_for: ''
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Novo Email</DialogTitle>
          <DialogDescription>
            Criar e enviar um novo email através do sistema.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project_id">Projeto *</Label>
              <Select 
                value={formData.project_id} 
                onValueChange={(value) => setFormData({ ...formData, project_id: value, email_account: '' })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um projeto" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.project_id && (
              <div className="grid gap-2">
                <Label htmlFor="email_account">Conta de Email *</Label>
                <Select 
                  value={formData.email_account} 
                  onValueChange={(value) => setFormData({ ...formData, email_account: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a conta de email" />
                  </SelectTrigger>
                  <SelectContent>
                    {getEmailAccounts(formData.project_id).map((email) => (
                      <SelectItem key={email} value={email}>
                        {email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="to">Para *</Label>
              <Input
                id="to"
                type="email"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                placeholder="destinatario@email.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="subject">Assunto *</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Assunto do email"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">Conteúdo</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Conteúdo do email..."
                rows={6}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="schedule_for">Agendar para (opcional)</Label>
              <Input
                id="schedule_for"
                type="datetime-local"
                value={formData.schedule_for}
                onChange={(e) => setFormData({ ...formData, schedule_for: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={!formData.project_id || !formData.email_account || !formData.to || !formData.subject}
            >
              {formData.schedule_for ? "Agendar Email" : "Enviar Email"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
