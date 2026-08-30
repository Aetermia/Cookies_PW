import { createContext, useContext, useCallback, useEffect, useMemo, useState } from 'react'
import { WHATSAPP_NUMBER } from '../lib/constants'

const CartContext = createContext(null)

const STORAGE_KEY = 'lcdlc-cart'

function loadCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCart(items) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    return true
  } catch {
    return false
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [isOpen, setIsOpen] = useState(false)
  const [isPrepareOpen, setIsPrepareOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    saveCart(items)
  }, [items])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(timer)
  }, [toast])

  const notify = useCallback((message) => setToast(message), [])

  const addItem = (product, quantity = 1) => {
    setItems((current) => {
      const found = current.find((i) => i.id === product.id)
      if (found) {
        return current.map((i) =>
          i.id === product.id ? { ...i, cantidad: i.cantidad + quantity } : i
        )
      }
      return [
        ...current,
        { id: product.id, nombre: product.name, precio: product.price, cantidad: quantity },
      ]
    })
  }

  const removeItem = (id) => {
    setItems((current) => current.filter((i) => i.id !== id))
  }

  const clearCart = () => setItems([])

  const totalCount = useMemo(
    () => items.reduce((acc, i) => acc + i.cantidad, 0),
    [items]
  )

  const total = useMemo(
    () => items.reduce((acc, i) => acc + i.precio * i.cantidad, 0),
    [items]
  )

  const generarEnlaceWhatsApp = (carrito, datosCliente = {}) => {
    const numero = WHATSAPP_NUMBER
    let texto = '¡Hola! Detalle de mi pedido:\n\n'
    let totalParcial = 0
    carrito.forEach((item) => {
      texto += `- ${item.cantidad}x ${item.nombre} ($${item.precio * item.cantidad})\n`
      totalParcial += item.precio * item.cantidad
    })
    texto += `\n*Total a pagar: $${totalParcial}*\n`

    if (datosCliente.nombre) {
      texto += `\nDatos del pedido:\n`
      texto += `Nombre y apellido: ${datosCliente.nombre} ${datosCliente.apellido}\n`
      if (datosCliente.entrega === 'envio') {
        const partes = []
        if (datosCliente.direccion) partes.push(datosCliente.direccion)
        if (datosCliente.numero) partes.push(`N° ${datosCliente.numero}`)
        if (datosCliente.depto) partes.push(`Depto ${datosCliente.depto}`)
        if (datosCliente.piso) partes.push(`Piso ${datosCliente.piso}`)
        texto += `Entrega: Envío a ${partes.join(', ')}\n`
        if (datosCliente.infoExtra) {
          texto += `Info extra: ${datosCliente.infoExtra}\n`
        }
      } else {
        texto += `Entrega: Retiro local\n`
      }
      if (datosCliente.pago) {
        texto += `*Forma de pago: ${datosCliente.pago}*\n`
      }
    }

    return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`
  }

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      clearCart,
      total,
      totalCount,
      isOpen,
      setIsOpen,
      isPrepareOpen,
      setIsPrepareOpen,
      generarEnlaceWhatsApp,
      toast,
      notify,
    }),
    [items, total, totalCount, isOpen, isPrepareOpen, toast, notify]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
