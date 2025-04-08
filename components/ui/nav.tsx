'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Book, ShoppingBag, Plus, ChefHat } from "lucide-react"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Inicio",
      icon: Home,
    },
    {
      href: "/recetas",
      label: "Recetas",
      icon: Book,
    },
    {
      href: "/lista-compra",
      label: "Lista de Compra",
      icon: ShoppingBag,
    },
    {
      href: "/crear-receta",
      label: "Crear Receta",
      icon: Plus,
    },
    {
      href: "/asistente",
      label: "Asistente IA",
      icon: ChefHat,
    },
  ]

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center space-x-4 sm:space-x-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <route.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{route.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}