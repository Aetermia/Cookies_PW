import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'

const inputClass =
  'w-full rounded-xl border border-[#A6BBCE] bg-white/70 px-4 py-2.5 text-sm text-[#3C1A1A] placeholder:text-[#3C1A1A]/40 outline-none focus:border-[#3C1A1A]'

const textareaClass =
  'w-full resize-none rounded-xl border border-[#A6BBCE] bg-white/70 px-4 py-2.5 text-sm text-[#3C1A1A] placeholder:text-[#3C1A1A]/40 outline-none focus:border-[#3C1A1A]'

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, total, clearCart, generarEnlaceWhatsApp } =
    useCart()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    entrega: '',
    direccion: '',
    numero: '',
    depto: '',
    piso: '',
    infoExtra: '',
    pago: '',
  })
  const [errors, setErrors] = useState({})

  const updateField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const handleCheckout = () => {
    if (items.length === 0) return
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.nombre.trim()) errs.nombre = 'Ingresá tu nombre'
    if (!form.apellido.trim()) errs.apellido = 'Ingresá tu apellido'
    if (!form.entrega) errs.entrega = 'Elegí envío o retiro'
    if (form.entrega === 'envio') {
      if (!form.direccion.trim()) errs.direccion = 'Ingresá la calle de envío'
      if (!form.numero.trim()) errs.numero = 'Ingresá el número'
    }
    if (!form.pago) errs.pago = 'Elegí la forma de pago'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    const url = generarEnlaceWhatsApp(items, {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      entrega: form.entrega,
      direccion: form.direccion.trim(),
      numero: form.numero.trim(),
      depto: form.depto.trim(),
      piso: form.piso.trim(),
      infoExtra: form.infoExtra.trim(),
      pago: form.pago,
    })
    window.open(url, '_blank', 'noopener,noreferrer')
    clearCart()
    setIsOpen(false)
    setShowForm(false)
    setForm({
      nombre: '',
      apellido: '',
      entrega: '',
      direccion: '',
      numero: '',
      depto: '',
      piso: '',
      infoExtra: '',
      pago: '',
    })
  }

  const pillClass = (value) =>
    `flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
      form.entrega === value
        ? 'border-[#3C1A1A] bg-[#3C1A1A] text-[#F5E9CE]'
        : 'border-[#3C1A1A]/30 bg-white/60 text-[#3C1A1A] hover:bg-[#F5D9D9]'
    }`

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#F5E9CE] shadow-2xl transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#A6BBCE] px-6 py-4">
          <div className="flex items-center gap-3">
            {showForm && (
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5D9D9] text-[#3C1A1A] hover:bg-[#A6BBCE]"
                aria-label="Volver al carrito"
              >
                ←
              </button>
            )}
            <h2 className="text-xl font-bold text-[#3C1A1A]">
              {showForm ? 'Confirmar pedido' : 'Mi Carrito'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5D9D9] text-[#3C1A1A] hover:bg-[#A6BBCE]"
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="text-[#3C1A1A]/70">
              Tu carrito está vacío. ¡Agregá algunas cookies!
            </p>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false)
                document
                  .querySelector('#productos')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="rounded-xl bg-[#3C1A1A] px-6 py-2.5 font-semibold text-[#F5E9CE] transition-colors hover:bg-[#A6BBCE] hover:text-[#3C1A1A]"
            >
              Ver productos
            </button>
          </div>
        ) : showForm ? (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-6"
          >
            <div>
              <label
                htmlFor="checkout-nombre"
                className="mb-1.5 block text-sm font-semibold text-[#3C1A1A]"
              >
                Nombre *
              </label>
              <input
                id="checkout-nombre"
                type="text"
                value={form.nombre}
                onChange={(e) => updateField('nombre', e.target.value)}
                placeholder="Tu nombre"
                className={inputClass}
              />
              {errors.nombre && (
                <p className="mt-1 text-xs font-medium text-red-500">{errors.nombre}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="checkout-apellido"
                className="mb-1.5 block text-sm font-semibold text-[#3C1A1A]"
              >
                Apellido *
              </label>
              <input
                id="checkout-apellido"
                type="text"
                value={form.apellido}
                onChange={(e) => updateField('apellido', e.target.value)}
                placeholder="Tu apellido"
                className={inputClass}
              />
              {errors.apellido && (
                <p className="mt-1 text-xs font-medium text-red-500">{errors.apellido}</p>
              )}
            </div>

            <fieldset>
              <legend className="mb-1.5 text-sm font-semibold text-[#3C1A1A]">
                ¿Cómo lo recibís? *
              </legend>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => updateField('entrega', 'envio')}
                  className={pillClass('envio')}
                  aria-pressed={form.entrega === 'envio'}
                >
                  Envío
                </button>
                <button
                  type="button"
                  onClick={() => updateField('entrega', 'retiro')}
                  className={pillClass('retiro')}
                  aria-pressed={form.entrega === 'retiro'}
                >
                  Retiro local
                </button>
              </div>
              {errors.entrega && (
                <p className="mt-1 text-xs font-medium text-red-500">{errors.entrega}</p>
              )}
            </fieldset>

            {form.entrega === 'envio' && (
              <>
                <div className="grid grid-cols-[1fr_5rem] gap-3">
                  <div>
                    <label
                      htmlFor="checkout-direccion"
                      className="mb-1.5 block text-sm font-semibold text-[#3C1A1A]"
                    >
                      Dirección *
                    </label>
                    <input
                      id="checkout-direccion"
                      type="text"
                      value={form.direccion}
                      onChange={(e) => updateField('direccion', e.target.value)}
                      placeholder="Calle"
                      className={inputClass}
                    />
                    {errors.direccion && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {errors.direccion}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="checkout-numero"
                      className="mb-1.5 block text-sm font-semibold text-[#3C1A1A]"
                    >
                      Número *
                    </label>
                    <input
                      id="checkout-numero"
                      type="text"
                      inputMode="numeric"
                      value={form.numero}
                      onChange={(e) => updateField('numero', e.target.value)}
                      placeholder="1234"
                      className={inputClass}
                    />
                    {errors.numero && (
                      <p className="mt-1 text-xs font-medium text-red-500">
                        {errors.numero}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="checkout-depto"
                      className="mb-1.5 block text-sm font-semibold text-[#3C1A1A]"
                    >
                      Depto
                    </label>
                    <input
                      id="checkout-depto"
                      type="text"
                      value={form.depto}
                      onChange={(e) => updateField('depto', e.target.value)}
                      placeholder="Opcional"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="checkout-piso"
                      className="mb-1.5 block text-sm font-semibold text-[#3C1A1A]"
                    >
                      Piso
                    </label>
                    <input
                      id="checkout-piso"
                      type="text"
                      inputMode="numeric"
                      value={form.piso}
                      onChange={(e) => updateField('piso', e.target.value)}
                      placeholder="Opcional"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="checkout-infoextra"
                    className="mb-1.5 block text-sm font-semibold text-[#3C1A1A]"
                  >
                    Info extra
                  </label>
                  <textarea
                    id="checkout-infoextra"
                    rows="2"
                    value={form.infoExtra}
                    onChange={(e) => updateField('infoExtra', e.target.value)}
                    placeholder="Ej: tocar el 2do timbre porque el 1ro no anda"
                    className={textareaClass}
                  />
                </div>
              </>
            )}

            <div>
              <label
                htmlFor="checkout-pago"
                className="mb-1.5 block text-sm font-semibold text-[#3C1A1A]"
              >
                Forma de pago *
              </label>
              <select
                id="checkout-pago"
                value={form.pago}
                onChange={(e) => updateField('pago', e.target.value)}
                className={inputClass}
              >
                <option value="" disabled>
                  Seleccioná
                </option>
                <option value="Efectivo">Efectivo</option>
                <option value="Transferencia">Transferencia</option>
              </select>
              {errors.pago && (
                <p className="mt-1 text-xs font-medium text-red-500">{errors.pago}</p>
              )}
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-[#A6BBCE] pt-4">
              <span className="text-lg font-semibold text-[#3C1A1A]">Total</span>
              <span className="text-2xl font-bold text-[#3C1A1A]">{formatPrice(total)}</span>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#3C1A1A] px-6 py-3 font-semibold text-[#F5E9CE] transition-colors hover:bg-[#A6BBCE] hover:text-[#3C1A1A]"
            >
              Enviar pedido por WhatsApp
            </button>
          </form>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-[#F5D9D9] overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-4 py-4">
                  <div className="flex-1">
                    <p className="font-semibold text-[#3C1A1A]">
                      {item.cantidad}x {item.nombre}
                    </p>
                    <p className="text-sm text-[#3C1A1A]/70">
                      {formatPrice(item.precio * item.cantidad)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-[#3C1A1A]/60 underline hover:text-[#3C1A1A]"
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-t border-[#A6BBCE] px-6 py-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-lg font-semibold text-[#3C1A1A]">Total</span>
                <span className="text-2xl font-bold text-[#3C1A1A]">
                  {formatPrice(total)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full rounded-xl bg-[#3C1A1A] px-6 py-3 font-semibold text-[#F5E9CE] transition-colors hover:bg-[#A6BBCE] hover:text-[#3C1A1A]"
              >
                Continuar con el pedido
              </button>
              <button
                type="button"
                onClick={clearCart}
                className="mt-3 w-full rounded-xl border border-[#3C1A1A] px-6 py-2.5 text-sm font-semibold text-[#3C1A1A] hover:bg-[#F5D9D9]"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}