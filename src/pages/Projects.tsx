
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  FolderOpen, 
  Search, 
  Plus, 
  Filter, 
  Github,
  Share,
  Calendar,
  Edit,
  Trash2
} from "lucide-react";
import { useProjectContext } from "@/contexts/ProjectContext";

const Projects = () => {
  const { projects, currentProject, setCurrentProject } = useProjectContext();

  const projectStats = [
    {
      title: "Total de Projetos",
      value: projects.length.toString(),
      change: "+2",
      icon: FolderOpen,
      color: "text-blue-600",
    },
    {
      title: "Projetos Ativos",
      value: projects.filter(p => p.status === 'active').length.toString(),
      change: "+1",
      icon: FolderOpen,
      color: "text-green-600",
    },
    {
      title: "Este Mês",
      value: "3",
      change: "+1",
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      title: "Com Repositório",
      value: projects.filter(p => p.repository).length.toString(),
      change: "0",
      icon: Github,
      color: "text-orange-600",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'archived': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'archived': return 'Arquivado';
      default: return status;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Projetos</h1>
          <p className="text-gray-600 mt-1">Gerir todos os seus projetos</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Projeto
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {projectStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                {stat.change.startsWith('+') ? '↗' : '↘'} {stat.change} este mês
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Projetos</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Procurar projetos..." 
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projeto</TableHead>
                <TableHead>Repositório</TableHead>
                <TableHead>Redes Sociais</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow 
                  key={project.id}
                  className={currentProject?.id === project.id ? 'bg-blue-50' : ''}
                >
                  <TableCell>
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-gray-500">{project.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {project.repository ? (
                      <div className="flex items-center gap-1">
                        <Github className="h-4 w-4" />
                        <span className="text-sm truncate max-w-[200px]">
                          {project.repository.split('/').pop()}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">Não configurado</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Share className="h-4 w-4" />
                      <span className="text-sm">
                        {Object.keys(project.socialAccounts).length} contas
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(project.createdAt).toLocaleDateString('pt-PT')}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(project.status)}>
                      {getStatusText(project.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentProject(project)}
                      >
                        Selecionar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;
