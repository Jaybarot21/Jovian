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

    const body = await req.json();
    const {
      name,
      email,
      company,
      country,
      productCategory,
      specificProduct,
      quantity,
      timeframe,
      requirements,
      samples,
    } = body;

    // Insert into contacts table
    const { data, error } = await supabaseClient.from("contacts").insert([
      {
        name,
        email,
        company,
        phone: "", // Not collected in this form
        interest: productCategory,
        message: `Product: ${specificProduct}\nQuantity: ${quantity}\nTimeframe: ${timeframe}\nRequirements: ${requirements}\nRequest Samples: ${samples ? "Yes" : "No"}`,
        created_at: new Date().toISOString(),
      },
    ]);

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
