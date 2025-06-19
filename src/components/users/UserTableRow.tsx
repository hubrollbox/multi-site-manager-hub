
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Loader2 } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

interface UserTableRowProps {
  user: User;
  onEdit: (user: User) => void;
  onRemove: (user: User) => void;
  isDeleting: boolean;
}

export const UserTableRow = ({ user, onEdit, onRemove, isDeleting }: UserTableRowProps) => {
  return (
    <TableRow>
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
            onClick={() => onEdit(user)} 
            variant="outline" 
            size="sm"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => onRemove(user)} 
            variant="outline" 
            size="sm" 
            className="text-red-600 hover:text-red-700"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
