import { Header } from '@/components/Header'
import { demoAffiliateSites } from '@/lib/mock'

export default function AffiliateSitesPage() {
  return (
    <main>
      <Header />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-4xl font-black">Sites affiliés</h1>
        <p className="mt-2 text-black/60">Tes IDs sont stockés ici, site par site. Les articles gardent seulement le lien fournisseur original.</p>
        <div className="mt-6 grid gap-4">
          {demoAffiliateSites.map(site => (
            <div key={site.id} className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">{site.name}</h2>
                  <p className="mt-1 text-sm text-black/50">ID affilié : {site.affiliate_id}</p>
                  <p className="mt-1 text-sm text-black/50">Prix moyen livraison : {site.price_per_kg_eur} €/kg</p>
                  <code className="mt-3 block rounded-xl bg-black/5 p-3 text-xs">{site.link_template}</code>
                </div>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">Actif</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
