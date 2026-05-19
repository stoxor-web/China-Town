import { Header } from '@/components/Header'
import { BuyPopup } from '@/components/BuyPopup'
import { convertCny, formatMoney } from '@/lib/currency'
import { fallbackRates, demoAffiliateSites, demoProducts } from '@/lib/mock'
import { supabase } from '@/lib/supabase'

async function getProduct(slug: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return demoProducts.find(p => p.slug === slug) || demoProducts[0]

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return demoProducts.find(p => p.slug === slug) || demoProducts[0]
  return data
}

async function getSites() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return demoAffiliateSites

  const { data, error } = await supabase
    .from('affiliate_sites')
    .select('*, shipping_rates(price_per_kg_eur)')
    .eq('active', true)
    .order('sort_order')

  if (error || !data?.length) return demoAffiliateSites

  return data.map((site: any) => ({
    ...site,
    price_per_kg_eur: site.shipping_rates?.[0]?.price_per_kg_eur || null
  }))
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  const sites = await getSites()
  const prices = convertCny(product.price_cny, fallbackRates)

  return (
    <main>
      <Header />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] bg-white p-4 shadow-sm">
          <img src={product.image_url || '/uploads/placeholder-product.svg'} alt={product.title} className="aspect-square w-full rounded-[1.5rem] bg-neutral-100 object-cover" />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">China'Town QC</p>
            <h1 className="mt-2 text-4xl font-black">{product.title}</h1>
            <p className="mt-3 text-black/55">Lien fournisseur de base transformé automatiquement avec les sites affiliés actifs.</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-black/50">Yuan</p><p className="text-xl font-black">¥{product.price_cny}</p></div>
            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-black/50">Euro</p><p className="text-xl font-black">{formatMoney(prices.eur, 'EUR')}</p></div>
            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-black/50">Dollar</p><p className="text-xl font-black">{formatMoney(prices.usd, 'USD')}</p></div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-xl font-black">Estimation</h2>
            <div className="space-y-2 text-sm text-black/65">
              <p>Poids article : <strong>{product.weight_kg || 'à compléter'} kg</strong></p>
              <p>QC disponibles : <strong>{product.qc_count || 0}</strong></p>
              <p>Note : <strong>{product.rating || '—'}</strong></p>
            </div>
          </div>

          <BuyPopup product={product} sites={sites} />
        </div>
      </section>
    </main>
  )
}
