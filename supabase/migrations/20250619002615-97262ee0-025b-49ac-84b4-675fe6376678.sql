
-- Adicionar colunas para endereços dos projetos (online/local)
ALTER TABLE public.projects 
ADD COLUMN project_type text NOT NULL DEFAULT 'online' CHECK (project_type IN ('online', 'local')),
ADD COLUMN online_url text,
ADD COLUMN local_url text;

-- Tornar obrigatório que as tarefas tenham um projeto associado
ALTER TABLE public.tasks 
ALTER COLUMN project_id SET NOT NULL;

-- Adicionar tabela para utilizadores de cada projeto (separados dos utilizadores do sistema)
CREATE TABLE public.project_users (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  role text DEFAULT 'user',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(project_id, email)
);

-- Adicionar RLS para project_users
ALTER TABLE public.project_users ENABLE ROW LEVEL SECURITY;

-- Política para visualizar utilizadores do projeto
CREATE POLICY "Users can view project users of their projects" 
  ON public.project_users 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = project_users.project_id 
      AND projects.owner_id = auth.uid()
    )
  );

-- Política para criar utilizadores do projeto
CREATE POLICY "Users can create project users for their projects" 
  ON public.project_users 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = project_users.project_id 
      AND projects.owner_id = auth.uid()
    )
  );

-- Política para atualizar utilizadores do projeto
CREATE POLICY "Users can update project users of their projects" 
  ON public.project_users 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = project_users.project_id 
      AND projects.owner_id = auth.uid()
    )
  );

-- Política para eliminar utilizadores do projeto
CREATE POLICY "Users can delete project users from their projects" 
  ON public.project_users 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = project_users.project_id 
      AND projects.owner_id = auth.uid()
    )
  );

-- Atualizar constraint para tornar project_id obrigatório nas tarefas (se ainda não existir)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'tasks_project_id_not_null' 
    AND table_name = 'tasks'
  ) THEN
    ALTER TABLE public.tasks ADD CONSTRAINT tasks_project_id_not_null CHECK (project_id IS NOT NULL);
  END IF;
END $$;
