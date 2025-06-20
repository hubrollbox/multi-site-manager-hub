
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProjectSearch } from "./ProjectSearch";
import { ProjectTableRow } from "./ProjectTableRow";
import { ProjectWithTasks } from "@/hooks/useProjectTasks";

interface ProjectTableProps {
  projects: ProjectWithTasks[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onEditProject: (project: ProjectWithTasks) => void;
  onRemoveProject: (project: ProjectWithTasks) => void;
  isDeletingProject: boolean;
}

export const ProjectTable = ({ 
  projects, 
  searchTerm, 
  onSearchChange, 
  onEditProject, 
  onRemoveProject,
  isDeletingProject 
}: ProjectTableProps) => {
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Lista de Projetos</CardTitle>
          <ProjectSearch searchTerm={searchTerm} onSearchChange={onSearchChange} />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Tarefas Pendentes</TableHead>
              <TableHead>Repositório</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <ProjectTableRow
                key={project.id}
                project={project}
                onEdit={onEditProject}
                onRemove={onRemoveProject}
                isDeleting={isDeletingProject}
              />
            ))}
          </TableBody>
        </Table>
        
        {filteredProjects.length === 0 && searchTerm && (
          <div className="text-center py-8 text-gray-500">
            Nenhum projeto encontrado para "{searchTerm}"
          </div>
        )}

        {filteredProjects.length === 0 && !searchTerm && projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum projeto criado ainda. Crie o seu primeiro projeto!
          </div>
        )}
      </CardContent>
    </Card>
  );
};
