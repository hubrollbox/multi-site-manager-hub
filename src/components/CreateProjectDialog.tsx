
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
import { useCreateProject } from "@/hooks/useProjects";

interface CreateProjectDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onProjectCreated?: (project: any) => void;
}

export const CreateProjectDialog = ({ open, onOpenChange, onProjectCreated }: CreateProjectDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    repository: '',
    project_type: 'online',
    online_url: '',
    local_url: ''
  });

  const createProjectMutation = useCreateProject();

  const dialogOpen = open !== undefined ? open : isOpen;
  const setDialogOpen = onOpenChange || setIsOpen;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const projectData = {
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      repository: formData.repository.trim() || undefined,
      project_type: formData.project_type,
      online_url: formData.online_url.trim() || undefined,
      local_url: formData.local_url.trim() || undefined,
    };

    const project = await createProjectMutation.mutateAsync(projectData);
    setFormData({ 
      name: '', 
      description: '', 
      repository: '', 
      project_type: 'online',
      online_url: '',
      local_url: ''
    });
    setDialogOpen(false);
    
    if (onProjectCreated) {
      onProjectCreated(project);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {!open && (
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Projeto
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Projeto</DialogTitle>
          <DialogDescription>
            Adicione um novo projeto à sua plataforma.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do Projeto *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Website da empresa"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="project_type">Tipo de Projeto *</Label>
              <Select value={formData.project_type} onValueChange={(value) => setFormData({ ...formData, project_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.project_type === 'online' && (
              <div className="grid gap-2">
                <Label htmlFor="online_url">URL Online *</Label>
                <Input
                  id="online_url"
                  value={formData.online_url}
                  onChange={(e) => setFormData({ ...formData, online_url: e.target.value })}
                  placeholder="https://exemplo.com"
                  type="url"
                />
              </div>
            )}

            {formData.project_type === 'local' && (
              <div className="grid gap-2">
                <Label htmlFor="local_url">URL Local *</Label>
                <Input
                  id="local_url"
                  value={formData.local_url}
                  onChange={(e) => setFormData({ ...formData, local_url: e.target.value })}
                  placeholder="http://localhost:3000"
                />
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrição do projeto..."
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="repository">Repositório</Label>
              <Input
                id="repository"
                value={formData.repository}
                onChange={(e) => setFormData({ ...formData, repository: e.target.value })}
                placeholder="https://github.com/user/repo"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={createProjectMutation.isPending || !formData.name.trim()}
            >
              {createProjectMutation.isPending ? "Criando..." : "Criar Projeto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
