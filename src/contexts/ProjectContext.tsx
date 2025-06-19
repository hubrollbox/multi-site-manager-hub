
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProjects, useUpdateProject, Project as SupabaseProject } from '@/hooks/useProjects';

interface Project extends SupabaseProject {
  socialAccounts?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  database?: {
    supabaseUrl?: string;
    supabaseProject?: string;
    connected: boolean;
    tables?: number;
    lastBackup?: string;
  };
}

interface ProjectContextType {
  currentProject: Project | null;
  projects: Project[];
  setCurrentProject: (project: Project) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  isLoading: boolean;
  error: any;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const { data: supabaseProjects = [], isLoading, error } = useProjects();
  const updateProjectMutation = useUpdateProject();

  // Transform Supabase projects to include additional mock data for demo purposes
  const projects: Project[] = supabaseProjects.map(project => ({
    ...project,
    socialAccounts: {
      facebook: `${project.name.toLowerCase().replace(/\s+/g, '')}.oficial`,
      instagram: `${project.name.toLowerCase().replace(/\s+/g, '')}_oficial`,
    },
    database: {
      supabaseUrl: project.project_type === 'online' 
        ? (project.online_url || 'https://exemplo.supabase.co')
        : 'http://localhost:54321',
      supabaseProject: `${project.name.toLowerCase().replace(/\s+/g, '')}-db`,
      connected: true,
      tables: Math.floor(Math.random() * 10) + 3,
      lastBackup: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  }));

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    // Update the current project locally for immediate UI feedback
    if (currentProject && currentProject.id === projectId) {
      const updatedProject = { ...currentProject, ...updates };
      setCurrentProject(updatedProject);
    }

    // For database fields, we only update the local state since these are mock data
    // In a real implementation, you might want to store this in a separate table
    if (updates.database) {
      console.log('Database settings updated:', updates.database);
    }
    
    // For other fields, update via Supabase
    const supabaseUpdates = { ...updates };
    delete supabaseUpdates.socialAccounts;
    delete supabaseUpdates.database;
    
    if (Object.keys(supabaseUpdates).length > 0) {
      updateProjectMutation.mutate({ id: projectId, ...supabaseUpdates });
    }
  };

  // Set the first project as current when projects are loaded
  useEffect(() => {
    if (projects.length > 0 && !currentProject) {
      setCurrentProject(projects[0]);
    }
  }, [projects, currentProject]);

  // Update current project when projects change
  useEffect(() => {
    if (currentProject && projects.length > 0) {
      const updatedProject = projects.find(p => p.id === currentProject.id);
      if (updatedProject) {
        setCurrentProject(updatedProject);
      }
    }
  }, [projects, currentProject]);

  return (
    <ProjectContext.Provider value={{
      currentProject,
      projects,
      setCurrentProject,
      updateProject,
      isLoading,
      error,
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};
