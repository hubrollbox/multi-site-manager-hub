
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ProjectUser {
  id: string;
  project_id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export const useProjectUsers = (projectId?: string) => {
  return useQuery({
    queryKey: ['project-users', projectId],
    queryFn: async () => {
      if (!projectId) return [];
      
      const { data, error } = await supabase
        .from('project_users')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ProjectUser[];
    },
    enabled: !!projectId,
  });
};

export const useCreateProjectUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (userData: { 
      project_id: string;
      name: string; 
      email: string; 
      role?: string;
    }) => {
      const { data, error } = await supabase
        .from('project_users')
        .insert([{
          ...userData,
          role: userData.role || 'user'
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-users'] });
      toast({
        title: "Utilizador adicionado com sucesso!",
        description: "O novo utilizador foi adicionado ao projeto.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao adicionar utilizador",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateProjectUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...userData }: Partial<ProjectUser> & { id: string }) => {
      const { data, error } = await supabase
        .from('project_users')
        .update(userData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-users'] });
      toast({
        title: "Utilizador atualizado com sucesso!",
        description: "As alterações foram guardadas.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar utilizador",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteProjectUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('project_users')
        .delete()
        .eq('id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project-users'] });
      toast({
        title: "Utilizador removido com sucesso!",
        description: "O utilizador foi removido do projeto.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao remover utilizador",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
