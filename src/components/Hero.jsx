export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden bg-[#F5D9D9] px-6 text-center"
    >
      <img
        src="/Cookies-bg.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-md"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#F5D9D9]/45" />
      <div
        className="hero-pattern pointer-events-none absolute inset-0 text-[#3C1A1A]/[0.07]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl">
        <h1 className="font-display text-6xl leading-tight text-[#3C1A1A] [text-shadow:0_2px_10px_rgba(166,187,206,0.6)] sm:text-7xl md:text-8xl">
          La chica de las Cookies
        </h1>
        <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-[#3C1A1A]/70 [text-shadow:0_1px_3px_rgba(166,187,206,0.7)]">
          by Valentina Colotti
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#3C1A1A]/80 [text-shadow:0_1px_3px_rgba(166,187,206,0.7)]">
          Cookies artesanales horneadas con amor. Del horno a tu puerta, o
          listas para hornear en casa.
        </p>
        <a
          href="#productos"
          className="mt-8 inline-block rounded-xl bg-[#3C1A1A] px-8 py-3 font-semibold text-[#F5E9CE] shadow-lg shadow-[#3C1A1A]/30 transition-all hover:bg-[#A6BBCE] hover:text-[#3C1A1A] sm:hidden"
        >
          Ver productos
        </a>
        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-[#3C1A1A]/60">
          ✦ Se preparan a pedido · Frescas al momento ✦
        </p>
      </div>

      <a
        href="#productos"
        aria-label="Bajar para ver los productos"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[#3C1A1A] p-3 text-[#F5E9CE] shadow-lg shadow-[#3C1A1A]/30 transition-colors hover:bg-[#A6BBCE] hover:text-[#3C1A1A]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  )
}
