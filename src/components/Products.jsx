import { useEffect, useState } from 'react'
import { fetchProducts } from '../lib/products'
import ProductCard from './ProductCard'

function Grid({ title, color, products }) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <h3 className="relative inline-block text-2xl font-bold text-[#3C1A1A]">
          {title}
          <span
            className={`absolute -bottom-1 left-0 h-1 w-full rounded-full ${color}`}
          />
        </h3>
        <div className="h-px flex-1 bg-[#A6BBCE]" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetchProducts()
      .then((data) => {
        if (active) setProducts(data)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  if (loading) {
    return (
      <section id="productos" className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-[#3C1A1A]">
          <span className="h-10 w-10 animate-spin rounded-full border-4 border-[#A6BBCE] border-t-[#3C1A1A]" />
          <p>Cargando productos...</p>
        </div>
      </section>
    )
  }

  const cookies = products.filter((p) => p.category === 'cookies')
  const frozen = products.filter((p) => p.category === 'frozen')

  return (
    <section id="productos" className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold text-[#3C1A1A]">Nuestras Cookies</h2>
        <p className="mt-3 text-[#3C1A1A]/70">
          Elegí entre nuestras recetas listas para disfrutar o las versiones
          congeladas para hornear en casa.
        </p>
      </div>

      <div className="mb-14">
        <Grid
          title="Cookies"
          color="bg-[#F5D9D9]"
          products={cookies}
        />
      </div>

      <div>
        <Grid
          title="Cookies Congeladas"
          color="bg-[#A6BBCE]"
          products={frozen}
        />
      </div>
    </section>
  )
}
