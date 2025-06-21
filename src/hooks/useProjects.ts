
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Project {
  id: string;
  name: string;
  description?: string;
  repository?: string;
  project_type: string;
  online_url?: string;
  local_url?: string;
  status: string;
  created_at: string;
  updated_at: string;
  owner_id: string;
  storage_bucket_id?: string;
  storage_url?: string;
  database_url?: string;
  database_project_id?: string;
  database_connected?: boolean;
  database_tables_count?: number;
  last_backup_date?: string;
  database?: {
    connected?: boolean;
    supabaseUrl?: string;
    supabaseProject?: string;
    tables?: number;
    lastBackup?: string;
  };
  socialAccounts?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Project[];
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (projectData: { 
      name: string; 
      description?: string; 
      repository?: string;
      project_type: string;
      online_url?: string;
      local_url?: string;
    }) => {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('projects')
        .insert([{
          ...projectData,
          owner_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Projeto criado com sucesso!",
        description: "O novo projeto foi adicionado.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar projeto",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...projectData }: Partial<Project> & { id: string }) => {
      const { data, error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Projeto atualizado com sucesso!",
        description: "As alterações foram guardadas.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar projeto",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (projectId: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Projeto removido com sucesso!",
        description: "O projeto foi removido da plataforma.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao remover projeto",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
