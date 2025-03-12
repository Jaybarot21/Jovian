CREATE TABLE IF NOT EXISTS job_applications (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  position TEXT NOT NULL,
  experience TEXT NOT NULL,
  education TEXT NOT NULL,
  cover_letter TEXT NOT NULL,
  resume_url TEXT,
  willing_to_relocate BOOLEAN DEFAULT FALSE,
  work_permit BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

alter publication supabase_realtime add table job_applications;