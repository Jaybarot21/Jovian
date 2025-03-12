-- Create a storage bucket for career applications
INSERT INTO storage.buckets (id, name, public)
VALUES ('career_applications', 'career_applications', true)
ON CONFLICT (id) DO NOTHING;

-- Set up access policies for the bucket
CREATE POLICY "Career Applications Storage Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'career_applications');

CREATE POLICY "Career Applications Storage Insert Access"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'career_applications');