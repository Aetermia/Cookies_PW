import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../lib/constants'
import GraciasBadge from './GraciasBadge'

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#3C1A1A] text-[#F5E9CE]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-start gap-5">
          <GraciasBadge className="mt-1 h-20 w-20 sm:h-28 sm:w-28" />
          <div>
            <h3 className="mb-3 text-xl font-bold">La chica de las Cookies</h3>
            <p className="text-[#F5E9CE]/80">
              Cookies artesanales preparadas con ingredientes de calidad y muchísima
              pasión. Pedinos tus favoritas y las llevamos donde las necesites.
            </p>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-xl font-bold">Comunicate</h3>
          <ul className="space-y-2 text-[#F5E9CE]/80">
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#F5D9D9]"
              >
                {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/valenn_colotti"
                className="transition-colors hover:text-[#F5D9D9]"
              >
                valenn_colotti
              </a>
            </li>
            <li>Buenos Aires, Tandil</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xl font-bold">Equipo</h3>
          <ul className="space-y-1 text-[#F5E9CE]/80">
            <li>Valentina - Creadora y cocinera</li>
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 border-t border-[#F5E9CE]/20 px-6 py-5 text-center text-sm text-[#F5E9CE]/60">
        <span>
          © {new Date().getFullYear()} La chica de las Cookies · Pagina
          desarrollada por
        </span>
        <a
          href="https://aetermia.site"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center transition-opacity hover:opacity-80"
          aria-label="Visitar Aetermia"
        >
          <img
            src="/logoAetermia.png"
            alt="Logo Aetermia"
            loading="lazy"
            className="h-8 w-auto brightness-0 invert"
          />
        </a>
      </div>
    </footer>
  )
}
