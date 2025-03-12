import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    // Parse form data
    const formData = await req.formData();
    const applicationData = {
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      position: formData.get("position"),
      experience: formData.get("experience"),
      education: formData.get("education"),
      cover_letter: formData.get("coverLetter"),
      willing_to_relocate: formData.get("relocate") === "true",
      work_permit: formData.get("workPermit") === "true",
      created_at: new Date().toISOString(),
    };

    // Handle resume file upload if present
    const resumeFile = formData.get("resume");
    let resumeUrl = null;

    if (resumeFile && resumeFile instanceof File) {
      const fileExt = resumeFile.name.split(".").pop();
      const fileName = `${applicationData.first_name}-${applicationData.last_name}-${Date.now()}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      // Upload file to storage
      const { data: uploadData, error: uploadError } =
        await supabaseClient.storage
          .from("career_applications")
          .upload(filePath, resumeFile, {
            contentType: resumeFile.type,
            cacheControl: "3600",
          });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = await supabaseClient.storage
        .from("career_applications")
        .getPublicUrl(filePath);

      resumeUrl = urlData.publicUrl;
    }

    // Insert into job_applications table
    const { data, error } = await supabaseClient
      .from("job_applications")
      .insert([{ ...applicationData, resume_url: resumeUrl }]);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
