
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserSearch } from "./UserSearch";
import { UserTableRow } from "./UserTableRow";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

interface UserTableProps {
  users: User[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onShowFilters: () => void;
  onEditUser: (user: User) => void;
  onRemoveUser: (user: User) => void;
  isDeletingUserId?: string;
  projectName: string;
}

export const UserTable = ({ 
  users, 
  searchTerm, 
  onSearchChange, 
  onShowFilters, 
  onEditUser, 
  onRemoveUser, 
  isDeletingUserId,
  projectName 
}: UserTableProps) => {
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Lista de Utilizadores</CardTitle>
          <UserSearch 
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            onShowFilters={onShowFilters}
          />
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
              <UserTableRow
                key={user.id}
                user={user}
                onEdit={onEditUser}
                onRemove={onRemoveUser}
                isDeleting={isDeletingUserId === user.id}
              />
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
            Nenhum utilizador registado ainda no projeto {projectName}.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
