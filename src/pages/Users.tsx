
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
import { Users as UsersIcon, Search, Plus, Filter, Loader2, Edit, Trash2 } from "lucide-react";
import { useProjectContext } from "@/contexts/ProjectContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useUsers, useDeleteUser } from "@/hooks/useUsers";
import { useToast } from "@/hooks/use-toast";

const Users = () => {
  const { currentProject } = useProjectContext();
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: users = [], isLoading, error } = useUsers();
  const deleteUserMutation = useDeleteUser();
  const { toast } = useToast();

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Nenhum projeto selecionado</p>
      </div>
    );
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeUsers = users.filter(user => user.role !== 'inactive').length;

  const handleAddUser = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "O formulário para adicionar utilizadores será implementado em breve.",
    });
  };

  const handleEditUser = (user: any) => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: `Edição do utilizador ${user.name} será implementada em breve.`,
    });
  };

  const handleRemoveUser = async (user: any) => {
    if (user.id === currentUser?.id) {
      toast({
        title: "Ação não permitida",
        description: "Não pode remover a sua própria conta.",
        variant: "destructive",
      });
      return;
    }

    if (confirm(`Tem certeza que deseja remover o utilizador ${user.name}?`)) {
      await deleteUserMutation.mutateAsync(user.id);
    }
  };

  const handleShowFilters = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "Filtros avançados serão implementados em breve.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Erro ao carregar utilizadores</p>
      </div>
    );
  }

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
            <div className="text-2xl font-bold">{users.length}</div>
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
            <div className="text-2xl font-bold">{activeUsers}</div>
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
            <div className="text-2xl font-bold">
              {users.filter(user => {
                const userDate = new Date(user.created_at);
                const now = new Date();
                return userDate.getMonth() === now.getMonth() && 
                       userDate.getFullYear() === now.getFullYear();
              }).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Taxa de Atividade
            </CardTitle>
            <UsersIcon className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.length > 0 ? Math.round((activeUsers / users.length) * 100) : 0}%
            </div>
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
                <TableHead>Cargo</TableHead>
                <TableHead>Data de Registo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role === 'admin' ? 'Administrador' : 'Utilizador'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString('pt-PT')}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role !== 'inactive' ? 'default' : 'secondary'}>
                      {user.role !== 'inactive' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={() => handleEditUser(user)} 
                        variant="outline" 
                        size="sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={() => handleRemoveUser(user)} 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        disabled={deleteUserMutation.isPending}
                      >
                        {deleteUserMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
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

          {filteredUsers.length === 0 && !searchTerm && users.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum utilizador registado ainda.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
