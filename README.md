# 🍪 La chica de las Cookies

SPA de comercio electrónico construida con **React (Vite)** + **Tailwind CSS**.
Los productos se leen desde una base de datos **Supabase** (PostgreSQL), y la
app se deploya como sitio estático en **Vercel**.

> Si no hay variables de entorno configuradas, la app usa un set de productos
> de respaldo local (`src/data/products.js`) para que no se rompa al desarrollar.

## Stack

- **React 19 + Vite 8**
- **Tailwind CSS v4**
- **Supabase** (base de datos de productos)
- **React Context** para el carrito
- Checkout que deriva a **WhatsApp** (`wa.me`)

---

## 1) Base de datos (Supabase)

1. Creá un proyecto en [supabase.com](https://supabase.com) (plan free).
2. En **SQL Editor → New query**, pegá y ejecutá el contenido de
   [`supabase/schema.sql`](./supabase/schema.sql).
   Eso crea la tabla `products` con RLS (lectura pública) y la puebla con los
   6 productos iniciales.
3. Para editar productos: **Table Editor → products** (panel gráfico) o un
   `UPDATE` en SQL Editor.

### Estructura de la tabla `products`

| Columna      | Tipo          | Descripción                                 |
| ------------ | ------------- | ------------------------------------------- |
| `id`         | bigint (PK)   | Identificador (autoincremental)             |
| `name`       | text          | Nombre del producto                         |
| `description`| text          | Descripción                                 |
| `price`      | numeric(10,2) | Precio unitario                             |
| `category`   | text          | `cookies` o `frozen` (consulta: "congeladas")|
| `image`      | text          | URL de la imagen                            |
| `sort_order` | integer       | Orden de aparición                          |

> `image` puede ser una URL completa (p. ej. un link de Supabase Storage o
> externo) o una ruta relativa servida por la app (p. ej. `/cookies-classic.svg`).

---

## 2) Configurar variables de entorno

Copiá `.env.example` a un archivo `.env` local y completalo con los datos de
**Supabase → Settings → API**:

```bash
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

> La **anon key** es pública (diseñada para apps del lado del cliente). El
> `SELECT` a `products` está permitido por la policy `products_public_read`;
> no hay que exponer la service-role key.

---

## 3) Desarrollo local

```bash
npm install
npm run dev
```

La app escucha en http://localhost:5173 por defecto.

---

## 4) Deploy en Vercel

1. Subí el proyecto a un repositorio de **GitHub** (o conectá Vercel a la carpeta).
2. En [vercel.com](https://vercel.com) → **New Project**, importá el repo.
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist` (Vercel lo detecta solo)
3. En **Settings → Environment Variables**, agregá (sameas de `.env`):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. **Deploy**. La app carga los productos directo desde Supabase.

---

## Cómo editar los productos en producción

Después del deploy, para cambiar nombre, descripción, foto o precio, **no hay
que tocar el código**: se edita la fila en **Supabase → Table Editor → products**
y se refleja al recargar la página.
