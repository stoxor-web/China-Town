import { Header } from '@/components/Header'

export default function AnalyticsPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-4xl font-black">Statistiques affiliées</h1>
        <p className="mt-2 text-black/60">Connecte cette page aux requêtes SQL fournies dans /sql/schema.sql.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm"><p className="text-sm text-black/50">Total clics</p><p className="text-4xl font-black">0</p></div>
          <div className="rounded-3xl bg-white p-6 shadow-sm"><p className="text-sm text-black/50">Meilleur site</p><p className="text-4xl font-black">—</p></div>
          <div className="rounded-3xl bg-white p-6 shadow-sm"><p className="text-sm text-black/50">Meilleur article</p><p className="text-4xl font-black">—</p></div>
        </div>
      </section>
    </main>
  )
}
