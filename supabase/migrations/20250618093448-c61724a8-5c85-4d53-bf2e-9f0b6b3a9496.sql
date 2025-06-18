
-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Users can view tasks in their projects" ON public.tasks;
DROP POLICY IF EXISTS "Users can create tasks in their projects" ON public.tasks;
DROP POLICY IF EXISTS "Users can update tasks in their projects" ON public.tasks;
DROP POLICY IF EXISTS "Users can delete tasks in their projects" ON public.tasks;

-- Create the correct policies for tasks
CREATE POLICY "Users can view tasks in their projects" 
  ON public.tasks 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = tasks.project_id 
      AND projects.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create tasks in their projects" 
  ON public.tasks 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = tasks.project_id 
      AND projects.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update tasks in their projects" 
  ON public.tasks 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = tasks.project_id 
      AND projects.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete tasks in their projects" 
  ON public.tasks 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE projects.id = tasks.project_id 
      AND projects.owner_id = auth.uid()
    )
  );
