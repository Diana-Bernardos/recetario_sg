import Link from "next/link"
import Image from "next/image"
import { Book, ShoppingBag, Plus, ChefHat, Clock, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredRecipes = [
  {
    id: 1,
    title: "Pan de almendras sin gluten",
    time: "45 min",
    servings: 8,
    difficulty: "Media",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80",
    rating: 4.8
  },
  {
    id: 2,
    title: "Pizza con base de coliflor",
    time: "60 min",
    servings: 4,
    difficulty: "Media",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
    rating: 4.9
  },
  {
    id: 3,
    title: "Galletas de avena y plátano",
    time: "30 min",
    servings: 12,
    difficulty: "Fácil",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&auto=format&fit=crop&q=80",
    rating: 4.7
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-5xl font-bold tracking-tight text-primary">
                Tu asistente de cocina sin gluten personal
              </h1>
              <p className="text-xl text-muted-foreground">
                Descubre, crea y comparte deliciosas recetas sin gluten. Nuestro asistente virtual te ayudará a encontrar las mejores opciones para ti.
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link href="/recetas">Explorar Recetas</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/asistente">Consultar Asistente</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <Image
                src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&auto=format&fit=crop&q=80"
                alt="Cocina sin gluten"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Book className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Recetas sin gluten</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Explora nuestra colección de recetas sin gluten certificadas y deliciosas.
                </p>
                <Button variant="link" asChild className="p-0">
                  <Link href="/recetas">Ver recetas →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShoppingBag className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Lista de compra</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Genera listas de compra inteligentes basadas en tus recetas favoritas.
                </p>
                <Button variant="link" asChild className="p-0">
                  <Link href="/lista-compra">Ver lista →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Plus className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Crear recetas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comparte tus creaciones sin gluten con nuestra comunidad.
                </p>
                <Button variant="link" asChild className="p-0">
                  <Link href="/crear-receta">Crear receta →</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ChefHat className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Asistente IA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Obtén ayuda personalizada para tu cocina sin gluten.
                </p>
                <Button variant="link" asChild className="p-0">
                  <Link href="/asistente">Consultar →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recetas Destacadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
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
                  <CardTitle className="text-xl">{recipe.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {recipe.time}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {recipe.servings} pers.
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-primary" />
                      {recipe.rating}
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href={`/recetas/${recipe.id}`}>Ver receta</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}