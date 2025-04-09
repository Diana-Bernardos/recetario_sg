import { NextResponse } from "next/server"

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY
const API_URL = "https://api.spoonacular.com/recipes/complexSearch"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  if (!SPOONACULAR_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 })
  }

  try {
    const response = await fetch(
      `${API_URL}?apiKey=${SPOONACULAR_API_KEY}&query=${query}&diet=gluten free&addRecipeInformation=true&number=10`,
      { next: { revalidate: 3600 } }
    )

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching recipes:", error)
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    )
  }
}