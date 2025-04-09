import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const OLLAMA_URL = "http://localhost:11434/api/generate"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1]

    // Prepare context for the LLM
    const context = `Eres un asistente experto en cocina sin gluten. Tu objetivo es ayudar a las personas a:
    - Encontrar alternativas sin gluten para recetas tradicionales
    - Entender qué ingredientes contienen gluten
    - Aprender técnicas de cocina específicas para recetas sin gluten
    - Resolver dudas sobre la dieta sin gluten
    
    Responde siempre en español.`

    const prompt = `${context}\n\nUsuario: ${lastMessage.content}\n\nAsistente:`

    const ollamaResponse = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama2-3b-instruct-q8_0",
        prompt: prompt,
        stream: false,
      }),
    })

    if (!ollamaResponse.ok) {
      throw new Error("Failed to get response from Ollama")
    }

    const data = await ollamaResponse.json()
    
    return new Response(
      JSON.stringify({ response: data.response }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    )
  } catch (error) {
    console.error("Error:", error)
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    )
  }
})