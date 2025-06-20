
-- Make project_id required in tasks table and add foreign key constraint
ALTER TABLE public.tasks 
ALTER COLUMN project_id SET NOT NULL;

-- Add foreign key constraint to ensure tasks are always linked to a project
ALTER TABLE public.tasks 
ADD CONSTRAINT fk_tasks_project_id 
FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;

-- Update any existing tasks that might not have a project_id (if any)
-- This is a safety measure in case there are orphaned tasks
UPDATE public.tasks 
SET project_id = (SELECT id FROM public.projects LIMIT 1) 
WHERE project_id IS NULL;
