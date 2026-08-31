import { useCart } from '../context/CartContext'

const pasos = [
  {
    titulo: 'Descongelá',
    descripcion:
      'Sacá las cookies congeladas del freezer y dejá el sobre a temperatura ambiente durante 10-15 minutos, o encendé el horno mientras tanto.',
  },
  {
    titulo: 'Prepará el horno',
    descripcion:
      'Precalentá el horno a 180°C (horno medio) por unos 10 minutos. Colocá las cookies sobre una placa con papel manteca, separadas entre sí.',
  },
  {
    titulo: 'Horneá',
    descripcion:
      'Horneá durante 8 a 12 minutos, hasta que los bordes estén dorados y el centro aún se vea tierno. No las dejes de más o se ponen secas.',
  },
  {
    titulo: 'Enfriá y disfrutá',
    descripcion:
      'Dejá enfriar 2-3 minutos sobre la placa (siguen terminando de cocinarse con el calor). ¡Servilas tibias y a disfrutar!',
  },
]

export default function PrepareDrawer() {
  const { isPrepareOpen, setIsPrepareOpen } = useCart()

  return (
    <div
      className={`fixed inset-0 z-[60] ${isPrepareOpen ? '' : 'pointer-events-none'}`}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          isPrepareOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setIsPrepareOpen(false)}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#F5E9CE] shadow-2xl transition-transform ${
          isPrepareOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#A6BBCE] px-6 py-4">
          <h2 className="text-xl font-bold text-[#3C1A1A]">Guía de horneado en casa</h2>
          <button
            type="button"
            onClick={() => setIsPrepareOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5D9D9] text-[#3C1A1A] hover:bg-[#A6BBCE]"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <p className="mb-6 text-[#3C1A1A]/80">
            Paso a paso para hornear en casa nuestras{' '}
            <strong>Cookies Congeladas</strong> y que queden perfectas:
          </p>
          <ol className="space-y-5">
            {pasos.map((paso, idx) => (
              <li
                key={paso.titulo}
                className="flex gap-4 rounded-2xl bg-white/70 p-4 ring-1 ring-[#F5D9D9]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#3C1A1A] font-bold text-[#F5E9CE]">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="font-bold text-[#3C1A1A]">{paso.titulo}</h3>
                  <p className="text-sm text-[#3C1A1A]/75">{paso.descripcion}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </div>
  )
}
