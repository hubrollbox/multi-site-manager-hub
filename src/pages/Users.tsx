
import { Loader2 } from "lucide-react";
import { useProjectContext } from "@/contexts/ProjectContext";
import { useState } from "react";
import { useProjectUsers, useDeleteProjectUser } from "@/hooks/useProjectUsers";
import { useToast } from "@/hooks/use-toast";
import { CreateProjectUserDialog } from "@/components/CreateProjectUserDialog";
import { UserStats } from "@/components/users/UserStats";
import { UserTable } from "@/components/users/UserTable";

const Users = () => {
  const { currentProject } = useProjectContext();
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: users = [], isLoading, error } = useProjectUsers(currentProject?.id);
  const deleteUserMutation = useDeleteProjectUser();
  const { toast } = useToast();

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Nenhum projeto selecionado</p>
      </div>
    );
  }

  const activeUsers = users.filter(user => user.role !== 'inactive').length;
  const newThisMonth = users.filter(user => {
    const userDate = new Date(user.created_at);
    const now = new Date();
    return userDate.getMonth() === now.getMonth() && 
           userDate.getFullYear() === now.getFullYear();
  }).length;

  const handleEditUser = (user: any) => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: `Edição do utilizador ${user.name} será implementada em breve.`,
    });
  };

  const handleRemoveUser = async (user: any) => {
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
          <h1 className="text-3xl font-bold text-gray-900">Utilizadores do Projeto</h1>
          <p className="text-gray-600 mt-1">Gerir utilizadores do {currentProject.name}</p>
        </div>
        <CreateProjectUserDialog projectId={currentProject.id} />
      </div>

      <UserStats 
        totalUsers={users.length}
        activeUsers={activeUsers}
        newThisMonth={newThisMonth}
        databaseTables={currentProject.database?.tables || 0}
      />

      <UserTable
        users={users}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onShowFilters={handleShowFilters}
        onEditUser={handleEditUser}
        onRemoveUser={handleRemoveUser}
        isDeletingUserId={deleteUserMutation.isPending ? undefined : undefined}
        projectName={currentProject.name}
      />
    </div>
  );
};

export default Users;
