import Link from 'next/link'
import { formatMoney, convertCny } from '@/lib/currency'
import { fallbackRates } from '@/lib/mock'

export type ProductCardData = {
  id: string
  title: string
  slug: string
  price_cny: number
  weight_kg?: number | null
  category?: string | null
  image_url?: string | null
  qc_count?: number | null
  rating?: number | null
}

export function ProductCard({ product }: { product: ProductCardData }) {
  const prices = convertCny(product.price_cny, fallbackRates)

  return (
    <Link href={`/product/${product.slug}`} className="group rounded-3xl border border-black/10 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-square overflow-hidden rounded-2xl bg-neutral-100">
        <img src={product.image_url || '/uploads/placeholder-product.svg'} alt={product.title} className="h-full w-full object-cover transition group-hover:scale-105" />
      </div>
      <div className="mt-4 space-y-2 px-1 pb-2">
        <div className="flex items-center justify-between text-xs text-black/50">
          <span>{product.category || 'Article QC'}</span>
          <span>{product.qc_count || 0} QC</span>
        </div>
        <h3 className="line-clamp-2 font-semibold">{product.title}</h3>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-lg font-black">¥{product.price_cny}</p>
            <p className="text-xs text-black/50">≈ {formatMoney(prices.eur, 'EUR')} / {formatMoney(prices.usd, 'USD')}</p>
          </div>
          <span className="rounded-full bg-gold/20 px-2 py-1 text-xs font-semibold">★ {product.rating || '—'}</span>
        </div>
      </div>
    </Link>
  )
}
