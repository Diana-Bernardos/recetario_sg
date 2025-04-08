"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2 } from "lucide-react"

interface Item {
  id: string
  name: string
  completed: boolean
}

export default function ListaCompra() {
  const [items, setItems] = useState<Item[]>([
    { id: "1", name: "Harina de almendras", completed: false },
    { id: "2", name: "Harina de arroz", completed: false },
    { id: "3", name: "Xantana", completed: false },
  ])
  const [newItem, setNewItem] = useState("")

  const addItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItem.trim()) return

    setItems([
      ...items,
      { id: Date.now().toString(), name: newItem, completed: false },
    ])
    setNewItem("")
  }

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Lista de Compra</h1>

        <form onSubmit={addItem} className="flex gap-2 mb-8">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Añadir ingrediente..."
            className="flex-1"
          />
          <Button type="submit">
            <Plus className="h-4 w-4" />
          </Button>
        </form>

        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={() => toggleItem(item.id)}
                />
                <span
                  className={`${
                    item.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {item.name}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            No hay ingredientes en tu lista de compra
          </p>
        )}
      </div>
    </div>
  )
}