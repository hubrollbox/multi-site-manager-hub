// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wbwsdoyzbgzphrtnlshw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indid3Nkb3l6Ymd6cGhydG5sc2h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxOTAzMTksImV4cCI6MjA2NTc2NjMxOX0.F9H5i1n6kEaU3Jy-dA1U57GZD0Z_uweXXwG9ygMBskY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);