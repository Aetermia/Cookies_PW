export default function About() {
  return (
    <section id="sobre-mi" className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-col items-center gap-10 md:flex-row md:gap-14">
        {/* Área reservada para la imagen */}
        <div className="flex aspect-[4/5] w-full max-w-sm shrink-0 items-center justify-center rounded-3xl border-2 border-dashed border-[#A6BBCE] bg-[#F5D9D9] text-center text-[#3C1A1A]/50">
          <p>Foto de Valentina</p>
        </div>

        {/* Texto */}
        <div className="flex-1">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#3C1A1A]/60">
            Sobre Mí
          </h2>
          <h3 className="mt-2 font-display text-5xl leading-tight text-[#3C1A1A]">
            Valentina Colotti
          </h3>
          <p className="mt-6 text-lg leading-relaxed text-[#3C1A1A]/80">
            Soy Valentina, la chica detrás de las cookies. Preparo cada lote de
            forma artesanal, con ingredientes de calidad y mucho amor. Este emprendimiento nació en casa y hoy lleva mis cookies
            hasta tu puerta, o listas para que vos las hornees a tu manera.
          </p>
        </div>
      </div>
    </section>
  )
}
