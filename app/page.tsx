import { Header } from '@/components/Header'
import { ProductCard } from '@/components/ProductCard'
import { demoProducts } from '@/lib/mock'
import { supabase } from '@/lib/supabase'

async function getProducts() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return demoProducts

  const { data, error } = await supabase
    .from('products')
    .select('id,title,slug,price_cny,weight_kg,category,image_url,qc_count,rating')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(24)

  if (error || !data?.length) return demoProducts
  return data
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-[2rem] bg-ink p-8 text-white shadow-xl md:p-14">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-gold">QC Finder affilié</p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">China'Town, trouve tes articles QC et compare les agents.</h1>
          <p className="mt-5 max-w-2xl text-white/70">Conversion yuan, dollar, euro, estimation livraison au kg, pop-up d'achat avec tes IDs affiliés et tracking des clics.</p>
          <div className="mt-8 flex max-w-2xl rounded-2xl bg-white p-2 text-black">
            <input placeholder="Rechercher un article, une catégorie, un vendeur..." className="min-w-0 flex-1 bg-transparent px-4 outline-none" />
            <button className="rounded-xl bg-gold px-5 py-3 font-bold">Rechercher</button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black">Articles tendance</h2>
            <p className="text-black/55">Exemples prêts à remplacer depuis l'admin.</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </main>
  )
}
