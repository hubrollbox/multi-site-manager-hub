
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
import { useCreateTask } from "@/hooks/useTasks";
import { useProjectContext } from "@/contexts/ProjectContext";
import { CreateProjectDialog } from "@/components/CreateProjectDialog";

interface CreateTaskDialogProps {
  projectId?: string;
}

export const CreateTaskDialog = ({ projectId }: CreateTaskDialogProps) => {
  const { currentProject, projects } = useProjectContext();
  const [open, setOpen] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    due_date: '',
    project_id: projectId || currentProject?.id || ''
  });

  const createTaskMutation = useCreateTask();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.project_id) return;

    const taskData = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      priority: formData.priority,
      due_date: formData.due_date || undefined,
      project_id: formData.project_id,
    };

    await createTaskMutation.mutateAsync(taskData);
    setFormData({ 
      title: '', 
      description: '', 
      priority: 'medium', 
      due_date: '', 
      project_id: projectId || currentProject?.id || ''
    });
    setOpen(false);
  };

  const handleCreateNewProject = () => {
    setShowCreateProject(true);
    setOpen(false);
  };

  const handleProjectChange = (value: string) => {
    if (value === 'new-project') {
      handleCreateNewProject();
    } else {
      setFormData({ ...formData, project_id: value });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nova Tarefa
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Nova Tarefa</DialogTitle>
            <DialogDescription>
              Adicione uma nova tarefa ao projeto selecionado.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="project_id">Projeto *</Label>
                <Select 
                  value={formData.project_id} 
                  onValueChange={handleProjectChange}
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
                    <SelectItem value="new-project" className="text-blue-600 font-medium">
                      + Criar Novo Projeto
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="title">Título da Tarefa *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Revisar conteúdo do blog"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrição da tarefa..."
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Prioridade</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="due_date">Data de Conclusão</Label>
                <Input
                  id="due_date"
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={createTaskMutation.isPending || !formData.title.trim() || !formData.project_id}
              >
                {createTaskMutation.isPending ? "Criando..." : "Criar Tarefa"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <CreateProjectDialog 
        open={showCreateProject} 
        onOpenChange={setShowCreateProject}
        onProjectCreated={(project) => {
          setFormData({ ...formData, project_id: project.id });
          setShowCreateProject(false);
          setOpen(true);
        }}
      />
    </>
  );
};
