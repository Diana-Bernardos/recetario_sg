"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ChefHat, Send } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function Asistente() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "¡Hola! Soy tu asistente de cocina sin gluten. ¿En qué puedo ayudarte hoy?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (error) {
      console.error("Error getting response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <ChefHat className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Asistente de Cocina</h1>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 mb-4 h-[500px] overflow-y-auto">
          {messages.map((message, index) => (
            <Card
              key={index}
              className={`mb-4 ${
                message.role === "assistant" ? "bg-primary/5" : "bg-background"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {message.role === "assistant" && (
                    <ChefHat className="h-5 w-5 text-primary mt-1" />
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span>Pensando...</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregunta sobre recetas sin gluten..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}