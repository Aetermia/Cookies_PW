import { products as fallbackProducts } from '../data/products'

const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID
const TABLE = import.meta.env.VITE_AIRTABLE_TABLE
const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN

function isAirtableConfigured() {
  return Boolean(BASE_ID && TABLE && TOKEN)
}

function imageUrl(image) {
  if (Array.isArray(image)) {
    const first = image[0]
    return first?.url || '/placeholder-cookie.svg'
  }
  if (typeof image === 'string' && image.trim()) {
    return image
  }
  return '/placeholder-cookie.svg'
}

function toProduct(record) {
  const f = record.fields || {}
  return {
    id: record.id,
    name: f.Nombre || f.name || '',
    description: f.Descripcion || f.description || '',
    price: Number(f.Precio ?? f.price) || 0,
    category: String(f.Categoria || f.category || '').toLowerCase().trim(),
    image: imageUrl(f.Imagen ?? f.image),
    sort_order: Number(f.Orden ?? f.sort_order) || 0,
  }
}

export async function fetchProducts() {
  if (!isAirtableConfigured()) {
    return fallbackProducts
  }

  const baseUrl = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}`
  const params = new URLSearchParams()

  let records = []
  let offset = null

  try {
    do {
      if (offset) params.set('offset', offset)
      const res = await fetch(`${baseUrl}?${params.toString()}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      })
      if (!res.ok) {
        console.error('Error leyendo Airtable:', res.status, await res.text())
        return fallbackProducts
      }
      const data = await res.json()
      records = records.concat(data.records || [])
      offset = data.offset || null
    } while (offset)

    if (records.length === 0) {
      return fallbackProducts
    }

    return records
      .map(toProduct)
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  } catch (err) {
    console.error('Error cargando productos desde Airtable:', err)
    return fallbackProducts
  }
}