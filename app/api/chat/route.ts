import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic';

const OLLAMA_URL = "http://localhost:11434/api/generate"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    const lastMessage = messages[messages.length - 1]

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
    return NextResponse.json({ response: data.response })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}