
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ProjectWithTasks {
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
  pending_tasks_count: number;
}

export const useProjectsWithPendingTasks = () => {
  return useQuery({
    queryKey: ['projects-with-pending-tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          tasks!fk_tasks_project_id(id, status)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to include pending tasks count
      const projectsWithTasks = data.map(project => ({
        ...project,
        pending_tasks_count: project.tasks?.filter(task => task.status === 'pending').length || 0
      }));

      return projectsWithTasks as ProjectWithTasks[];
    },
  });
};

export const usePendingTasksByProject = () => {
  return useQuery({
    queryKey: ['pending-tasks-by-project'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          id,
          name,
          tasks!fk_tasks_project_id(
            id,
            title,
            status,
            priority,
            due_date,
            created_at
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Filter and transform to only include projects with pending tasks
      const projectsWithPendingTasks = data
        .map(project => ({
          ...project,
          pending_tasks: project.tasks?.filter(task => task.status === 'pending') || []
        }))
        .filter(project => project.pending_tasks.length > 0);

      return projectsWithPendingTasks;
    },
  });
};
