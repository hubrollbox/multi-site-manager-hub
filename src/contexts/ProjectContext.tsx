
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProjects, Project as SupabaseProject } from '@/hooks/useProjects';

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
  isLoading: boolean;
  error: any;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const { data: supabaseProjects = [], isLoading, error } = useProjects();

  // Transform Supabase projects to include additional mock data for demo purposes
  const projects: Project[] = supabaseProjects.map(project => ({
    ...project,
    socialAccounts: {
      facebook: `${project.name.toLowerCase().replace(/\s+/g, '')}.oficial`,
      instagram: `${project.name.toLowerCase().replace(/\s+/g, '')}_oficial`,
    },
    database: {
      supabaseUrl: 'https://wbwsdoyzbgzphrtnlshw.supabase.co',
      supabaseProject: `${project.name.toLowerCase().replace(/\s+/g, '')}-db`,
      connected: true,
      tables: Math.floor(Math.random() * 10) + 3,
      lastBackup: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  }));

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
