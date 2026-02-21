import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend"

// ✅ Define CORS ONCE
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-api-version",
}

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

serve(async (req) => {
  // ✅ Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()

    const { data, error } = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: email,
  subject: "Welcome to Aetheron ⚡",
  html: `
    <div style="background:#0f0520;padding:40px;text-align:center;color:white;font-family:sans-serif;">
      <h1 style="color:#00d4ff;">Welcome, Warrior ⚔️</h1>
      <p>You are officially pre-registered for Aetheron.</p>
      <p>The Portal opens soon.</p>
    </div>
  `,
})

    if (error) {
      return new Response(JSON.stringify(error), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})