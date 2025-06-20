
-- Add cloud storage fields to projects table
ALTER TABLE public.projects 
ADD COLUMN storage_bucket_id TEXT,
ADD COLUMN storage_url TEXT,
ADD COLUMN database_url TEXT,
ADD COLUMN database_project_id TEXT;

-- Add foreign key constraint for project_users to link to projects
ALTER TABLE public.project_users 
ADD CONSTRAINT fk_project_users_project_id 
FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;

-- Create index for better performance on project queries
CREATE INDEX idx_project_users_project_id ON public.project_users(project_id);
CREATE INDEX idx_tasks_project_id ON public.tasks(project_id);

-- Add database connection info to projects
ALTER TABLE public.projects 
ADD COLUMN database_connected BOOLEAN DEFAULT FALSE,
ADD COLUMN database_tables_count INTEGER DEFAULT 0,
ADD COLUMN last_backup_date DATE;
