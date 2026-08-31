import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import About from './components/About'
import CartDrawer from './components/CartDrawer'
import PrepareDrawer from './components/PrepareDrawer'
import Footer from './components/Footer'
import { useCart } from './context/CartContext'

function App() {
  const { isOpen, isPrepareOpen, setIsOpen, setIsPrepareOpen, toast } = useCart()

  useEffect(() => {
    const anyOpen = isOpen || isPrepareOpen
    document.body.style.overflow = anyOpen ? 'hidden' : ''

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setIsPrepareOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, isPrepareOpen, setIsOpen, setIsPrepareOpen])

  return (
    <div className="min-h-screen bg-[#F5E9CE] text-[#3C1A1A]">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <About />
      </main>
      <Footer />
      <CartDrawer />
      <PrepareDrawer />

      {toast && (
        <div
          role="status"
          className="fixed left-1/2 top-20 z-[70] max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-xl bg-[#3C1A1A] px-6 py-3 text-center font-semibold text-[#F5E9CE] shadow-xl"
        >
          {toast}
        </div>
      )}
    </div>
  )
}

export default App