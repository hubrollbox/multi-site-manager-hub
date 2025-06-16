
import React, { createContext, useContext, useState } from 'react';

interface Project {
  id: string;
  name: string;
  description: string;
  repository: string;
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
  socialAccounts: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

interface ProjectContextType {
  currentProject: Project | null;
  projects: Project[];
  setCurrentProject: (project: Project) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

const defaultProjects: Project[] = [
  {
    id: '1',
    name: 'Site Principal',
    description: 'Website corporativo principal',
    repository: 'https://github.com/empresa/site-principal',
    status: 'active',
    createdAt: '2024-01-15',
    socialAccounts: {
      facebook: 'empresa.principal',
      instagram: 'empresa_oficial',
      twitter: 'empresa_corp',
    },
  },
  {
    id: '2',
    name: 'Blog Corporativo',
    description: 'Blog com conteúdo técnico',
    repository: 'https://github.com/empresa/blog',
    status: 'active',
    createdAt: '2024-01-10',
    socialAccounts: {
      twitter: 'empresa_blog',
      linkedin: 'empresa-blog',
    },
  },
  {
    id: '3',
    name: 'Loja Online',
    description: 'E-commerce da empresa',
    repository: 'https://github.com/empresa/loja',
    status: 'active',
    createdAt: '2024-01-05',
    socialAccounts: {
      facebook: 'loja.empresa',
      instagram: 'loja_empresa',
    },
  },
];

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentProject, setCurrentProject] = useState<Project | null>(defaultProjects[0]);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
    if (currentProject?.id === id) {
      setCurrentProject(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    if (currentProject?.id === id) {
      const remainingProjects = projects.filter(p => p.id !== id);
      setCurrentProject(remainingProjects.length > 0 ? remainingProjects[0] : null);
    }
  };

  return (
    <ProjectContext.Provider value={{
      currentProject,
      projects,
      setCurrentProject,
      addProject,
      updateProject,
      deleteProject,
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
