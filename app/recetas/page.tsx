"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Clock, Users, Star, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Recipe {
  id: string
  title: string
  description: string
  servings: number
  prep_time: string
  difficulty: string
  image_url: string
  created_at: string
}

interface SpoonacularRecipe {
  id: number
  title: string
  image: string
  readyInMinutes: number
  servings: number
  sourceUrl: string
}

export default function Recetas() {
  const [searchQuery, setSearchQuery] = useState("")
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [searchResults, setSearchResults] = useState<SpoonacularRecipe[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const searchRecipes = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/recipes/search?query=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setSearchResults(data.results)
    } catch (error) {
      console.error("Error searching recipes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Recetas Sin Gluten</h1>
          <Button asChild>
            <Link href="/crear-receta">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Receta
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="saved" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="saved">Mis Recetas</TabsTrigger>
            <TabsTrigger value="search">Buscar Recetas</TabsTrigger>
          </TabsList>

          <TabsContent value="saved">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recipes.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={recipe.image_url}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary">Sin Gluten</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{recipe.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{recipe.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {recipe.prep_time}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {recipe.servings} pers.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {recipes.length === 0 && (
                <p className="text-center text-muted-foreground col-span-2 py-12">
                  No tienes recetas guardadas. ¡Crea tu primera receta!
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="search">
            <form onSubmit={searchRecipes} className="flex gap-2 mb-8">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar recetas sin gluten..."
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </form>

            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchResults.map((recipe) => (
                <Card key={recipe.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary">Sin Gluten</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-2">{recipe.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {recipe.readyInMinutes} min
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {recipe.servings} pers.
                      </div>
                    </div>
                    <Button variant="secondary" className="w-full" asChild>
                      <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
                        Ver receta
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {!isLoading && searchResults.length === 0 && (
              <p className="text-center text-muted-foreground mt-8">
                No se encontraron recetas. Intenta con una nueva búsqueda.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}