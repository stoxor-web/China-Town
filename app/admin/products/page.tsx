import { Header } from '@/components/Header'
import { demoProducts } from '@/lib/mock'

export default function AdminProductsPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-4xl font-black">Articles</h1>
        <p className="mt-2 text-black/60">Vue prête pour brancher le CRUD Supabase.</p>
        <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
          <div className="grid gap-3">
            {demoProducts.map(product => (
              <div key={product.id} className="flex items-center justify-between rounded-2xl border p-4">
                <div>
                  <p className="font-bold">{product.title}</p>
                  <p className="text-sm text-black/50">¥{product.price_cny} · {product.weight_kg} kg · {product.qc_count} QC</p>
                </div>
                <button className="rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white">Modifier</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
