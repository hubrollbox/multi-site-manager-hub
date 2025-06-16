
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users as UsersIcon, Search, Plus, Filter } from "lucide-react";
import { useProjectContext } from "@/contexts/ProjectContext";
import { useState } from "react";

const Users = () => {
  const { currentProject } = useProjectContext();
  const [searchTerm, setSearchTerm] = useState("");

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Nenhum projeto selecionado</p>
      </div>
    );
  }

  const mockUsers = [
    {
      id: "1",
      name: "João Silva",
      email: "joao@email.com",
      registrationDate: "2024-01-15",
      status: "active",
      lastLogin: "2024-01-20",
    },
    {
      id: "2", 
      name: "Maria Santos",
      email: "maria@email.com",
      registrationDate: "2024-01-10",
      status: "active",
      lastLogin: "2024-01-19",
    },
    {
      id: "3",
      name: "Pedro Costa",
      email: "pedro@email.com", 
      registrationDate: "2024-01-05",
      status: "inactive",
      lastLogin: "2024-01-12",
    },
    {
      id: "4",
      name: "Ana Ferreira",
      email: "ana@email.com",
      registrationDate: "2024-01-01",
      status: "active", 
      lastLogin: "2024-01-21",
    },
  ];

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    alert("Formulário para adicionar novo utilizador será implementado");
  };

  const handleEditUser = (user: any) => {
    alert(`Editar utilizador: ${user.name}`);
  };

  const handleRemoveUser = (user: any) => {
    if (confirm(`Tem certeza que deseja remover o utilizador ${user.name}?`)) {
      alert(`Utilizador ${user.name} removido com sucesso`);
    }
  };

  const handleShowFilters = () => {
    alert("Filtros avançados serão implementados");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Utilizadores</h1>
          <p className="text-gray-600 mt-1">Gerir utilizadores do {currentProject.name}</p>
        </div>
        <Button onClick={handleAddUser} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Utilizador
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Utilizadores
            </CardTitle>
            <UsersIcon className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUsers.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Utilizadores Ativos
            </CardTitle>
            <UsersIcon className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockUsers.filter(u => u.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Novos Este Mês
            </CardTitle>
            <UsersIcon className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Taxa de Conversão
            </CardTitle>
            <UsersIcon className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Utilizadores</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Procurar utilizadores..." 
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={handleShowFilters} variant="outline" size="sm">
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
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Data de Registo</TableHead>
                <TableHead>Último Login</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{new Date(user.registrationDate).toLocaleDateString('pt-PT')}</TableCell>
                  <TableCell>{new Date(user.lastLogin).toLocaleDateString('pt-PT')}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button onClick={() => handleEditUser(user)} variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button onClick={() => handleRemoveUser(user)} variant="outline" size="sm" className="text-red-600">
                        Remover
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredUsers.length === 0 && searchTerm && (
            <div className="text-center py-8 text-gray-500">
              Nenhum utilizador encontrado para "{searchTerm}"
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
