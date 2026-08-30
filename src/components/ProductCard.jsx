import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem, notify } = useCart()

  const decrement = () => setQuantity((q) => Math.max(1, q - 1))
  const increment = () => setQuantity((q) => q + 1)

  const handleAdd = () => {
    addItem(product, quantity)
    notify(`${quantity}x ${product.name} se agregó al carrito`)
    setQuantity(1)
  }

  const quickAdd = (amount) => {
    addItem(product, amount)
    notify(`${amount}x ${product.name} se agregaron al carrito`)
    setQuantity(1)
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-white/70 shadow-md ring-1 ring-[#F5D9D9] transition-transform hover:-translate-y-1">
      <div className="aspect-square w-full overflow-hidden bg-[#F5D9D9]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-fill"
          loading="lazy"
          draggable={false}
          onError={(e) => {
            e.currentTarget.src = '/placeholder-cookie.svg'
          }}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-bold text-[#3C1A1A]">{product.name}</h3>
        <p className="text-xs text-[#3C1A1A]/70">{product.description}</p>
        <p className="text-lg font-bold text-[#3C1A1A]">{formatPrice(product.price)}</p>

        <div className="mt-auto flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl bg-[#A6BBCE]">
              <button
                type="button"
                onClick={decrement}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#3C1A1A] hover:bg-[#3C1A1A] hover:text-[#F5E9CE]"
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <span className="w-7 text-center font-bold text-[#3C1A1A]">{quantity}</span>
              <button
                type="button"
                onClick={increment}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#3C1A1A] hover:bg-[#3C1A1A] hover:text-[#F5E9CE]"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => quickAdd(6)}
              className="flex-[1.4] rounded-xl bg-[#A6BBCE] px-2 py-2 text-xs font-bold text-[#3C1A1A] transition-colors hover:bg-[#3C1A1A] hover:text-[#F5E9CE]"
            >
              x6
            </button>
            <button
              type="button"
              onClick={() => quickAdd(12)}
              className="flex-[1.4] rounded-xl bg-[#A6BBCE] px-2 py-2 text-xs font-bold text-[#3C1A1A] transition-colors hover:bg-[#3C1A1A] hover:text-[#F5E9CE]"
            >
              x12
            </button>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="w-full rounded-xl bg-[#3C1A1A] px-3 py-2 text-xs font-semibold text-[#F5E9CE] transition-colors hover:bg-[#A6BBCE] hover:text-[#3C1A1A]"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  )
}
