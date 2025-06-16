
import React, { createContext, useContext, useState } from 'react';

interface Site {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'inactive';
}

interface SiteContextType {
  currentSite: Site;
  sites: Site[];
  setCurrentSite: (site: Site) => void;
}

const defaultSites: Site[] = [
  { id: '1', name: 'Site Principal', url: 'https://principal.com', status: 'active' },
  { id: '2', name: 'Blog Corporativo', url: 'https://blog.empresa.com', status: 'active' },
  { id: '3', name: 'Loja Online', url: 'https://loja.empresa.com', status: 'active' },
  { id: '4', name: 'Landing Page', url: 'https://landing.empresa.com', status: 'inactive' },
];

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSite, setCurrentSite] = useState<Site>(defaultSites[0]);
  const [sites] = useState<Site[]>(defaultSites);

  return (
    <SiteContext.Provider value={{ currentSite, sites, setCurrentSite }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteContext = () => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSiteContext must be used within a SiteProvider');
  }
  return context;
};
