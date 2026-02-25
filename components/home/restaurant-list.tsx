'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

type Product = {

  id: string
  name: string
  description: string
  price: number
  image?: string

}

export default function RestaurantList() {

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function loadProducts() {

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {

        console.error(error)

      } else {

        setProducts(data || [])

      }

      setLoading(false)

    }

    loadProducts()

  }, [])

  if (loading) {

    return (
      <div className="px-4 mt-6">
        Carregando cardápio...
      </div>
    )

  }

  return (

    <section className="px-4 mt-6">

      <h2 className="text-lg font-bold mb-4">

        Cardápio

      </h2>

      <div className="grid grid-cols-2 gap-4">

        {products.map(product => (

          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group block transition-transform duration-300 hover:scale-[1.02]"
          >

            <div className="card">

              <div className="font-semibold text-sm text-text-primary">

                {product.name}

              </div>

              <div className="text-primary font-bold mt-1">

                R$ {product.price}

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>

  )

}