import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { totalCount, setIsOpen, setIsPrepareOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const goTo = (hash) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  return (
    <header className="sticky top-0 z-50 bg-[#3C1A1A] shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <a
          href="#inicio"
          className="font-display text-2xl leading-none text-[#F5E9CE]"
        >
          La chica de las Cookies
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="#productos"
            className="rounded-xl bg-[#F5E9CE] px-5 py-2 font-semibold text-[#3C1A1A] shadow-md shadow-black/30 transition-all hover:bg-[#A6BBCE] hover:shadow-lg"
          >
            Productos
          </a>
          <button
            type="button"
            onClick={() => setIsPrepareOpen(true)}
            className="rounded-xl bg-[#F5E9CE] px-5 py-2 font-semibold text-[#3C1A1A] shadow-md shadow-black/30 transition-all hover:bg-[#A6BBCE] hover:shadow-lg"
          >
            Preparar en casa
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative flex items-center justify-center rounded-full bg-[#F5E9CE] p-2.5 text-[#3C1A1A] shadow-md shadow-black/30 transition-all hover:bg-[#A6BBCE] hover:shadow-lg"
            aria-label="Abrir carrito"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {totalCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F5D9D9] px-1 text-xs font-bold text-[#3C1A1A]">
                {totalCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="relative flex items-center justify-center rounded-full bg-[#F5E9CE] p-2.5 text-[#3C1A1A] shadow-md shadow-black/30 md:hidden"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
          {totalCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F5D9D9] px-1 text-xs font-bold text-[#3C1A1A]">
              {totalCount}
            </span>
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-t border-[#F5E9CE]/20 bg-[#3C1A1A] px-4 py-4 shadow-lg">
          <div className="flex flex-col gap-3 md:hidden">
            <button
              type="button"
              onClick={() => goTo('#productos')}
              className="rounded-xl bg-[#F5E9CE] px-5 py-3 text-left font-semibold text-[#3C1A1A] transition-colors hover:bg-[#A6BBCE]"
            >
              Productos
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                setIsPrepareOpen(true)
              }}
              className="rounded-xl bg-[#F5E9CE] px-5 py-3 text-left font-semibold text-[#3C1A1A] transition-colors hover:bg-[#A6BBCE]"
            >
              Preparar en casa
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                setIsOpen(true)
              }}
              className="relative flex items-center justify-start gap-3 rounded-xl bg-[#F5E9CE] px-5 py-3 font-semibold text-[#3C1A1A] transition-colors hover:bg-[#A6BBCE]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Carrito
              {totalCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F5D9D9] px-1 text-xs font-bold text-[#3C1A1A]">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
